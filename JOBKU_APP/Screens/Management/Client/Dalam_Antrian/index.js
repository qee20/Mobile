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
import {formatNumber} from 'react-native-currency-input';
import {List, Chip} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DalamAntrianStack = createStackNavigator();

function DalamAntrian({navigation, route}) {
  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
  var d = Date.now();
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [onWay, setOnway] = React.useState([]);
  const [onWayOB, setOnwayOB] = React.useState([]);
  const [milesTone, setMilesStone] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/jasaSedangDikerjakan', {
      kode_client: passProfileData.kode_client,
    }).then(response => {
      console.log('Onway', response.data.result);
      Client.post('/kontrakRunningOB', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('OB berjalan', response.data.result);
        setOnwayOB(response.data.result);
      });
      setOnway(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/jasaSedangDikerjakan', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('Onway', response.data.result);
        Client.post('/kontrakRunningOB', {
          kode_client: passProfileData.kode_client,
        }).then(response => {
          console.log('OB berjalan', response.data.result);
          setOnwayOB(response.data.result);
        });
        setOnway(response.data.result);
      });
    });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {onWay.map((data, index) => {
        return (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PantauProyek', {
                  kode_pembayaran_jasa: data.kode_pembayaran_jasa,
                  kodekontrak: data.kode_kontrak_jasa,
                  harga: data.harga_paket_jasa,
                  downpayment: data.downpayment,
                  dp: data.harga_paket_jasa * data.persentase_dp,
                  sdp:
                    data.harga_paket_jasa -
                    data.harga_paket_jasa * data.persentase_dp,
                  persentase: data.persentase_dp,
                  tglktrk: data.tanggal_kontrak,
                  jenispaket: data.nama_jenis_paket,
                  namapry: data.judul_proyek,
                  client: data.nama_client,
                  freelancer: data.nama_freelancer,
                  onWay,
                  milesTone,
                  statusBayar: data.status_pembayaran_jasa,
                  statusProyek: data.status_proyek_jasa,
                  display: 'JS',
                  OBDATA: data,
                })
              }
              key={index}
              style={FinisedProject.container}>
              <View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <Image
                    source={{uri: data.fotoProfil}}
                    style={{width: 50, height: 50, borderRadius: 30}}
                  />
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {data.nama_freelancer}
                  </Text>
                </View>
                <Text style={{margin: 5}} numberOfLines={1}>
                  {data.judul_proyek}
                </Text>
                <View style={{margin: 5}}>
                  <Text>
                    {data.nama_kategori} - {data.nama_sub_kategori}
                  </Text>
                  <Text
                    style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>
                    Paket {data.nama_jenis_paket}
                  </Text>
                </View>
                <Chip
                  mode="outlined"
                  icon="information"
                  onPress={() => console.log('Pressed')}>
                  Penawaran Jasa
                </Chip>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
      {onWayOB.map((data, index) => {
        return (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PantauProyek', {
                  kode_pembayaran_jasa: data.kode_pembayaran_jasa,
                  kodekontrak: data.kode_kontrak_jasa,
                  harga: data.harga_paket_jasa,
                  downpayment: data.downpayment,
                  dp: data.harga_paket_jasa * data.persentase_dp,
                  sdp:
                    data.harga_paket_jasa -
                    data.harga_paket_jasa * data.persentase_dp,
                  persentase: data.persentase_dp,
                  tglktrk: data.tanggal_kontrak,
                  jenispaket: data.nama_jenis_paket,
                  namapry: data.judul_proyek,
                  client: data.nama_client,
                  freelancer: data.nama_freelancer,
                  onWay,
                  milesTone,
                  statusBayar: data.status_pembayaran_jasa,
                  statusProyek: data.status_proyek_jasa,
                  display: 'OB',
                  OBDATA: data,
                })
              }
              key={index}
              style={FinisedProject.container}>
              <View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <Image
                    source={{uri: data.fotoProfil}}
                    style={{width: 50, height: 50, borderRadius: 30}}
                  />
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {data.nama_freelancer}
                  </Text>
                </View>
                <Text style={{margin: 5}} numberOfLines={1}>
                  {data.judul_open_bidding}
                </Text>
                <View style={{flex: 2, margin: 5}}>
                  <Text numberOfLines={1}>
                    {data.nama_kategori} - {data.nama_sub_kategori}
                  </Text>
                  <Text>{data.nama_jenis_paket}</Text>
                  <Chip
                    mode="outlined"
                    icon="information"
                    onPress={() => console.log('Pressed')}>
                    Open Bidding
                  </Chip>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const DalamAntrianStackScreen = () => (
  <DalamAntrianStack.Navigator screenOptions={{headerShown: false}}>
    <DalamAntrianStack.Screen name="DalamAntrian" component={DalamAntrian} />
  </DalamAntrianStack.Navigator>
);

export default DalamAntrianStackScreen;
