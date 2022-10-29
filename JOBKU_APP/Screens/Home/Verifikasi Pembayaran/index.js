import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Checkout, VP} from '../../../JOBKU RESC/componentStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Client from '../../../mysql api/client';
import moment from 'moment';
import {Verif} from '../../../JOBKU RESC/componentStyles';
import {formatNumber} from 'react-native-currency-input';

const Verifikasi_Pembayaran = ({navigation, route}) => {
  const {
    kode_pembayaran_jasa,
    kodekontrak,
    urlImage,
    persentase,
    harga,
    downpayment,
    dp,
    sdp,
    jenispaket,
    tglktrk,
    namapry,
    untuk,
    status,
    screen,
    dataShow,
    arrays,
  } = route.params;
  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

  const kirimBukti = () => {
    if (downpayment == 1) {
      if (sdp == 0) {
        Client.put(`/PelunasanDP/${kode_pembayaran_jasa}`, {
          paymentID: kode_pembayaran_jasa,
          tanggal_bayar: tanggalskg,
          buktitransfer: urlImage,
          status: 2,
        }).then(response => {
          Alert.alert(
            'Terima Kasih',
            'Pembayaran kedua untuk downpayment anda telah berhasil, menunggu konfirmasi bukti transfer dari admin',
            [
              {
                text: 'Saya Mengerti',
                onPress: () => navigation.navigate('Home'),
              },
            ],
            {
              cancelable: true,
              onDismiss: () => navigation.navigate('Home'),
            },
          );
          console.log(response);
        });
      } else {
        Client.post('/PaymentDetailService', {
          kode_pembayaran_jasa: kode_pembayaran_jasa,
          tanggal_pembayaran_jasa: tanggalskg,
          jumlah_pembayaran: dp,
          jumlah_yang_belum_dibayar: sdp,
          bukti_transfer: urlImage,
          status_konfirmasi: 2,
        }).then(response => {
          Client.post('/PaymentDetailService', {
            kode_pembayaran_jasa: kode_pembayaran_jasa,
            tanggal_pembayaran_jasa: '',
            jumlah_pembayaran: sdp,
            jumlah_yang_belum_dibayar: 0,
            bukti_transfer: '',
            status_konfirmasi: 1,
          }).then(response => {
            Client.put(`/updateContract4PaymentJasa/${kodekontrak}`, {
              contractID: kodekontrak,
            }).then(response => {
              console.log('update kontrak', response);
              Alert.alert(
                'Terima Kasih',
                'Pembayaran pertama anda telah berhasil, menunggu konfirmasi bukti transfer dari admin. Untuk Pembayaran kedua dapat diakses melalui Tab Management > Tab Pembayaran > Bagian Belum Lunas',
                [
                  {
                    text: 'Saya Mengerti',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () => navigation.navigate('Home'),
                },
              );
            });
            console.log('second trx', response);
          });
          console.log('first trx', response);
        });
      }
    } else {
      Client.post('/PaymentDetailService', {
        kode_pembayaran_jasa: kode_pembayaran_jasa,
        tanggal_pembayaran_jasa: tanggalskg,
        jumlah_pembayaran: harga,
        jumlah_yang_belum_dibayar: 0,
        bukti_transfer: urlImage,
        status_konfirmasi: 2,
      }).then(response => {
        Client.put(`/updateContract4PaymentJasa/${kodekontrak}`, {
          contractID: kodekontrak,
        }).then(response => {
          console.log(response);
          Alert.alert(
            'Terima Kasih',
            'Pembayaran pertama anda telah berhasil, menunggu konfirmasi bukti transfer dari admin',
            [
              {
                text: 'Saya Mengerti',
                onPress: () => navigation.navigate('Home'),
              },
            ],
            {
              cancelable: true,
              onDismiss: () => navigation.navigate('Home'),
            },
          );
        });
        console.log(response);
      });
    }
  };

  React.useEffect(async () => {
    console.log(dataShow, arrays);
    // if (kode_pembayaran_jasa == !null) {
    //   await Client.post('/chkPayment', {
    //     kode_pembayaran: kode_pembayaran_jasa,
    //   }).then(response => {
    //     console.log(response.data.result[0]);
    //     if (response.data.result[0].status == 1) {
    //       navigation.navigate('Confirmed');
    //     }
    //   });
    // }
  }, []);

  return (
    <ScrollView>
      <View style={Checkout.downpayment}>
        <Icon style={{margin: 5}} name="information-circle" size={25} />
        <View style={{margin: 10}}>
          <Text style={{color: '#FFF5B7'}} ellipsizeMode="tail">
            {
              'Pemesanan jasa yang anda pesan akan dikerjakan ketika pembayaran telah diverifikasi oleh admin. \nMohon upload bukti pembayaran agar verifikasi dapat dilakukan.'
            }
          </Text>
        </View>
      </View>
      <View>
        <View style={VP.noPic}>
          {urlImage ? (
            <Image
              source={{uri: urlImage}}
              style={{
                width: 140,
                height: 210,
                alignSelf: 'center',
                borderRadius: 10,
              }}
            />
          ) : (
            <View
              style={{
                width: 140,
                height: 210,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderRadius: 10,
                margin: 5,
                alignSelf: 'center',
              }}>
              <Text style={{textAlign: 'center', marginTop: 10}}>
                Silahkan pilih gambar
              </Text>
            </View>
          )}
        </View>
        <View style={{marginTop: '7%', margin: '5%'}}>
          <Button
            title="Ambil Gambar"
            onPress={() =>
              navigation.navigate('ImageUser', {
                screenSource: screen,
              })
            }
          />
        </View>
        <View style={{marginTop: '3%', margin: '5%'}}>
          {urlImage ? (
            <Button title="Kirim" onPress={kirimBukti} />
          ) : (
            <Button disabled={true} title="Kirim" onPress={kirimBukti} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Verifikasi_Pembayaran;
