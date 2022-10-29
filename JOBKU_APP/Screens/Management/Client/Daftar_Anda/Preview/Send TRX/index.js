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
import {Checkout, VP} from '../../../../../../JOBKU RESC/componentStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Client from '../../../../../../mysql api/client';
import moment from 'moment';
import {Verif} from '../../../../../../JOBKU RESC/componentStyles';

const SendTRX = ({navigation, route}) => {
  const {kodeKontraOB, previewData, data, persen, jp, kodebyr, jtb, urlImage} =
    route.params;

  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

  const kirimBuktiTRX = () => {
    if (jp > 0) {
      if (jtb == 0) {
        Client.put(`/PelunasanDP4OB/${kodebyr}`, {
          waktu_pembayaran_kontrak_ob: tanggalskg,
          bukti_pembayaran: urlImage,
          status_konfirmasi_pembayaran: 2,
          paymentOB_ID: kodebyr,
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
        Client.post('/ContractPaymentDetail', {
          kode_pembayaran_kontrak_ob: kodebyr,
          waktu_pembayaran_kontrak_ob: tanggalskg,
          jumlah_terbayar: data.anggaran_yang_ditetapkan * persen,
          jumlah_yang_belum_terbayar: jtb,
          bukti_pembayaran: urlImage,
          status_konfirmasi_pembayaran: 2,
        }).then(response => {
          Client.post('/ContractPaymentDetail', {
            kode_pembayaran_kontrak_ob: kodebyr,
            waktu_pembayaran_kontrak_ob: '',
            jumlah_terbayar: jtb,
            jumlah_yang_belum_terbayar: 0,
            bukti_pembayaran: '',
            status_konfirmasi_pembayaran: 1,
          }).then(response => {
            Client.put(`/updateContractOB/${kodeKontraOB}`, {
              contractOB_ID: kodeKontraOB,
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
      Client.post('/ContractPaymentDetail', {
        kode_pembayaran_kontrak_ob: kodebyr,
        waktu_pembayaran_kontrak_ob: tanggalskg,
        jumlah_terbayar: data.anggaran_yang_ditetapkan,
        jumlah_yang_belum_terbayar: 0,
        bukti_pembayaran: urlImage,
        status_konfirmasi_pembayaran: 2,
      }).then(response => {
        Client.put(`/updateContractOB/${kodeKontraOB}`, {
          contractOB_ID: kodeKontraOB,
        }).then(response => {
          console.log(response);
          Alert.alert(
            'Terima Kasih',
            'Pembayaran pertama anda telah berhasil, menunggu konfirmasi bukti transfer dari admin',
            [
              {
                text: 'Saya Mengerti',
                onPress: () => navigation.navigate('Open Bidding'),
              },
            ],
            {
              cancelable: true,
              onDismiss: () => navigation.navigate('Open Bidding'),
            },
          );
        });
        console.log(response);
      });
    }
  };

  React.useEffect(async () => {
    console.log(previewData, data);
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
                screenSource: 'KirimBuktiTF',
              })
            }
          />
        </View>
        <View style={{marginTop: '3%', margin: '5%'}}>
          {urlImage ? (
            <Button title="Kirim" onPress={kirimBuktiTRX} />
          ) : (
            <Button disabled={true} title="Kirim" onPress={kirimBuktiTRX} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SendTRX;
