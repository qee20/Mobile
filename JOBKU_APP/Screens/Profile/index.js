import React from 'react';
import {View, Text, Image} from 'react-native';
import {ContextForAuth} from '../../Context/Context';
import {createStackNavigator} from '@react-navigation/stack';
import {StylingHeader} from '../../JOBKU RESC/componentStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {
  Penarikan,
  Histori,
  LihatSlipGaji,
  Preferensi,
  UbahProfil,
  LogAktivitas,
  BantuanFaq,
  Pengaturan,
  Gamifikasi,
  TentangJOBKU,
  UserImageServer,
  ProfilCLient,
  ProfilFreelancer,
  LoginInfo,
} from '../../Screens';
import Client from '../../mysql api/client';
import {formatNumber} from 'react-native-currency-input';

function LogoTitle() {
  return (
    <Image
      resizeMode="center"
      style={{width: 60, height: 60}}
      source={require('../../../assets/JOBKU-LOGO.png')}
    />
  );
}

const Profil = ({navigation, route}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  if (state.userChoice == 'Freelancer') {
    return <ProfilFreelancer />;
  } else {
    return <ProfilCLient />;
  }
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5352F7',
      },
      headerTintColor: '#fff',
    }}>
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Profil Anda</Text>
          </View>
        ),
      }}
      name="Profile"
      component={Profil}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>History</Text>
          </View>
        ),
      }}
      name="Histori"
      component={Histori}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Penarikan</Text>
          </View>
        ),
      }}
      name="Penarikan"
      component={Penarikan}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Opsi Akun</Text>
          </View>
        ),
      }}
      name="PreferensiAkun"
      component={Preferensi}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Ubah Profil</Text>
          </View>
        ),
      }}
      name="UbahProfil"
      component={UbahProfil}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Log Aktivitas</Text>
          </View>
        ),
      }}
      name="LogAktivitas"
      component={LogAktivitas}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Slip Gaji</Text>
          </View>
        ),
      }}
      name="LihatSlipgaji"
      component={LihatSlipGaji}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>FAQ dan Bantuan</Text>
          </View>
        ),
      }}
      name="BantuanFAQ"
      component={BantuanFaq}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pengaturan Info Login</Text>
          </View>
        ),
      }}
      name="Pengaturan"
      component={Pengaturan}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Feedback Pengguna</Text>
          </View>
        ),
      }}
      name="Gamifikasi"
      component={Gamifikasi}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Tentang Aplikasi</Text>
          </View>
        ),
      }}
      name="TentangJOBKU"
      component={TentangJOBKU}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pilih Gambar</Text>
          </View>
        ),
      }}
      name="PilihFoto"
      component={UserImageServer}
    />
    <ProfileStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Ubah Info Login</Text>
          </View>
        ),
      }}
      name="InfoLogin"
      component={LoginInfo}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
