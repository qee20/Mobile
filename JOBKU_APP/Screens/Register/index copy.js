import React from 'react';
import {View, Button, Alert, ScrollView, Text, StyleSheet} from 'react-native';
import Axios from 'axios';
import {ContextForAuth} from '../../Context/Context';
import FormInput from '../../Form_Auth/FormInput';
import FormSubmitButton from '../../Form_Auth/FormSubmitButton';
import Client from '../../mysql api/client';
import {TextInput, RadioButton} from 'react-native-paper';

const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};

const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 2500);
};

const isValidEmail = value => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(value);
};

const Register = ({navigation}) => {
  // const [usernameReg, setUsernameReg] = React.useState('');
  // const [passwordReg, setpasswordReg] = React.useState('');
  // const [emailReg, setemailReg] = React.useState('');
  const [jeniskelamin, setJenisKelamin] = React.useState(0);

  const [userInfo, setUserInfo] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = React.useState('');

  const {username, email, password, confirmPassword} = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({...userInfo, [fieldName]: value});
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('mohon isi semuanya !', setError);
    if (!username.trim() || username.length < 4)
      return updateError('username tidak valid!', setError);
    if (!isValidEmail(email))
      return updateError('email tidak valid!', setError);
    if (!password.trim() || password.length < 8)
      return updateError(
        'password tidak boleh kurang dari 8 karakter!',
        setError,
      );
    if (password !== confirmPassword)
      return updateError('password tidak cocok!', setError);
    else {
      return true;
    }
  };

  const submitForm = () => {
    if (isValidForm()) {
      checkUserName();
    }
  };

  const checkUserName = () => {
    Client.post('/regCheckAnom', {
      username: username,
    })
      .then(response => {
        if (response.data.username === username) {
          Alert.alert(
            'Info',
            'username "' +
              response.data.username +
              '" sudah digunakan, mohon gunakan username yang lain',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        } else if (response.data.username === 'belum ada') {
          registering(username, password, email, jeniskelamin);
        }
      })
      .catch(error => console.log(error));
  };

  const {registering} = React.useContext(ContextForAuth);

  return (
    <ScrollView>
      <View>
        {error ? (
          <Text style={{color: 'red', fontSize: 18, textAlign: 'center'}}>
            {error}
          </Text>
        ) : null}
        <FormInput
          autoCapitalize="none"
          label="username"
          placeholder="cth : budi20"
          value={username}
          onChangeText={value => handleOnChangeText(value, 'username')}
        />
        <FormInput
          label="email"
          placeholder="cth : budi@host.com"
          value={email}
          onChangeText={value => handleOnChangeText(value, 'email')}
        />
        <FormInput
          secureTextEntry
          label="password"
          placeholder="********"
          value={password}
          onChangeText={value => handleOnChangeText(value, 'password')}
        />
        <FormInput
          secureTextEntry
          label="konfirmasi password"
          placeholder="********"
          value={confirmPassword}
          onChangeText={value => handleOnChangeText(value, 'confirmPassword')}
        />

        <RadioButton.Group
          onValueChange={value => setJenisKelamin(value)}
          value={jeniskelamin}>
          <RadioButton.Item
            color="blue"
            mode="ios"
            label="Laki-Laki"
            value={1}
          />
          <RadioButton.Item
            color="blue"
            mode="ios"
            label="Perempuan"
            value={2}
          />
        </RadioButton.Group>
        <Text>{jeniskelamin}</Text>
        <FormSubmitButton onPress={submitForm} title="Daftar" />
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
