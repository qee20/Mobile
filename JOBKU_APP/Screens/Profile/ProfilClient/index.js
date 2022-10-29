import React from 'react';
import {View, Text, Image} from 'react-native';
import {ContextForAuth} from '../../../Context/Context';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../../../JOBKU RESC/componentStyles';
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
} from '../../../Screens';
import Client from '../../../mysql api/client';
import {formatNumber} from 'react-native-currency-input';
import {useNavigation} from '@react-navigation/native';

const ClientProfile = () => {
  const {
    state,
    logOut,
    variabels,
    passProfileData,
    getpassProfileData,
    switchTo,
  } = React.useContext(ContextForAuth);

  const navigation = useNavigation();

  const [initRating, setInitRating] = React.useState(2);
  const [maxRate, setMaxRate] = React.useState([1, 2, 3, 4, 5]);
  const [dataprofile, setDataProfil] = React.useState([]);
  const [saldo, setSaldo] = React.useState(0);

  const RatingFreelancer = () => {
    return (
      <View style={Profile.starWrap}>
        {maxRate.map((item, key) => {
          return (
            <View style={Profile.star} key={item}>
              <Ionicons name="star" size={20} color="green" />
            </View>
          );
        })}
      </View>
    );
  };

  React.useEffect(() => {
    navigation.addListener('focus', async () => {
      Client.post('/retrieveClientInfo', {
        kode_pengguna: state.userId,
      })
        .then(response => {
          const thisData = response.data.clientData;
          setDataProfil(thisData);
        })
        .catch(error => console.log(error));
    });
  }, []);

  return (
    <View>
      <View style={Profile.wrapUp}>
        <Image
          source={{uri: dataprofile.fotoProfil}}
          style={Profile.imageProfile}
        />
        <View>
          <Text style={Profile.nameDisplay}>{dataprofile.nama_client}</Text>
          <RatingFreelancer />
          <TouchableOpacity>
            <Text style={{fontSize: 15, margin: 2.5}}>
              Lihat Ulasan{' '}
              <Ionicons name="chevron-forward" size={20} color="blue" />{' '}
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 15, margin: 2.5}}>
            <Ionicons name="shield-checkmark" size={20} color="blue" /> Sudah
            Diverifikasi{' '}
          </Text>
        </View>
      </View>
      <View>
        <View style={Profile.Menus}>
          <Button
            onPress={() =>
              navigation.navigate('PreferensiAkun', {
                urlImage: dataprofile.fotoProfil,
              })
            }>
            <Text>Preferensi Akun</Text>
          </Button>
          <Button onPress={() => navigation.navigate('BantuanFAQ')}>
            <Text>Bantuan dan FAQ</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Pengaturan')}>
            <Text>Pengaturan</Text>
          </Button>
          <Button
            onPress={() =>
              navigation.navigate('Gamifikasi', {dataPr: dataprofile})
            }>
            <Text>Feedback</Text>
          </Button>
          <Button onPress={() => navigation.navigate('TentangJOBKU')}>
            <Text>Tentang JOBKU</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ClientProfile;
