import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ContextForAuth} from '../../../Context/Context';
import Client from '../../../mysql api/client';
import FormInput from '../../../Form_Auth/FormInput';
import FormSubmitButton from '../../../Form_Auth/FormSubmitButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import 'moment/locale/id';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button} from 'react-native-paper';

const index = ({navigation, route}) => {
  const {sendInfo, state} = React.useContext(ContextForAuth);
  const {kodeclient} = route.params;

  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [websitePerusahaan, setWebsitePerusahaan] = useState('');
  const [jenisPerusahaan, setJenisPerusahaan] = useState(1);

  const SaveCompanyInfo = () => {
    Client.post('/client/companyProfile', {
      kode_client: kodeclient,
      nama_perusahaan: namaPerusahaan,
      nomor_telp_perusahaan: nomorTelepon,
      website_perusahaan: websitePerusahaan,
      jenis_perusahaan: jenisPerusahaan,
    }).then(response => {
      console.log(response.data);
      let usrc;
      usrc = 'Client';
      sendInfo(usrc);
    });
  };

  const Skip = () => {
    Client.post('/client/companyProfile', {
      kode_client: kodeclient,
      nama_perusahaan: '-',
      nomor_telp_perusahaan: '-',
      website_perusahaan: '-',
      jenis_perusahaan: '-',
    }).then(response => {
      console.log(response.data);
      let usrc;
      usrc = 'Client';
      sendInfo(usrc);
    });
  };

  return (
    <ScrollView>
      <Text style={{textAlign: 'center', margin: 10, fontSize: 20}}>
        Apakah Anda Memiliki Perusahaan ? Silahkan Tambahkan Info Perusahaan
        Anda
      </Text>
      <View style={{margin: 5, padding: 5, borderWidth: 1, borderRadius: 10}}>
        <Text style={{marginLeft: 5, fontSize: 16}}>Jenis Perusahaan</Text>
        <Picker
          mode="dropdown"
          style={{margin: 5}}
          selectedValue={jenisPerusahaan}
          onValueChange={(itemValue, itemIndex) =>
            setJenisPerusahaan(itemValue)
          }>
          <Picker.Item label="Perseorangan" value={1} />
          <Picker.Item label="CV (Persekutuan Komanditer)" value={2} />
          <Picker.Item label="PT (Perseroan Terbatas)" value={3} />
          <Picker.Item label="Koperasi" value={4} />
          <Picker.Item label="Firma" value={5} />
          <Picker.Item label="Persero" value={6} />
        </Picker>
      </View>
      <TextInput
        style={{margin: 5}}
        value={namaPerusahaan}
        onChangeText={value => setNamaPerusahaan(value)}
        mode="outlined"
        label="Nama Perusahaan"
      />
      <TextInput
        keyboardType="phone-pad"
        style={{margin: 5}}
        value={nomorTelepon}
        onChangeText={value => setNomorTelepon(value)}
        mode="outlined"
        label="Nomor Telepon Perusahaan"
      />
      <TextInput
        keyboardType="url"
        style={{margin: 5}}
        value={websitePerusahaan}
        onChangeText={value => setWebsitePerusahaan(value)}
        mode="outlined"
        label="Website Perusahaan"
      />
      <Button style={{margin: 20}} mode="contained" onPress={SaveCompanyInfo}>
        Simpan
      </Button>
      <Button style={{marginTop: 20}} onPress={Skip}>
        Nanti Saja
      </Button>
    </ScrollView>
  );
};

export default index;
