import React from 'react';
import {View, Text} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import moment from 'moment';

const TRXDetail = ({navigation, route}) => {
  const {data, type2Show} = route.params;

  if (type2Show == 'OB') {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, margin: 5}}>
          Detail Pembayaran Kontrak Open Bidding
        </Text>
        <View style={{backgroundColor: '#9EEFE5'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <View style={{margin: 5}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#185ADB',
                  }}>
                  Nomor Kontrak
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#FB9300',
                  }}>
                  Kode Pembayaran
                </Text>
                <Text>Waktu Kontrak</Text>
                <Text>Harga Kontrak</Text>
                <Text>Persentase DP</Text>
                <Text>Jumlah Pembayaran DP</Text>
                <Text>Jenis Pembayaran</Text>
                <Text>Waktu Pembayaran</Text>
                <Text>Status Pembayaran</Text>
              </View>
              <View style={{margin: 5}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#185ADB',
                  }}>
                  {data.kode_kontrak_OB}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#FB9300',
                  }}>
                  {data.kode_pembayaran_kontrak_open_bidding}
                </Text>
                <Text>
                  {moment(data.tanggal_mulai_kontrak_ob).format(
                    'HH:mm:ss | DD-MM-YYYY',
                  )}
                </Text>
                <Text>
                  {formatNumber(data.anggaran_yang_ditetapkan, {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                  })}
                </Text>
                <Text>{data.persentase_yang_ditetapkan * 100} %</Text>
                <Text>
                  {formatNumber(data.jumlah_pembayaran_kontrak_open_bidding, {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                  })}
                </Text>
                <Text>Down Payment</Text>
                <Text>
                  {moment(
                    data.waktu_detail_pembayaran_kontrak_open_bidding,
                  ).format('HH:mm:ss | DD-MM-YYYY')}
                </Text>
                <Text>{data.status_konfirmasi_pembayaran_open_bidding}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, margin: 5}}>
          Detail Pembayaran Kontrak Jasa
        </Text>
        <View style={{backgroundColor: '#9EEFE5'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <View style={{margin: 5}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#185ADB',
                  }}>
                  Nomor Kontrak
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#FB9300',
                  }}>
                  Kode Pembayaran
                </Text>
                <Text>Waktu Kontrak</Text>
                <Text>Harga Kontrak</Text>
                <Text>Persentase DP</Text>
                <Text>Jumlah Pembayaran DP</Text>
                <Text>Jenis Pembayaran</Text>
                <Text>Waktu Pembayaran</Text>
                <Text>Status Pembayaran</Text>
              </View>
              <View style={{margin: 5}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#185ADB',
                  }}>
                  {data.kode_kontrak_jasa}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    margin: 3,
                    fontSize: 16,
                    color: '#FB9300',
                  }}>
                  {data.kode_pembayaran_jasa}
                </Text>
                <Text>
                  {moment(data.tanggal_kontrak_jasa).format(
                    'HH:mm:ss | DD-MM-YYYY',
                  )}
                </Text>
                <Text>
                  {formatNumber(data.harga_paket_jasa, {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                  })}
                </Text>
                <Text>{data.persentase_dp * 100} %</Text>
                <Text>
                  {formatNumber(data.jumlah_pembayaran, {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 2,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                  })}
                </Text>
                <Text>Down Payment</Text>
                <Text>
                  {moment(data.waktu_pembayaran).format(
                    'HH:mm:ss | DD-MM-YYYY',
                  )}
                </Text>
                <Text>{data.status_konfirmasi}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default TRXDetail;
