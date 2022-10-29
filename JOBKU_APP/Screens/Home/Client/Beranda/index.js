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
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ContextForAuth} from '../../../../Context/Context';
import {Searchbar} from 'react-native-paper';
import ClientData from '../../../../mysql api/client';
import {IconButton} from 'react-native-paper';
import {BerandaStyle} from '../../../../JOBKU RESC/componentStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import moment from 'moment';

const ClientPreview = createStackNavigator();
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Client = ({navigation}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState();
  const [daftarPenawaranJasa, setDaftarPenawaranJasa] = React.useState([]);
  const [daftarOpenBidding, setDaftarOpenBidding] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await ClientData.get('/penawaranJasa4Home').then(response => {
      console.log(response.data);
      setDaftarPenawaranJasa(response.data);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const hideDialog = () => setVisible(false);

  const onChangeSearch = query => setSearchQuery(query);

  const openWhatsapp = item => {
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');

    var msg = `Halo, saya ${passProfileData.nama_freelancer} ingin menanyakan tentang open bidding yang anda buat yaitu ${item.judul_open_bidding}`;
    ClientData.post('/CheckroomIDC', {
      kode_client: passProfileData.kode_client,
      kode_freelancer: item.kode_freelancer,
    }).then(response => {
      console.log('cek room', response.data.msg);
      if (response.data.msg == 'create') {
        ClientData.post('/createChatRoom', {
          kode_client: passProfileData.kode_client,
          kode_freelancer: item.kode_freelancer,
          waktu_menghubungi: tanggalskg,
        }).then(response => {
          console.log('buat room', response.data);
          let url = 'whatsapp://send?text=' + msg + '&phone=62' + item.nomorHP;
          Linking.openURL(url)
            .then(data => {
              console.log('WhatsApp Opened');
            })
            .catch(() => {
              alert('Make sure Whatsapp installed on your device');
            });
        });
      } else {
        let url = 'whatsapp://send?text=' + msg + '&phone=62' + item.nomorHP;
        Linking.openURL(url)
          .then(data => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure Whatsapp installed on your device');
          });
      }
    });
  };

  const previewJasa = ({kode_penawaran_jasa, arrays}) => {
    ClientData.post('/checkingOwner', {
      kode_penawaran_jasa: kode_penawaran_jasa,
      kode_pengguna: state.userId,
    }).then(response => {
      if (response.data.msg == 'allow') {
        navigation.navigate('PreviewPJF', {
          dataShow: arrays,
        });
      } else {
        Alert.alert('Info', response.data.msg, [
          {
            text: 'OK',
          },
        ]);
      }
    });
  };

  React.useEffect(async () => {
    getDataProfile();
    await ClientData.get('/penawaranJasa4Home').then(response => {
      console.log(response.data);
      setDaftarPenawaranJasa(response.data);
    });
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
        }}>
        <Searchbar
          style={{margin: 10, borderRadius: 30, flex: 3}}
          placeholder="Ketik Pencarian Judul"
          value={searchQuery}
          onChangeText={value => {
            setSearchQuery(value);
          }}
        />
      </View>
      <ScrollView
        style={{marginTop: 60}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {daftarPenawaranJasa.length > 0 ? (
          <View>
            {daftarPenawaranJasa
              .filter(keyWord => {
                if (searchQuery == '') {
                  return keyWord;
                } else if (
                  keyWord.judul_proyek
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return keyWord;
                }
              })
              .map((item, index) => {
                return (
                  <View key={index} style={BerandaStyle.containerItem}>
                    <View style={BerandaStyle.headerCon}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ToFreelancerProfile', {
                            kodeFreelancer: item.kode_freelancer,
                          })
                        }>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#7C83FD',
                          }}>
                          {item.nama_freelancer}
                        </Text>
                      </TouchableOpacity>
                      <Text>
                        {moment(item.tanggal).startOf('day').fromNow()}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        previewJasa({
                          kode_penawaran_jasa: item.kode_penawaran_jasa,
                          arrays: item,
                        })
                      }
                      style={BerandaStyle.infoPart}>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {item.judul_proyek}
                        </Text>
                        <Text numberOfLines={5}>{item.deskripsi_proyek}</Text>
                      </View>
                      <Image
                        resizeMode="cover"
                        style={BerandaStyle.Poster}
                        source={{uri: item.url_gambar}}
                      />
                    </TouchableOpacity>
                    <View style={BerandaStyle.footerCon}>
                      <Text style={BerandaStyle.tagKetagori}>
                        {item.nama_sub_kategori}
                      </Text>
                      <IconButton
                        color={'#075E54'}
                        icon="whatsapp"
                        size={25}
                        onPress={() => openWhatsapp(item)}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={{alignSelf: 'center', flex: 3, marginTop: 100}}>
              Belum Ada Penawaran, coba refresh
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const ClientPStackScreen = () => (
  <ClientPreview.Navigator>
    <ClientPreview.Screen
      options={{headerShown: false}}
      name="BerandaClient"
      component={Client}
    />
  </ClientPreview.Navigator>
);

export default ClientPStackScreen;
