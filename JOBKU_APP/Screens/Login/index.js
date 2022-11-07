import React from 'react';
import {View, Text, Alert, StyleSheet, SafeAreaView, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Axios from 'axios';
import {ContextForAuth} from '../../Context/Context';
import {SocialIcon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Icon} from 'react-native-elements';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {logIn} = React.useContext(ContextForAuth);

  const loginEmail = async () => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          logIn({UID: response.user.uid});
        });
    } catch (error) {
      Alert.alert('Login', error.message, [{text: 'Ok'}]);
    }
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
        <Image
          style={{
            alignSelf: 'center',
            width: 200,
            height: 100,
            marginBottom: 50,
          }}
          source={require('../../../assets/JOBKU-LOGOBig.png')}
        />
        <TextInput
          mode="outlined"
          label="email"
          style={{margin: 10}}
          value={email}
          onChangeText={value => {
            setEmail(value);
          }}
        />
        <TextInput
          label="password"
          mode="outlined"
          style={{margin: 10}}
          secureTextEntry
          value={password}
          onChangeText={value => {
            setPassword(value);
          }}
        />
        <SocialIcon
          title="Login"
          button
          onPress={() => loginEmail()}
          style={{backgroundColor: '#00A3FF'}}
        />
        <Text style={{margin: 10, textAlign: 'center', fontWeight: 'bold'}}>
          Atau
        </Text>
        <SocialIcon
          title="Login dengan Facebook"
          button
          type="facebook"
          onPress={() =>
            onFacebookButtonPress().then(response => {
              console.log(response);
              console.log('Signed in with Facebook!');
              logIn({UID: response.user.uid});
            })
          }
        />
        <Text style={{textAlign: 'center', fontSize: 15, marginTop: 10}}>
          Pengguna baru? , silahkan klik tombol daftar
        </Text>
        <Button
          color="#00A3FF"
          mode="contained"
          style={{margin: 10}}
          onPress={() => navigation.navigate('CreateAccount')}>
          Daftar
        </Button>
      </View>
    </SafeAreaView>
  );
};
//()=>navigation.push('Choose', {freelancerId : freelancerId, ClientId : ClientId})
export default Login;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
