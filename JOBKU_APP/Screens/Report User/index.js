import React from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ContextForAuth} from '../../Context/Context';
import {Searchbar} from 'react-native-paper';
import ClientData from '../../mysql api/client';
import {IconButton} from 'react-native-paper';
import {BerandaStyle} from '../../JOBKU RESC/componentStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import moment from 'moment';
import {TextInput} from 'react-native-paper';

const Report = ({navigation, route}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const {kodeclient} = route.params;

  const [laporan, setLaporan] = React.useState('');

  const kirimLaporan = () => {
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');
    ClientData.post('/createReport', {
      kode_client: kodeclient,
      kode_freelancer: passProfileData.kode_freelancer,
      tangggal_laporan: tanggalskg,
      isi_laporan: laporan,
    }).then(response => {
      console.log('lorom', response.data);
      Alert.alert('Pelaporan', 'Laporan Anda berhasil dikirim, Terimakasih', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MGMT'),
        },
      ]);
    });
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        style={{margin: 5}}
        label="Masukkan isi Laporan anda"
        value={laporan}
        onChangeText={value => {
          setLaporan(value);
        }}
      />
      <Button title="Kirim" onPress={kirimLaporan} />
    </View>
  );
};

export default Report;
