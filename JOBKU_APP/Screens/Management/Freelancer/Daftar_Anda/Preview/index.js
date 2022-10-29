import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  CompStyle,
  PreviewJasa,
} from '../../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../Context/Context';
import {Rating} from 'react-native-elements';
import {Divider} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';

const PreviewJasa4F = ({navigation, route}) => {
  const {penawaran_jasa} = route.params;

  const [ulasanClient, setUlasanClient] = React.useState([]);
  const [pembayarankedua, setPEmbayarankedua] = React.useState([]);

  React.useEffect(async () => {
    navigation.addListener('focus', async () => {
      Client.post('/ulasanPenawaranJasa', {
        kode_penawaran_jasa: penawaran_jasa.kode_penawaran_jasa,
      }).then(response => {
        console.log('ulasa', response.data);
        setUlasanClient(response.data);
      });
    });
  }, []);

  return (
    <ScrollView>
      <View style={PreviewJasa.header}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {penawaran_jasa.judul_proyek}
        </Text>
        <Text style={{textAlign: 'center', color: 'blue', fontWeight: 'bold'}}>
          {moment(penawaran_jasa.tanggal).format('dddd, DD MMMM YYYY')}
        </Text>
      </View>
      <View style={PreviewJasa.PosterDes}>
        <Image
          source={{uri: penawaran_jasa.url_gambar}}
          style={{width: 200, height: 200, borderRadius: 10}}
          resizeMode="contain"
        />
        <Text style={{margin: 5}}>{penawaran_jasa.deskripsi_proyek}</Text>
      </View>
      <View style={{borderWidth: 1, margin: 5, padding: 5, borderRadius: 10}}>
        {ulasanClient.length > 0 ? (
          <View>
            {ulasanClient.map(ulasan => {
              return (
                <View key={ulasan.kode_ulasan_permintaan_jasa}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, padding: 5}}>
                      <Image
                        source={{uri: ulasan.fotoProfil}}
                        style={{width: 50, height: 50, borderRadius: 30}}
                      />
                    </View>
                    <View style={{flex: 2, padding: 5, alignSelf: 'center'}}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {ulasan.nama_client}
                      </Text>
                      <Text>
                        {moment(ulasan.tanggal_ulasan_penawaran_jasa).format(
                          'DD MMMM YYYY',
                        )}
                      </Text>
                    </View>
                    <View style={{flex: 1, padding: 5, alignSelf: 'center'}}>
                      <Rating
                        imageSize={15}
                        readonly
                        startingValue={ulasan.jumlah_bintang_jasa}
                      />
                      <Text style={{margin: 10}}>
                        {ulasan.nama_jenis_paket}
                      </Text>
                    </View>
                  </View>
                  <Text style={{margin: 5}}>
                    {ulasan.ulasan_penyelesaian_permintaan_jasa}
                  </Text>
                  <Divider
                    style={{height: 2, backgroundColor: 'black', margin: 5}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text>Permintaan Lama Pengerjaan</Text>
                    </View>
                    <View>
                      <Text style={{marginRight: 5}}>
                        {ulasan.permintaan_lama_pengerjaan} hari
                      </Text>
                    </View>
                  </View>
                  <Text>Detail Transaksi</Text>
                  <Divider
                    style={{
                      height: 2,
                      backgroundColor: 'blue',
                      margin: 5,
                      width: '40%',
                    }}
                  />
                  {ulasan.downpayment == 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text>Jumlah Pembayaran</Text>
                        <Text>Jenis Pembayaran</Text>
                        <Text>Dibayar Pada Tanggal </Text>
                      </View>
                      <View>
                        <Text>
                          {' '}
                          {formatNumber(ulasan.harga_paket_jasa, {
                            separator: ',',
                            prefix: 'Rp ',
                            precision: 2,
                            delimiter: '.',
                            signPosition: 'beforePrefix',
                          })}
                        </Text>
                        <Text>
                          {ulasan.downpayment == 0 ? (
                            <Text>Full Payment</Text>
                          ) : (
                            <Text>Down Payment</Text>
                          )}
                        </Text>
                        <Text>
                          {moment(ulasan.waktu_pembayaran).format(
                            'dddd | DD-MMMM-YYYY , HH:mm:ss',
                          )}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text>Jenis Pembayaran</Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Text>Pembayaran Pertama</Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Text>Jumlah Pembayaran</Text>
                        <Text>Sisa Pembayaran</Text>
                        <Text>Dibayar Pada Tanggal </Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Text>Pembayaran Kedua</Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Text>Jumlah Pembayaran</Text>
                        {/* <Text>Sisa Pembayaran</Text> */}
                        <Text>Dibayar Pada Tanggal </Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                      </View>
                      <View>
                        <Text>
                          {ulasan.downpayment == 0 ? (
                            <Text>Full Payment</Text>
                          ) : (
                            <Text>Down Payment</Text>
                          )}
                        </Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Text></Text>

                        <Text>
                          {formatNumber(ulasan.harga_paket_jasa, {
                            separator: ',',
                            prefix: 'Rp ',
                            precision: 2,
                            delimiter: '.',
                            signPosition: 'beforePrefix',
                          })}
                        </Text>
                        {/* <Text>
                      {formatNumber(ulasan.harga_paket_jasa, {
                        separator: ',',
                        prefix: 'Rp ',
                        precision: 2,
                        delimiter: '.',
                        signPosition: 'beforePrefix',
                      })}
                    </Text> */}
                        <Text>
                          {moment(ulasan.waktu_pembayaran).format(
                            'dddd | DD-MMMM-YYYY , HH:mm:ss',
                          )}
                        </Text>
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Divider
                          style={{height: 2, backgroundColor: 'black'}}
                        />
                        <Text></Text>
                        {ulasan.jumlah_yang_belum_dibayar > 0 ? (
                          <Text>Lunas</Text>
                        ) : (
                          <View>
                            <Text>Menunggu Konfirmasi Pembayaran Kedua</Text>
                            {/* <Text>
                      {formatNumber(ulasan.jumlah_pembayaran, {
                        separator: ',',
                        prefix: 'Rp ',
                        precision: 2,
                        delimiter: '.',
                        signPosition: 'beforePrefix',
                      })}
                    </Text>
                    <Text>
                      {formatNumber(ulasan.jumlah_yang_belum_dibayar, {
                        separator: ',',
                        prefix: 'Rp ',
                        precision: 2,
                        delimiter: '.',
                        signPosition: 'beforePrefix',
                      })}
                    </Text>
                    <Text>
                      {moment(ulasan.waktu_pembayaran).format(
                        'dddd | DD-MMMM-YYYY , HH:mm:ss',
                      )}
                    </Text> */}
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <View>
            <Text>Belum ada yang memesan</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PreviewJasa4F;
