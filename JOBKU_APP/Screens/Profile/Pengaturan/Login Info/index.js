import React from 'react';
import {View, Text} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';

const LoginInfo = () => {
  const [jeniskelamin, setJenisKelamin] = React.useState(0);
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 30, marginBottom: 20}}>
        Ubah Info Login
      </Text>
      <TextInput style={{margin: 10}} mode="outlined" label="username" />
      <TextInput style={{margin: 10}} mode="outlined" label="password" />
      <TextInput style={{margin: 10}} mode="outlined" label="email" />
      <Text style={{margin: 10, fontSize: 20}}>Jenis Kelamin</Text>
      <RadioButton.Group
        onValueChange={value => setJenisKelamin(value)}
        value={jeniskelamin}>
        <RadioButton.Item color="blue" mode="ios" label="Laki-Laki" value={0} />
        <RadioButton.Item color="blue" mode="ios" label="Perempuan" value={1} />
      </RadioButton.Group>
    </View>
  );
};

export default LoginInfo;
