import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContextForAuth} from '../../Context/Context';
import Client from '../../mysql api/client';
import FormInput from '../../Form_Auth/FormInput';
import FormSubmitButton from '../../Form_Auth/FormSubmitButton';
import {Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import 'moment/locale/id';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';

const Freelancer_Form = ({route, navigation}) => {
  const {urlImage} = route.params;
  const {sendInfo, state} = React.useContext(ContextForAuth);
  const [provinsi, setProvinsi] = React.useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = React.useState(0);
  const [kabupaten, setKabupaten] = React.useState([]);
  const [selectedKab, setSelectedKab] = React.useState(0);
  const [kecamatan, setKecamatan] = React.useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = React.useState(0);
  const [kelurahan, setKelurahan] = React.useState([]);
  const [selectedKelurahan, setSelectedKelurahan] = React.useState(0);
  const [province, setProvince] = React.useState('');
  const [regency, setRegency] = React.useState('');
  const [districts, setDricticts] = React.useState('');
  const [village, setVillage] = React.useState('');
  var Banks = [
    {namabank: 'BRI (Bank Rakyat Indonesia)', indexnya: 1},
    {namabank: 'BNI (Bank Rakyat Indonesia)', indexnya: 2},
    {namabank: 'BCA (Bank Rakyat Indonesia)', indexnya: 3},
    {namabank: 'Bank Mandiri', indexnya: 4},
    {namabank: 'BTN (Bank Tabungan Negara)', indexnya: 5},
    {namabank: 'Bank CIMB Niaga', indexnya: 6},
    {namabank: 'Maybank', indexnya: 7},
    {namabank: 'Bank OCBC NISP', indexnya: 8},
  ];
  const [selectedBank, setSelectedBank] = React.useState(0);

  const [datex, setDatex] = React.useState('');
  const [tanggalLahir, setTanggalLahir] = React.useState('');
  const [userId, setuserId] = React.useState('');

  const getDataKabupaten = async (itemValue, itemIndex) => {
    setSelectedProvinsi(itemValue);
    await Client.get('https://dev.farizdotid.com/api/daerahindonesia/kota', {
      params: {id_provinsi: itemValue},
    }).then(response => {
      console.log('kabupaten', response.data.kota_kabupaten);
      Client.get('http://dev.farizdotid.com/api/daerahindonesia/provinsi').then(
        response => {
          setProvince(response.data.provinsi[itemIndex].nama);
        },
      );
      setKabupaten(response.data.kota_kabupaten);
    });
  };

  const getKecamatan = async (itemValue, itemIndex) => {
    setSelectedKab(itemValue);
    await Client.get(
      'https://dev.farizdotid.com/api/daerahindonesia/kecamatan',
      {
        params: {id_kota: itemValue},
      },
    ).then(response => {
      console.log('kecamatan', response.data.kecamatan);
      Client.get('https://dev.farizdotid.com/api/daerahindonesia/kota', {
        params: {id_provinsi: selectedProvinsi},
      }).then(response => {
        setRegency(response.data.kota_kabupaten[itemIndex].nama);
      });
      setKecamatan(response.data.kecamatan);
    });
  };

  const getKelurahan = async (itemValue, itemIndex) => {
    setSelectedKecamatan(itemValue);
    await Client.get(
      'https://dev.farizdotid.com/api/daerahindonesia/kelurahan',
      {
        params: {id_kecamatan: itemValue},
      },
    ).then(response => {
      console.log('kelurahan', response);
      Client.get('https://dev.farizdotid.com/api/daerahindonesia/kecamatan', {
        params: {id_kota: selectedKab},
      }).then(response => {
        setDricticts(response.data.kecamatan[itemIndex].nama);
      });
      setKelurahan(response.data.kelurahan);
    });
  };

  const takeLurah = (itemValue, itemIndex) => {
    setSelectedKelurahan(itemValue);
    Client.get('https://dev.farizdotid.com/api/daerahindonesia/kelurahan', {
      params: {id_kecamatan: selectedKecamatan},
    }).then(response => {
      setVillage(response.data.kelurahan[itemIndex].nama);
    });
  };

  const [freelancerInfo, setfreelancerInfo] = React.useState({
    namaLengkap: '',
    alamat: '',
    tempatLahir: '',
    nomorHP: '',
    nomorRekening: '',
    namaBank: '',
    status: 'aktif',
  });
  const {
    namaLengkap,
    alamat,
    tempatLahir,
    nomorHP,
    nomorRekening,
    namaBank,
    status,
  } = freelancerInfo;

  const handleOnChangeText = (value, fieldName) => {
    setfreelancerInfo({...freelancerInfo, [fieldName]: value});
  };

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    Moment.locale('id');
    setTanggalLahir(Moment(date).format('DD MMMM yyyy'));
    setDatex(Moment(date).format('YYYY-MM-DD'));
  };

  const createFreelancer = async () => {
    Client.post('/registerFreelancer', {
      kode_pengguna: state.userId,
      namaFreelancer: namaLengkap,
      alamat: `${alamat}, ${village}, ${districts}, ${regency}, ${province}`,
      tempatLahir: tempatLahir,
      tanggalLahir: datex,
      nomorHP: nomorHP,
      nomorRekening: nomorRekening,
      namaBank: selectedBank,
      fotoProfil: urlImage,
      status: 1,
    })
      .then(response => {
        console.log(response);
        Client.post('/getFreelancerdata', {
          kode_pengguna: state.userId,
        }).then(response => {
          let usrc;
          console.log(response);
          usrc = 'Freelancer';
          sendInfo(usrc);
        });
      })
      .catch(error => alert(error));
  };

  React.useEffect(async () => {
    await Client.get(
      'http://dev.farizdotid.com/api/daerahindonesia/provinsi',
    ).then(response => {
      console.log('provinsi', response.data.provinsi);
      setProvinsi(response.data.provinsi);
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
          <Avatar
            rounded
            source={{
              uri: urlImage,
            }}
            containerStyle={{borderWidth: 1}}
            size="xlarge"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Pilih Foto', {
                screenSource: 'Freelancer_Form',
                userID: userId,
              })
            }
            style={{
              position: 'absolute',
              top: 130,
              right: 100,
            }}>
            <Ionicons name="create-outline" size={50} color="red" />
          </TouchableOpacity>
        </View>
        <FormInput
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          value={namaLengkap}
          onChangeText={value => handleOnChangeText(value, 'namaLengkap')}
        />
        <Text style={{marginLeft: 5, marginTop: 20, fontWeight: 'bold'}}>
          Alamat :
        </Text>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center'}}>
            Provinsi
          </Text>
          <Picker
            style={{flex: 1, alignSelf: 'center'}}
            mode="dialog"
            selectedValue={selectedProvinsi}
            onValueChange={(itemValue, itemIndex) =>
              getDataKabupaten(itemValue, itemIndex)
            }>
            {provinsi.map(prov => {
              return <Picker.Item label={prov.nama} value={prov.id} />;
            })}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center'}}>
            Kabupaten
          </Text>
          {kabupaten.length == 0 ? (
            <Text style={{margin: 10, flex: 1}}>
              Silahkan Pilih Provinsi Dahulu
            </Text>
          ) : (
            <Picker
              style={{flex: 1, alignSelf: 'center'}}
              mode="dialog"
              selectedValue={selectedKab}
              onValueChange={(itemValue, itemIndex) =>
                getKecamatan(itemValue, itemIndex)
              }>
              {kabupaten.map(kab => {
                return <Picker.Item label={kab.nama} value={kab.id} />;
              })}
            </Picker>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center'}}>
            Kecamatan
          </Text>
          {kecamatan.length == 0 ? (
            <Text style={{margin: 10}}>Silahkan Pilih Kabupaten Dahulu</Text>
          ) : (
            <Picker
              style={{flex: 1, alignSelf: 'center'}}
              mode="dialog"
              selectedValue={selectedKecamatan}
              onValueChange={(itemValue, itemIndex) =>
                getKelurahan(itemValue, itemIndex)
              }>
              {kecamatan.map(kec => {
                return <Picker.Item label={kec.nama} value={kec.id} />;
              })}
            </Picker>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center'}}>
            Desa / Kelurahan
          </Text>
          {kelurahan.length == 0 ? (
            <Text style={{margin: 10}}>Silahkan Pilih Kecamatan Dahulu</Text>
          ) : (
            <Picker
              style={{flex: 1, alignSelf: 'center'}}
              mode="dialog"
              selectedValue={selectedKelurahan}
              onValueChange={(itemValue, itemIndex) =>
                takeLurah(itemValue, itemIndex)
              }>
              {kelurahan.map(desa => {
                return <Picker.Item label={desa.nama} value={desa.id} />;
              })}
            </Picker>
          )}
        </View>
        <TextInput
          mode="outlined"
          label="Masukkan alamat detail"
          multiline={true}
          style={{margin: 5}}
          value={alamat}
          onChangeText={value => handleOnChangeText(value, 'alamat')}
        />
        <FormInput
          label="Tempat Lahir"
          placeholder="Masukkan Tempat Lahir"
          value={tempatLahir}
          onChangeText={value => handleOnChangeText(value, 'tempatLahir')}
        />
        <TouchableOpacity onPress={showDatePicker}>
          <FormInput
            editable={false}
            label="Tanggal Lahir"
            placeholder="Silahkan pilih dari tombol"
            value={tanggalLahir}
          />
        </TouchableOpacity>
        <View style={styles.date}>
          <Button title="Buka Kalender" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <FormInput label="NIK" placeholder="Masukkan NIK" />
        <View
          style={{
            margin: 5,
            padding: 5,
            borderWidth: 1,
            borderRadius: 10,
            borderStyle: 'dashed',
            width: 300,
            height: 130,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{flex: 1, alignSelf: 'center'}}>
            Upload KTP untuk identitas diri
          </Text>
          <Text style={{flex: 1, alignSelf: 'center'}}>
            Klik untuk pilih gambar
          </Text>
        </View>
        <FormInput
          label="Nomor Handphone"
          placeholder="cth : 08xxxxxxxxxx"
          value={nomorHP}
          onChangeText={value => handleOnChangeText(value, 'nomorHP')}
        />

        <Text style={{margin: 5, fontWeight: 'bold'}}>Pilih bank</Text>
        <View>
          <Picker
            mode="dialog"
            selectedValue={selectedBank}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedBank(itemValue)
            }>
            {Banks.map(bank => {
              return (
                <Picker.Item label={bank.namabank} value={bank.indexnya} />
              );
            })}
          </Picker>
        </View>
        <FormInput
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening anda"
          value={nomorRekening}
          onChangeText={value => handleOnChangeText(value, 'nomorRekening')}
        />
        <View style={{margin: 20}}>
          <Button title="Daftar" onPress={createFreelancer} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Freelancer_Form;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  date: {
    margin: 20,
  },
});
