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
import {CompStyle} from '../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';

const Preview = ({navigation, route}) => {
  const {dataShow, profilGbre} = route.params;

  const [daftarPaketJasa1, setDaftarPaketJasa1] = React.useState([]);
  const [daftarPaketJasa2, setDaftarPaketJasa2] = React.useState([]);
  const [daftarPaketJasa3, setDaftarPaketJasa3] = React.useState([]);

  React.useEffect(async () => {
    navigation.addListener('focus', async () => {
      await Client.post('/paketPenawaranJasaFreelancer', {
        kode_penawaran_jasa: dataShow.kode_penawaran_jasa,
      }).then(response => {
        setDaftarPaketJasa1(response.data.result[0]);
        setDaftarPaketJasa2(response.data.result[1]);
        setDaftarPaketJasa3(response.data.result[2]);
      });
    });
  }, []);
  return (
    <ScrollView>
      <View>
        <Text>{dataShow.judul_proyek}</Text>
        <Text>{dataShow.nama_freelancer}</Text>
      </View>
      <View>
        <Image
          source={{uri: dataShow.fotoProfil}}
          style={{width: 80, height: 80}}
        />
      </View>
      <View>
        <Image
          source={{uri: dataShow.url_gambar}}
          style={{width: 80, height: 80}}
          resizeMode="contain"
        />
        <Text>{dataShow.deskripsi_proyek}</Text>
      </View>
      <View>
        <Button title="Sewa" />
        <Button title="Hubungi" />
      </View>
      <View>
        <View>
          <Text>{daftarPaketJasa1.nama_jenis_paket}</Text>
          <Text>{daftarPaketJasa1.harga}</Text>
          <Text>{daftarPaketJasa1.keterangan}</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>{daftarPaketJasa2.nama_jenis_paket}</Text>
          <Text>{daftarPaketJasa2.harga}</Text>
          <Text>{daftarPaketJasa2.keterangan}</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>{daftarPaketJasa3.nama_jenis_paket}</Text>
          <Text>{daftarPaketJasa3.harga}</Text>
          <Text>{daftarPaketJasa3.keterangan}</Text>
        </View>
      </View>
      <View>
        <Text>Map Ulasan Client</Text>
        <Button title="Lihat Semua Ulasan" />
      </View>
    </ScrollView>
  );
};

export default Preview;
