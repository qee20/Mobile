import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Pendingtrx} from '../../../../JOBKU RESC/componentStyles';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import {Avatar, Card, IconButton} from 'react-native-paper';
import moment from 'moment';
import {formatNumber} from 'react-native-currency-input';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const BelumBayarStack = createStackNavigator();

function BelumBayar({navigation}) {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [pendingPayment, setPendingPayment] = React.useState([]);
  const [pendingPaymentOB, setPendingPaymentOB] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/chkPendingPaymentProjectS', {
      kode_freelancer: passProfileData.kode_freelancer,
    }).then(response => {
      console.log('pending', response.data.result);
      Client.post('/PendingOB4Freelancer', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('OBpendinghepeng', response.data);
        setPendingPaymentOB(response.data);
      });
      setPendingPayment(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/chkPendingPaymentProjectS', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('pending', response.data.result);
        Client.post('/PendingOB4Freelancer', {
          kode_freelancer: passProfileData.kode_freelancer,
        }).then(response => {
          console.log('OBpendinghepeng', response.data);
          setPendingPaymentOB(response.data);
        });
        setPendingPayment(response.data.result);
      });
    });
  }, []);

  if (pendingPayment.length == 0 && pendingPaymentOB.length == 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginTop: 20}}>
          <Text style={{alignSelf: 'center'}}>
            Proyek pembayaran tertunda sedang tidak ada
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
        {pendingPayment.map(data => {
          return (
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('VerifikasiPembayaran', {
              //     kode_pembayaran_jasa: data.kode_pembayaran_jasa,
              //     kodekontrak: data.kode_kontrak_projek_jasa,
              //     harga: data.harga,
              //     downpayment: data.downpayment,
              //     dp: data.jumlah_pembayaran,
              //     sdp: data.jumlah_yang_belum_dibayar,
              //     persentase: data.persentase_dp,
              //     tglktrk: data.tanggal_kontrak,
              //     jenispaket: data.nama_jenis_paket,
              //     namapry: data.judul_proyek,
              //   })
              // }
              key={data.kode_pembayaran_jasa}
              style={{
                borderWidth: 1,
                margin: 5,
                borderRadius: 10,
              }}>
              <Card.Title
                title={data.judul_proyek}
                subtitle={formatNumber(data.harga_paket_jasa, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 0,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })}
                left={props => (
                  <Avatar.Image {...props} source={{uri: data.fotoProfil}} />
                )}
              />

              {/* {data.status_pembayaran_jasa == 0 ? (
                <Text style={Pendingtrx.pending}>Pending ...</Text>
              ) : (
                <Text style={Pendingtrx.confirmed}>Dikonfirmasi</Text>
              )} */}
            </TouchableOpacity>
          );
        })}
        {pendingPaymentOB.map(data => {
          return (
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('VerifikasiPembayaran', {
              //     kode_pembayaran_jasa: data.kode_pembayaran_jasa,
              //     kodekontrak: data.kode_kontrak_projek_jasa,
              //     harga: data.harga,
              //     downpayment: data.downpayment,
              //     dp: data.jumlah_pembayaran,
              //     sdp: data.jumlah_yang_belum_dibayar,
              //     persentase: data.persentase_dp,
              //     tglktrk: data.tanggal_kontrak,
              //     jenispaket: data.nama_jenis_paket,
              //     namapry: data.judul_proyek,
              //   })
              // }
              key={data.kode_pembayaran_jasa}
              style={{
                borderWidth: 1,
                margin: 5,
                borderRadius: 10,
              }}>
              <Card.Title
                title={data.judul_proyek}
                subtitle={formatNumber(data.harga_paket_jasa, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 0,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })}
                left={props => (
                  <Avatar.Image {...props} source={{uri: data.fotoProfil}} />
                )}
              />

              {/* {data.status_pembayaran_jasa == 0 ? (
                <Text style={Pendingtrx.pending}>Pending ...</Text>
              ) : (
                <Text style={Pendingtrx.confirmed}>Dikonfirmasi</Text>
              )} */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const BelumBayarStackScreen = () => (
  <BelumBayarStack.Navigator screenOptions={{headerShown: false}}>
    <BelumBayarStack.Screen name="BelumBayar" component={BelumBayar} />
  </BelumBayarStack.Navigator>
);

export default BelumBayarStackScreen;
