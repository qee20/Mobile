import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Client from '../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../Context/Context';
import moment from 'moment';
import {formatNumber} from 'react-native-currency-input';
import {List} from 'react-native-paper';

const OnwayFinishiingProject = ({route, navigation}) => {
  const {
    onWay,
    milesTone,
    kodekontrak,
    statusBayar,
    statusProyek,
    OBDATA,
    display,
  } = route.params;

  const [progress, setprogress] = React.useState([]);
  const [milesToneOB, setMilestoneOB] = React.useState([]);

  const lunasiDulu = () => {
    Alert.alert(
      'Info',
      'Anda masih memiliki pembayaran yang belum lunas, silahkan menuju daftar pembayaran belum lunas untuk memberikan ulasan dan menyelesaikan kontrak. Terimakasih',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Pembayaran Tertunda'),
        },
      ],
    );
  };

  React.useEffect(async () => {
    if (display == 'JS') {
      Client.post('/getLastMilestone', {
        kode_kontrak_jasa: kodekontrak,
      }).then(response => {
        console.log('milestone Jasa', response.data.result);
        setprogress(response.data.result);
      });
    } else {
      console.log(OBDATA);
      await Client.post('/getLastOBProgress', {
        kode_kontrak_OB: OBDATA.kode_kontrak_OB,
      }).then(response => {
        console.log('milestoneOB', response.data.result);
        setMilestoneOB(response.data.result);
      });
    }
  }, []);

  if (display == 'JS') {
    return (
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              padding: 5,
              backgroundColor: '#96BAFF',
              borderRadius: 10,
            }}>
            <View style={{flex: 2}}>
              <Image
                source={{uri: onWay[0].url_gambar}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
            <View style={{flex: 4, alignSelf: 'center'}}>
              {milesTone ? (
                <Text>Dalam Pengerjaan</Text>
              ) : (
                <Text>Belum Dimulai</Text>
              )}
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {onWay[0].judul_proyek}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'space-between',
            }}>
            <Text>No. Kontrak</Text>
            <Text style={{fontWeight: 'bold'}}>{kodekontrak}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 5,
            }}>
            <View>
              {progress.map(track => {
                return (
                  <View key={track.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PreviewM4Client', {
                          track,
                          type: 'JS',
                        })
                      }>
                      <Text>
                        {moment(track.waktu_milestonejasa).format(
                          '⏳ dddd, HH:mm DD MMMM',
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{marginTop: 20, margin: 10}}>
            {statusBayar == 'Belum Lunas' ? (
              <Button onPress={lunasiDulu} title="Berikan Ulasan" />
            ) : (
              <Button
                onPress={() => navigation.navigate('Selesai Dikerjakan')}
                title="Berikan Ulasan"
              />
            )}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              padding: 5,
              backgroundColor: '#96BAFF',
              borderRadius: 10,
            }}>
            <View style={{flex: 2}}>
              <Image
                source={{uri: OBDATA.gambar}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
            <View style={{flex: 4, alignSelf: 'center'}}>
              {milesToneOB ? (
                <Text>Dalam Pengerjaan</Text>
              ) : (
                <Text>Belum Dimulai</Text>
              )}
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {OBDATA.judul_open_bidding}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'space-between',
            }}>
            <Text>No. Kontrak</Text>
            <Text style={{fontWeight: 'bold'}}>{OBDATA.kode_kontrak_OB}</Text>
          </View>
          <View
            style={{
              padding: 5,
              margin: 5,
            }}>
            <View>
              {milesToneOB.map(track => {
                return (
                  <View
                    style={{
                      margin: 5,
                      padding: 5,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    key={track.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PreviewM4Client', {
                          track,
                          type: 'OB',
                        })
                      }>
                      <Text>
                        {moment(track.waktu_milestone_OB).format(
                          '⏳ dddd, HH:mm DD MMMM',
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            {OBDATA.status_pembayaran_open_bidding == 'Belum Lunas' ? (
              <View style={{marginTop: 20, margin: 10}}>
                <Button onPress={lunasiDulu} title="Berikan Ulasan" />
              </View>
            ) : (
              <View style={{marginTop: 20, margin: 10}}>
                <Button
                  onPress={() => navigation.navigate('Selesai Dikerjakan')}
                  title="Berikan Ulasan"
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
};

export default OnwayFinishiingProject;
