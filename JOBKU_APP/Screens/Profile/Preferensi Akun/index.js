import React from 'react';
import {Button} from 'react-native-paper';
import {View, Text, Image} from 'react-native';
import {ContextForAuth} from '../../../Context/Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const PreferensiAkun = ({navigation, route}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);
  const {urlImage, dataPr} = route.params;

  React.useEffect(() => {
    getDataProfile();
    console.log('data prof preferensi', dataPr);
  }, []);

  const LogOut = () => {
    logOut();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('UbahProfil', {
            urlImage,
          })
        }>
        Edit Profil
      </Button>
      {state.userChoice == 'Freelancer' ? (
        <Button
          mode="outlined"
          onPress={() => {
            switchTo();
          }}>
          Beralih Ke Client
        </Button>
      ) : (
        <Button
          mode="outlined"
          onPress={() => {
            switchTo();
          }}>
          Beralih Ke Freelancer
        </Button>
      )}
      <Button
        mode="outlined"
        style={{marginTop: 10}}
        onPress={() => {
          LogOut();
        }}>
        Keluarkan Akun
      </Button>
    </View>
  );
};

export default PreferensiAkun;
