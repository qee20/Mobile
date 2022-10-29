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
import {CompStyle} from '../../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../Context/Context';

const UpdateDaftar = ({route, navigation}) => {
  const {urlImage, id} = route.params;
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

  const [judulProyek, setJudulProyek] = React.useState('');
  const [deskripsiProyek, setDeskripsiProyek] = React.useState('');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [valuenow, setValueNow] = React.useState('Pilih Kategori');
  const [valuenowsk, setValueNowSK] = React.useState('Pilih Sub Kategori');
  const [daftarPaketJasa1, setDaftarPaketJasa1] = React.useState([]);
  const [daftarPaketJasa2, setDaftarPaketJasa2] = React.useState([]);
  const [daftarPaketJasa3, setDaftarPaketJasa3] = React.useState([]);
  const [hargaP1, sethargaP1] = React.useState('');
  const [hargaP2, sethargaP2] = React.useState('');
  const [hargaP3, sethargaP3] = React.useState('');
  const [ket1, setket1] = React.useState('');
  const [ket2, setket2] = React.useState('');
  const [ket3, setket3] = React.useState('');

  const updatePenawaranJasa = async () => {
    await Client.put(`/updateDaftarJasa/${id}`, {
      id: daftarPaketJasa1.kode_penawaran_jasa,
      judul_proyek: judulProyek,
      deskripsi_proyek: deskripsiProyek,
      urlGambar: urlImage,
      terimaDP: toggleCheckBox,
    })
      .then(response => {
        let kode_penawaran_jasa;
        kode_penawaran_jasa = id;
        Client.delete(`/deletePaketPenawaranJasa/${kode_penawaran_jasa}`)
          .then(response => {
            Client.post('/dataPaketJasa', {
              kode_penawaran_jasa: daftarPaketJasa1.kode_penawaran_jasa,
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
                console.log(response);
                navigation.navigate('Daftar Anda');
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/paketPenawaranJasaFreelancer', {
        kode_penawaran_jasa: id,
      }).then(response => {
        console.log(response.data.result);
        setDaftarPaketJasa1(response.data.result[0]);
        setDaftarPaketJasa2(response.data.result[1]);
        setDaftarPaketJasa3(response.data.result[2]);
        setToggleCheckBox();
      });
      console.log('Data', id);
    });
  }, []);

  return (
    <View>
      <Text>Ubah Client</Text>
    </View>
  );
};

export default UpdateDaftar;
