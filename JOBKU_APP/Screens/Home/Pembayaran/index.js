import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';

const Pembayaran = ({navigation, route}) => {
  const {
    kode_pembayaran_jasa,
    kodekontrak,
    persentase,
    harga,
    downpayment,
    dp,
    sdp,
    dataShow,
    arrays,
  } = route.params;
  return (
    <View>
      <Text>Kode Pembayaran : {kode_pembayaran_jasa}</Text>
      <Text style={{textAlign: 'center', margin: 5}}>Nomor Rekening</Text>
      <Text
        style={{
          textAlign: 'center',
          margin: 5,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        532 - 45687 - 09889
      </Text>
      <Text
        style={{
          textAlign: 'center',
          margin: 5,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        JOBKU - BRI
      </Text>
      <Text style={{textAlign: 'center'}}>Jumlah yang harus dibayarkan</Text>
      {downpayment == 1 ? (
        <Text style={{textAlign: 'center', fontSize: 35}}>
          {formatNumber(dp, {
            separator: ',',
            prefix: 'Rp ',
            precision: 0,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })}
        </Text>
      ) : (
        <Text style={{textAlign: 'center'}}>
          {formatNumber(harga, {
            separator: ',',
            prefix: 'Rp ',
            precision: 0,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })}
        </Text>
      )}
      <Text style={{fontSize: 20, margin: 5}}>
        Segera lakukan pembayaran sesuai jumlah tagihan diatas dan sebelum batas
        waktu yang ditentukan{' '}
      </Text>
      <View style={{margin: 20}}>
        <Button
          title="Bayar Sekarang"
          onPress={() =>
            navigation.navigate('VerifikasiPembayaran', {
              kode_pembayaran_jasa,
              kodekontrak,
              harga: harga,
              downpayment,
              dp: dp,
              sdp: sdp,
              persentase,
              untuk: 'dp',
              screen: 'VerifikasiPembayaran',
              dataShow,
              arrays,
            })
          }
        />
      </View>
      <View style={{margin: 20}}>
        <Button title="Batal" />
      </View>
    </View>
  );
};

export default Pembayaran;
