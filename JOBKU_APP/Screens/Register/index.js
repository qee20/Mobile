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

// const isValidEmail = value => {
//   const regx =
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return regx.test(value);
// };

const Register = ({route, navigation}) => {
  const [usernameReg, setUsernameReg] = React.useState('');
  // const [passwordReg, setpasswordReg] = React.useState('');
  // const [emailReg, setemailReg] = React.useState('');
  const {email, UID, fbdata} = route.params;
  var [jeniskelamin, setJenisKelamin] = React.useState('');

  const [userInfo, setUserInfo] = React.useState({
    username: '',
  });

  const [error, setError] = React.useState('');

  const {username} = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({...userInfo, [fieldName]: value});
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('mohon isi semuanya !', setError);
    if (!username.trim() || username.length < 4)
      return updateError('username tidak valid!', setError);
    if ((jeniskelamin = 0))
      return updateError('Mohon Pilih Jenis Kelamin', setError);
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
          registering(username, email, jeniskelamin, UID);
        }
      })
      .catch(error => console.log(error));
  };

  const {registering} = React.useContext(ContextForAuth);

  React.useEffect(() => {
    // console.log(fbdata._user.displayName);
    // // setUsernameReg(fbdata._user.displayName);
    // handleOnChangeText(fbdata._user.displayName, 'username');
  }, []);

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
          placeholder="cth : budi20"
          value={username}
          onChangeText={value => handleOnChangeText(value, 'username')}
        />
        <Text style={{margin: 10}}>Pilih jenis kelamin :</Text>
        <View style={{borderWidth: 1, margin: 5, borderRadius: 10, padding: 5}}>
          <RadioButton.Group
            onValueChange={value => setJenisKelamin(value)}
            value={jeniskelamin}>
            <RadioButton.Item
              color="blue"
              mode="ios"
              label="Laki-Laki"
              value={'Laki-Laki'}
            />
            <RadioButton.Item
              color="blue"
              mode="ios"
              label="Perempuan"
              value={'Perempuan'}
            />
          </RadioButton.Group>
        </View>
        <FormSubmitButton onPress={submitForm} title="Lanjutkan" />
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
