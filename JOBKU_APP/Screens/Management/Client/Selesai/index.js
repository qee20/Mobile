import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SelesaiStack = createStackNavigator();

function Selesai({navigation}) {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [finishedProject, setFinishedProject] = React.useState([]);
  const [finishedOB, setFinishedOB] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/finishedProject4Client', {
      kode_client: passProfileData.kode_client,
    }).then(response => {
      console.log(response.data.result);
      Client.post('/kontrakDoneOB', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('kontral OB selesai', response.data.result);
        setFinishedOB(response.data.result);
      });
      setFinishedProject(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/finishedProject4Client', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log(response.data.result);
        Client.post('/kontrakDoneOB', {
          kode_client: passProfileData.kode_client,
        }).then(response => {
          console.log('kontral OB selesai', response.data.result);
          setFinishedOB(response.data.result);
        });
        setFinishedProject(response.data.result);
      });
    });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {finishedProject.map(data => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FeedbackClient', {
                data: data,
                show: 'JS',
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
                <Text style={{fontSize: 20}}>{data.nama_freelancer}</Text>
                <Text>Rp. {data.harga_paket_jasa}</Text>
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
                    backgroundColor: '#ffd700',
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
      {finishedOB.map(data => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FeedbackClient', {
                data: data,
                show: 'OB',
              })
            }
            key={data.kode_pembayaran_jasa}
            style={FinisedProject.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Image
                  resizeMode="cover"
                  source={{uri: data.gambar}}
                  style={FinisedProject.poster}
                />
              </View>
              <View style={{flex: 2, alignSelf: 'center'}}>
                <Text style={{fontSize: 20}}>{data.nama_freelancer}</Text>
                <Text>
                  {formatNumber(data.anggaran_yang_ditetapkan, {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 2,
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

const SelesaiStackScreen = () => (
  <SelesaiStack.Navigator screenOptions={{headerShown: false}}>
    <SelesaiStack.Screen name="Selesai" component={Selesai} />
  </SelesaiStack.Navigator>
);

export default SelesaiStackScreen;
