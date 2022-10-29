import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import {PreviewJasa} from '../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import {Rating} from 'react-native-elements';
import {formatNumber} from 'react-native-currency-input';

const Preview = ({navigation, route}) => {
  const {dataShow} = route.params;

  const [daftarPaketJasa1, setDaftarPaketJasa1] = React.useState([]);
  const [daftarPaketJasa2, setDaftarPaketJasa2] = React.useState([]);
  const [daftarPaketJasa3, setDaftarPaketJasa3] = React.useState([]);
  const [indexPkt, setIndexPkT] = React.useState(0);
  const [ulasanClient, setUlasanClient] = React.useState([]);

  const Confirm = detail => {
    Alert.alert(
      'Sewa Freelancer',
      `Anda memilih paket ${
        detail.detail.nama_jenis_paket
      } dengan harga  ${formatNumber(detail.detail.harga_paket_jasa, {
        separator: ',',
        prefix: 'Rp ',
        precision: 0,
        delimiter: '.',
        signPosition: 'beforePrefix',
      })} , lanjutkan ?`,
      [
        {
          text: 'Lanjutkan',
          onPress: () =>
            navigation.navigate('Hiring', {dataShow: detail.detail}),
        },
      ],
      {cancelable: true},
    );
    console.log(detail);
  };

  React.useEffect(async () => {
    navigation.addListener('focus', async () => {
      await Client.post('/paketPenawaranJasaFreelancer', {
        kode_penawaran_jasa: dataShow.kode_penawaran_jasa,
      }).then(response => {
        setDaftarPaketJasa1(response.data.result[0]);
        setDaftarPaketJasa2(response.data.result[1]);
        setDaftarPaketJasa3(response.data.result[2]);
        Client.post('/ulasanPenawaranJasa', {
          kode_penawaran_jasa: dataShow.kode_penawaran_jasa,
        }).then(response => {
          console.log(response.data);
          setUlasanClient(response.data);
        });
      });
    });
  }, []);
  return (
    <ScrollView>
      <View style={PreviewJasa.header}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {dataShow.judul_proyek}
        </Text>
        <Text style={{textAlign: 'center', color: 'blue', fontWeight: 'bold'}}>
          {dataShow.nama_freelancer}
        </Text>
      </View>
      <View style={PreviewJasa.ProfileInfoFr}>
        <Image
          source={{uri: dataShow.fotoProfil}}
          style={{width: 80, height: 80, borderRadius: 50}}
        />
      </View>
      <View style={PreviewJasa.PosterDes}>
        <Image
          source={{uri: dataShow.url_gambar}}
          style={{width: 200, height: 200, borderRadius: 10}}
          resizeMode="contain"
        />
        <Text style={{margin: 5}}>{dataShow.deskripsi_proyek}</Text>
        <Text style={{margin: 5, color: '#FF7600', fontWeight: 'bold'}}>
          Terima Lama Pengerjaan hingga {dataShow.lama_pengerjaan_yang_diterima}{' '}
          hari
        </Text>
      </View>

      <View style={PreviewJasa.btnGrp}>
        <Button
          type="clear"
          title={daftarPaketJasa1.nama_jenis_paket}
          onPress={() => setIndexPkT(0)}
        />
        <Button
          type="clear"
          title={daftarPaketJasa2.nama_jenis_paket}
          onPress={() => setIndexPkT(1)}
        />
        <Button
          type="clear"
          title={daftarPaketJasa3.nama_jenis_paket}
          onPress={() => setIndexPkT(2)}
        />
      </View>
      <View>
        {indexPkt == 0 ? (
          <TouchableOpacity
            onPress={() => Confirm({detail: daftarPaketJasa1})}
            style={PreviewJasa.infoPaket}>
            <Text style={PreviewJasa.harga}>
              Harga :
              {formatNumber(daftarPaketJasa1.harga_paket_jasa, {
                separator: ',',
                prefix: 'Rp ',
                precision: 0,
                delimiter: '.',
                signPosition: 'beforePrefix',
              })}
            </Text>
            <Text>Keterangan : </Text>
            <Text>{daftarPaketJasa1.keterangan}</Text>
          </TouchableOpacity>
        ) : indexPkt == 1 ? (
          <TouchableOpacity
            onPress={() => Confirm({detail: daftarPaketJasa2})}
            style={PreviewJasa.infoPaket}>
            <Text style={PreviewJasa.harga}>
              Harga :
              {formatNumber(daftarPaketJasa2.harga_paket_jasa, {
                separator: ',',
                prefix: 'Rp ',
                precision: 0,
                delimiter: '.',
                signPosition: 'beforePrefix',
              })}
            </Text>
            <Text>Keterangan : </Text>
            <Text>{daftarPaketJasa2.keterangan}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => Confirm({detail: daftarPaketJasa3})}
            style={PreviewJasa.infoPaket}>
            <Text style={PreviewJasa.harga}>
              Harga :
              {formatNumber(daftarPaketJasa3.harga_paket_jasa, {
                separator: ',',
                prefix: 'Rp ',
                precision: 0,
                delimiter: '.',
                signPosition: 'beforePrefix',
              })}
            </Text>
            <Text>Keterangan : </Text>
            <Text>{daftarPaketJasa3.keterangan}</Text>
          </TouchableOpacity>
        )}
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
                </View>
              );
            })}
          </View>
        ) : (
          <View>
            <Text>Belum ada ulasan</Text>
          </View>
        )}
      </View>
      <View style={{margin: 20}}>
        <Button title="Lihat Semua Ulasan" />
      </View>
    </ScrollView>
  );
};

export default Preview;
