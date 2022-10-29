import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Pendingtrx,
  FinisedProject,
} from '../../../../JOBKU RESC/componentStyles';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import moment from 'moment';
import {Chip, Colors} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';
import {ScrollView} from 'react-native-gesture-handler';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SelesaiStack = createStackNavigator();

function Selesai({navigation}) {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [finishedProject, setFinishedProject] = React.useState([]);
  const [finishedProjectOB, setFinishedProjectOB] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/finishedProject', {
      kode_freelancer: passProfileData.kode_freelancer,
    }).then(response => {
      Client.post('/DoneOB4Freelancer', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('done OB', response.data.result);
        setFinishedProjectOB(response.data.result);
      });
      console.log(response.data.result);
      setFinishedProject(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/finishedProject', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        Client.post('/DoneOB4Freelancer', {
          kode_freelancer: passProfileData.kode_freelancer,
        }).then(response => {
          console.log('done OB', response.data.result);
          setFinishedProjectOB(response.data.result);
        });
        console.log(response.data.result);
        setFinishedProject(response.data.result);
      });
    });
  }, []);

  if (finishedProject.length == 0 && finishedProjectOB.length == 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20}}>
          <Text style={{alignSelf: 'center'}}>
            Proyek yang sudah selesai sedang tidak ada
          </Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {finishedProject.map(data => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('KontrakJasaSelesai', {
                  kode_pembayaran_jasa: data.kode_pembayaran_jasa,
                  kodekontrak: data.kode_kontrak_jasa,
                  harga: data.harga_paket_jasa,
                  downpayment: data.downpayment,
                  dp: data.jumlah_pembayaran,
                  sdp: data.jumlah_yang_belum_dibayar,
                  persentase: data.persentase_dp,
                  tglktrk: data.tanggal_kontrak,
                  jenispaket: data.nama_jenis_paket,
                  namapry: data.judul_proyek,
                  client: data.nama_client,
                })
              }
              key={data.kode_pembayaran_jasa}
              style={FinisedProject.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Image
                    resizeMode="cover"
                    source={{uri: data.fotoProfil}}
                    style={FinisedProject.poster}
                  />
                </View>
                <View style={{flex: 2, alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>{data.nama_client}</Text>
                  <Text>
                    Rp.{' '}
                    {formatNumber(data.harga_paket_jasa, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}
                  </Text>
                </View>
              </View>
              <View style={FinisedProject.theproject}>
                <Text numberOfLines={1} style={{fontSize: 20}}>
                  {data.judul_proyek}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 15, margin: 5, color: 'blue'}}>
                  {data.nama_sub_kategori}
                </Text>
                {data.nama_jenis_paket == 'Basic' ? (
                  <Text
                    style={{
                      fontSize: 15,
                      margin: 5,
                      fontWeight: 'bold',
                      backgroundColor: '#84a623',
                      padding: 3,
                      textAlign: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                    }}>
                    {data.nama_jenis_paket}
                  </Text>
                ) : data.nama_jenis_paket == 'Medium' ? (
                  <Text
                    style={{
                      fontSize: 15,
                      margin: 5,
                      fontWeight: 'bold',
                      backgroundColor: '#243da9',
                      padding: 3,
                      textAlign: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                    }}>
                    {data.nama_jenis_paket}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 15,
                      margin: 5,
                      fontWeight: 'bold',
                      backgroundColor: '#d4af37',
                      padding: 3,
                      textAlign: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                    }}>
                    {data.nama_jenis_paket}
                  </Text>
                )}
              </View>
              {data.status_proyek_jasa == 0 ? (
                <Text style={FinisedProject.pending}>Pending ...</Text>
              ) : (
                <Text style={FinisedProject.confirmed}>Selesai</Text>
              )}
            </TouchableOpacity>
          );
        })}
        {finishedProjectOB.map(data => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('KontrakOpenBiddingSelesai', {
                  kode_pembayaran_jasa: data.kode_pembayaran_jasa,
                  kodekontrak: data.kode_kontrak_OB,
                  harga: data.anggaran_yang_ditetapkan,
                  downpayment: data.downpayment,
                  dp: data.anggaran_yang_ditetapkan,
                  sdp: data.jumlah_yang_belum_dibayar,
                  persentase: data.persentase_dp,
                  tglktrk: data.tanggal_kontrak,
                  jenispaket: data.nama_jenis_paket,
                  namapry: data.judul_open_bidding,
                  client: data.nama_client,
                })
              }
              key={data.kode_pembayaran_jasa}
              style={FinisedProject.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Image
                    resizeMode="cover"
                    source={{uri: data.fotoProfil}}
                    style={FinisedProject.poster}
                  />
                </View>
                <View style={{flex: 2, alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>{data.nama_client}</Text>
                  <Text
                    style={{fontSize: 20, marginTop: 5, fontWeight: 'bold'}}>
                    {formatNumber(data.anggaran_yang_ditetapkan, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}
                  </Text>
                </View>
              </View>
              <View style={FinisedProject.theproject}>
                <Text numberOfLines={1} style={{fontSize: 20}}>
                  {data.judul_open_bidding}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 15, margin: 5, color: 'blue'}}>
                  {data.nama_sub_kategori}
                </Text>
              </View>
              {data.status_proyek_jasa == 0 ? (
                <Text style={FinisedProject.pending}>Pending ...</Text>
              ) : (
                <Text style={FinisedProject.confirmed}>Selesai</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const SelesaiStackScreen = () => (
  <SelesaiStack.Navigator screenOptions={{headerShown: false}}>
    <SelesaiStack.Screen name="Selesai" component={Selesai} />
  </SelesaiStack.Navigator>
);

export default SelesaiStackScreen;
