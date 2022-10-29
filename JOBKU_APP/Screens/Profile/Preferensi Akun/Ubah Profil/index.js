import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {ContextForAuth} from '../../../../Context/Context';
import Client from '../../../../mysql api/client';
import {Button, TextInput} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import 'moment/locale/id';

const UbahProfil = ({route, navigation}) => {
  const {urlImage} = route.params;
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [namaLengkap, setNamaLengkap] = React.useState('');
  const [alamat, setAlamat] = React.useState('');
  const [tempatLahir, setTempatLahir] = React.useState('');
  const [tanggalLahir, setTangallahir] = React.useState('');
  const [nomorHP, setNoHP] = React.useState('');
  const [nomorRek, setNorek] = React.useState('');
  const [namaBank, setNamaBank] = React.useState('');
  const [img, setImg] = React.useState(null);
  const [dataprofile, setDataProfil] = React.useState([]);
  const [datex, setDatex] = React.useState('');

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
    setTangallahir(Moment(date).format('DD MMMM yyyy'));
    setDatex(Moment(date).format('YYYY-MM-DD'));
  };

  const updateProfile = () => {
    if (state.userChoice == 'Freelancer') {
      Client.put(`/updateProfile/Freelancer/${dataprofile.kode_freelancer}`, {
        namaFreelancer: namaLengkap,
        alamat: alamat,
        tempatLahir: tempatLahir,
        tanggalLahir: datex,
        nomorHP: nomorHP,
        nomorRekening: nomorRek,
        namaBank: namaBank,
        fotoProfil: urlImage,
        kode_freelancer: dataprofile.kode_freelancer,
      }).then(response => {
        console.log(response);
        getDataProfile();
        Alert.alert('Ubah Profil', 'Profil anda berhasil biubah', [
          {text: 'OK', onPress: () => navigation.navigate('Profile')},
        ]);
      });
    } else {
      Client.put(`/updateProfile/Client/${dataprofile.kode_client}`, {
        nama_client: namaLengkap,
        alamat: alamat,
        tempatLahir: tempatLahir,
        tanggalLahir: datex,
        nomorHP: nomorHP,
        nomorRekening: nomorRek,
        namaBank: namaBank,
        fotoProfil: urlImage,
        kode_client: dataprofile.kode_client,
      }).then(response => {
        console.log(response);
        getDataProfile();
        Alert.alert('Ubah Profil', 'Profil anda berhasil biubah', [
          {text: 'OK', onPress: () => navigation.navigate('Profile')},
        ]);
      });
    }
  };

  React.useEffect(async () => {
    if (state.userChoice == 'Freelancer') {
      await Client.post('/getFreelancerdata', {
        kode_pengguna: state.userId,
      })
        .then(response => {
          getDataProfile();
          const thisData = response.data.freelancerData;
          setDataProfil(thisData);
          console.log(response.data.freelancerData);
          setNamaLengkap(response.data.freelancerData.nama_freelancer);
          setAlamat(response.data.freelancerData.alamat);
          setTempatLahir(response.data.freelancerData.tempatLahir);
          setTangallahir(response.data.freelancerData.tanggalLahir);
          setNoHP(response.data.freelancerData.nomorHP);
          setNorek(response.data.freelancerData.nomorRekening);
          setNamaBank(response.data.freelancerData.namaBank);
          setImg(response.data.freelancerData.fotoProfil);
        })
        .catch(error => console.log(error));
    } else {
      await Client.post('/getClientdata', {
        kode_pengguna: state.userId,
      })
        .then(response => {
          getDataProfile();
          const thisData = response.data.clientData;
          setDataProfil(thisData);
          console.log(response.data.clientData);
          setNamaLengkap(response.data.clientData.nama_client);
          setAlamat(response.data.clientData.alamat);
          setTempatLahir(response.data.clientData.tempatLahir);
          setTangallahir(response.data.clientData.tanggalLahir);
          setNoHP(response.data.clientData.nomorHP);
          setNorek(response.data.clientData.nomorRekening);
          setNamaBank(response.data.clientData.namaBank);
          setImg(response.data.clientData.fotoProfil);
        })
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <ScrollView style={{margin: 5}}>
      {urlImage ? (
        <Image
          resizeMode="center"
          source={{uri: urlImage}}
          style={{width: 200, height: 200, alignSelf: 'center', margin: 3}}
        />
      ) : (
        <Image
          resizeMode="center"
          source={{uri: urlImage}}
          style={{width: 200, height: 200, alignSelf: 'center', margin: 3}}
        />
      )}
      <Button
        onPress={() =>
          navigation.navigate('PilihFoto', {
            screenSource: 'UbahProfil',
            userID: passProfileData.kode_pengguna,
          })
        }>
        Ubah Foto
      </Button>
      <TextInput
        value={namaLengkap}
        onChangeText={value => setNamaLengkap(value)}
        label="Nama Lengkap"
        mode="outlined"
      />
      <TextInput
        value={alamat}
        onChangeText={value => setAlamat(value)}
        label="Alamat"
        mode="outlined"
      />
      <TextInput
        value={tempatLahir}
        onChangeText={value => setTempatLahir(value)}
        label="Tempat Lahir"
        mode="outlined"
      />
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          value={Moment(tanggalLahir).format('DD MMMM yyyy')}
          label="Tanggal Lahir"
          mode="outlined"
          editable={false}
        />
      </TouchableOpacity>
      <View>
        <Button title="Buka Kalender" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <TextInput
        value={nomorHP}
        onChangeText={value => setNoHP(value)}
        label="Nomor Handpone"
        mode="outlined"
      />
      <TextInput
        value={nomorRek}
        onChangeText={value => setNorek(value)}
        label="Nomor Rekening"
        mode="outlined"
      />
      <TextInput
        value={namaBank}
        onChangeText={value => setNamaBank(value)}
        label="Nama Bank"
        mode="outlined"
      />
      <Button onPress={updateProfile} mode="contained" style={{margin: 5}}>
        Ubah
      </Button>
    </ScrollView>
  );
};

export default UbahProfil;
