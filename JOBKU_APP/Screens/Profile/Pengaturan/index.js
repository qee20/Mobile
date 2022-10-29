import React from 'react';
import {View, Text} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import Client from '../../../mysql api/client';

const Pengaturan = ({navigation, route}) => {
  const [jeniskelamin, setJenisKelamin] = React.useState(0);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Button onPress={() => navigation.navigate('InfoLogin')}>
        Ubah Info Login
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('PilihFoto', {screenSource: 'Pengaturan'})
        }>
        Manajemen File Gambar
      </Button>
    </View>
  );
};

export default Pengaturan;
