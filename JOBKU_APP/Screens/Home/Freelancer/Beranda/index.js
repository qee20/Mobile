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
import moment from 'moment';
import {formatNumber} from 'react-native-currency-input';

const ClientPreview = createStackNavigator();

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Client = ({navigation}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState();
  const [daftarOpenBidding, setDaftarOpenBidding] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await ClientData.get('/openBidding4Home').then(response => {
      console.log('OB beranda', response.data);
      setDaftarOpenBidding(response.data);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const openWhatsapp = item => {
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');

    var msg = `Halo, saya ${passProfileData.nama_freelancer} ingin menanyakan tentang open bidding yang anda buat yaitu ${item.judul_open_bidding}`;
    ClientData.post('/CheckroomIDF', {
      kode_freelancer: passProfileData.kode_freelancer,
      kode_client: item.kode_client,
    }).then(response => {
      console.log('cek room', response.data.msg);
      if (response.data.msg == 'create') {
        ClientData.post('/createChatRoom', {
          kode_freelancer: passProfileData.kode_freelancer,
          kode_client: item.kode_client,
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

  const submitSearch = async () => {
    console.log(searchQuery);
    await ClientData.post('/searchOB', {
      keywordSkill: '%' + searchQuery + '%',
    }).then(response => {
      console.log(response.data);
    });
  };

  const ViewBidding = ({kode_open_bidding, arrays}) => {
    ClientData.post('/checkingBiddingOwner', {
      kode_open_bidding: kode_open_bidding,
      kode_pengguna: state.userId,
    }).then(response => {
      if (response.data.msg == 'allow') {
        navigation.navigate('PreviewBid', {
          dataShow: arrays,
          profilGbre: arrays.fotoProfil,
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
    await ClientData.get('/openBidding4Home').then(response => {
      console.log('OB beranda', response.data);
      setDaftarOpenBidding(response.data);
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
        <View style={{flex: 1, alignSelf: 'center', marginRight: 3}}>
          <Button
            onPress={() => navigation.navigate('Cari OpenBidding')}
            title="Atur Pencarian"
          />
        </View>
      </View>
      <ScrollView
        style={{marginTop: 60}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {daftarOpenBidding.length > 0 ? (
          <View>
            {daftarOpenBidding
              .filter(keyWord => {
                if (searchQuery == '') {
                  return keyWord;
                } else if (
                  keyWord.judul_open_bidding
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
                          navigation.navigate('ToClientProfile', {
                            kodeClient: item.kode_client,
                          })
                        }>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#7C83FD',
                          }}>
                          {item.nama_client}
                        </Text>
                      </TouchableOpacity>
                      <Text>
                        {moment(item.tanggal_posting_OB)
                          .startOf('day')
                          .fromNow()}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        ViewBidding({
                          kode_open_bidding: item.kode_open_bidding,
                          arrays: item,
                        })
                      }
                      style={BerandaStyle.infoPart}>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {item.judul_open_bidding}
                        </Text>
                        <Text numberOfLines={5}>{item.deskripsi}</Text>
                      </View>
                      <Image
                        resizeMode="cover"
                        style={BerandaStyle.Poster}
                        source={{uri: item.gambar}}
                      />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        style={{marginRight: 5}}
                        size={30}
                        name="hourglass-start"
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 15,
                          alignSelf: 'center',
                        }}>
                        Akan berakhir{' '}
                        {moment(item.waktu_tenggat_bidding)
                          .endOf('day')
                          .fromNow()}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        style={{marginTop: 5, marginRight: 5}}
                        size={25}
                        name="hand-holding-usd"
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          marginLeft: 5,
                          fontSize: 15,
                          alignSelf: 'center',
                        }}>
                        {formatNumber(item.minimal, {
                          separator: ',',
                          prefix: 'Rp ',
                          precision: 2,
                          delimiter: '.',
                          signPosition: 'beforePrefix',
                        })}{' '}
                        -{' '}
                        {formatNumber(item.maksimal, {
                          separator: ',',
                          prefix: 'Rp ',
                          precision: 2,
                          delimiter: '.',
                          signPosition: 'beforePrefix',
                        })}
                      </Text>
                    </View>
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
