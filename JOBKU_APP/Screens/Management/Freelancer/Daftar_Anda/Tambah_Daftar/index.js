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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CompStyle} from '../../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../Context/Context';
import Slider from '@react-native-community/slider';
import CurrencyInput from 'react-native-currency-input';
import {HelperText} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';

const TambahDaftar = ({route, navigation}) => {
  const {urlImage} = route.params;
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

  const [judulProyek, setJudulProyek] = React.useState('');
  const [deskripsiProyek, setDeskripsiProyek] = React.useState('');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [valuenow, setValueNow] = React.useState('Pilih Kategori');
  const [valuenowsk, setValueNowSK] = React.useState('Pilih Sub Kategori');
  const [kategori, setKategori] = React.useState([]);
  const [subKategori, setSubKategori] = React.useState([]);
  const [hargaP1, sethargaP1] = React.useState('');
  const [hargaP2, sethargaP2] = React.useState('');
  const [hargaP3, sethargaP3] = React.useState('');
  const [ket1, setket1] = React.useState('');
  const [ket2, setket2] = React.useState('');
  const [ket3, setket3] = React.useState('');
  const [permintaanlamapengerjaan, setpermintaanlamapengerjaan] =
    React.useState(0);

  const getKategori = async () => {
    await Client.get('/getKategori').then(response => {
      var data = [];
      data = response.data;
      setKategori(data);
      console.log(data);
    });
  };

  const getSubKategori = async (itemValue, itemValueSK) => {
    setValueNowSK(itemValueSK);
    setValueNow(itemValue);
    await Client.post('/getSubKategori', {kode_kategori: itemValue}).then(
      response => {
        console.log(response.data.subkategori);
        setSubKategori(response.data.subkategori);
      },
    );
  };

  const addPenawaranJasa = async () => {
    await Client.post('/tambahDaftarJasa', {
      kode_freelancer: passProfileData.kode_freelancer,
      kode_subkategori_proyek: valuenowsk,
      tanggal: tanggalskg,
      judul_proyek: judulProyek,
      deskripsi_proyek: deskripsiProyek,
      urlGambar: urlImage,
      terimaDP: toggleCheckBox,
      lamapengerjaan: permintaanlamapengerjaan,
    })
      .then(response => {
        console.log('add jasa   ,', response);
        Client.post('/retreiveKodePenawaran', {
          judul_proyek: judulProyek,
        })
          .then(response => {
            console.log('ambil kode jasa   ,', response);
            Client.post('/dataPaketJasa', {
              kode_penawaran_jasa: response.data.kodejasa,
              basic: 'PKG001',
              medium: 'PKG002',
              premium: 'PKG003',
              hargaP1: hargaP1,
              hargaP2: hargaP2,
              hargaP3: hargaP3,
              ket1: ket1,
              ket2: ket2,
              ket3: ket3,
            })
              .then(response => {
                console.log(response);
                Alert.alert('Tambah Penawaran Jasa', 'Berhasil ditambahkan !', [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('DaftarAnda'),
                  },
                ]);
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    getKategori();
    getDataProfile();
  }, []);

  return (
    <ScrollView>
      <Text style={CompStyle.labelTbh}>Kategori Proyek</Text>
      <View style={CompStyle.pickerX}>
        <Picker
          dropdownIconColor="black"
          selectedValue={valuenow}
          onValueChange={(itemValue, itemIndex) => getSubKategori(itemValue)}>
          {kategori.map((item, index) => {
            return (
              <Picker.Item
                style={{backgroundColor: '#574EDB', color: 'white'}}
                label={item.nama_kategori}
                value={item.kode_kategori}
                key={index}
              />
            );
          })}
        </Picker>
      </View>
      <Text style={CompStyle.labelTbh}>Subkategori Proyek</Text>
      <View style={CompStyle.pickerX}>
        <Picker
          itemStyle={{backgroundColor: 'red'}}
          selectedValue={valuenowsk}
          onValueChange={(itemValueSK, itemIndex) =>
            setValueNowSK(itemValueSK)
          }>
          {subKategori.map((item, index) => {
            return (
              <Picker.Item
                style={{backgroundColor: '#574EDB', color: 'white'}}
                label={item.nama_sub_kategori}
                value={item.kode_sub_kategori_proyek}
                key={index}
              />
            );
          })}
        </Picker>
      </View>
      <Text style={CompStyle.labelTbh}>Judul Proyek</Text>
      <TextInput
        style={CompStyle.inputTbh}
        placeholder="Masukkan Judul Proyek"
        value={judulProyek}
        onChangeText={value => {
          setJudulProyek(value);
        }}
      />
      <Text style={CompStyle.labelTbh}>Deskripsi Proyek</Text>
      <TextInput
        multiline={true}
        style={CompStyle.inputTbh}
        placeholder="Tambahkan Deskripsi Proyek"
        value={deskripsiProyek}
        onChangeText={value => {
          setDeskripsiProyek(value);
        }}
      />
      <Text style={{margin: 5}}>
        Terima lama pengerjaan selama : {permintaanlamapengerjaan} hari
      </Text>
      <Slider
        style={{margin: 5}}
        value={permintaanlamapengerjaan}
        onValueChange={setpermintaanlamapengerjaan}
        maximumValue={14}
        step={1}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="#000000"
      />
      <View style={CompStyle.illus}>
        <Text style={CompStyle.labelTbh}>Ilustrasi Pendukung</Text>
        {urlImage ? (
          <Image
            style={{
              width: 240,
              height: 120,
              marginBottom: 10,
              borderRadius: 10,
            }}
            resizeMode="cover"
            source={{uri: urlImage}}
          />
        ) : (
          <View style={CompStyle.noImage}>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No Image Selected
            </Text>
          </View>
        )}
      </View>
      <Button
        title="Pilih dari koleksi JOBKU"
        onPress={() =>
          navigation.navigate('JOBKU Image User', {
            screenSource: 'TambahDaftarPenawaranJasa',
          })
        }
      />
      <View style={CompStyle.DP}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text>Terima Pembayaran Down-Payment</Text>
      </View>
      <Text style={CompStyle.subt}>Paket Pengerjaan</Text>
      <Text style={CompStyle.highlight}>Paket Basic</Text>
      <Text style={CompStyle.labelTbh}>Harga Paket</Text>
      <CurrencyInput
        keyboardType="numeric"
        style={CompStyle.inputTbh}
        value={hargaP1}
        onChangeValue={sethargaP1}
        prefix="Rp. "
        delimiter="."
        separator="-"
        precision={0}
        onChangeText={value => {
          console.log(value); // $2,310.46
        }}
      />
      <HelperText style={{color: '#5089C6'}} type="info" visible={true}>
        Info : Harga Paket akan dikenakan biaya penanganan aplikasi sebanyak 5%{' '}
        {`(${formatNumber(hargaP1 * (5 / 100), {
          separator: ',',
          prefix: 'Rp ',
          precision: 0,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })})`}
      </HelperText>
      <Text style={CompStyle.labelTbh}>Keterangan Paket</Text>
      <TextInput
        multiline={true}
        placeholder="Isi Keterangan paket"
        style={CompStyle.inputTbh}
        value={ket1}
        onChangeText={value => {
          setket1(value);
        }}
      />
      <Text style={CompStyle.highlight}>Paket Medium</Text>
      <Text style={CompStyle.labelTbh}>Harga Paket</Text>
      <CurrencyInput
        keyboardType="numeric"
        style={CompStyle.inputTbh}
        value={hargaP2}
        onChangeValue={sethargaP2}
        prefix="Rp. "
        delimiter="."
        separator="-"
        precision={0}
        onChangeText={value => {
          console.log(value); // $2,310.46
        }}
      />
      <HelperText style={{color: '#5089C6'}} type="info" visible={true}>
        Info : Harga Paket akan dikenakan biaya penanganan aplikasi sebanyak 5%{' '}
        {`(${formatNumber(hargaP2 * (5 / 100), {
          separator: ',',
          prefix: 'Rp ',
          precision: 0,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })})`}
      </HelperText>
      <Text style={CompStyle.labelTbh}>Keterangan Paket</Text>
      <TextInput
        multiline={true}
        placeholder="Isi Keterangan paket"
        style={CompStyle.inputTbh}
        value={ket2}
        onChangeText={value => {
          setket2(value);
        }}
      />
      <Text style={CompStyle.highlight}>Paket Premium</Text>
      <Text style={CompStyle.labelTbh}>Harga Paket</Text>
      <CurrencyInput
        keyboardType="numeric"
        style={CompStyle.inputTbh}
        value={hargaP3}
        onChangeValue={sethargaP3}
        prefix="Rp. "
        delimiter="."
        separator="-"
        precision={0}
        onChangeText={value => {
          console.log(value); // $2,310.46
        }}
      />
      <HelperText style={{color: '#5089C6'}} type="info" visible={true}>
        Info : Harga Paket akan dikenakan biaya penanganan aplikasi sebanyak 5%{' '}
        {`(${formatNumber(hargaP3 * (5 / 100), {
          separator: ',',
          prefix: 'Rp ',
          precision: 0,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })})`}
      </HelperText>
      <Text style={CompStyle.labelTbh}>Keterangan Paket</Text>
      <TextInput
        multiline={true}
        placeholder="Isi Keterangan paket"
        style={CompStyle.inputTbh}
        value={ket3}
        onChangeText={value => {
          setket3(value);
        }}
      />
      <Button title="Tambah" onPress={addPenawaranJasa} />
    </ScrollView>
  );
};

export default TambahDaftar;
