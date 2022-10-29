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
  StyleSheet,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ContextForAuth} from '../../../../Context/Context';
import {Searchbar, RadioButton} from 'react-native-paper';
import ClientData from '../../../../mysql api/client';
import {IconButton} from 'react-native-paper';
import {BerandaStyle, CompStyle} from '../../../../JOBKU RESC/componentStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import Moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input';
import {formatNumber} from 'react-native-currency-input';
import moment from 'moment';

const Search = ({navigation, route}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState();
  const [daftarOpenBidding, setDaftarOpenBidding] = React.useState([]);
  const [cari, setCari] = React.useState(1);
  const [permintaanLamapengerjaan, setPermintaanLamapengerjaan] =
    React.useState(0);
  const [maximal, setMax] = React.useState(0);
  const [minimal, setMin] = React.useState(0);
  const [tanggalTutup, setTanggalTutup] = React.useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    Moment.locale('id');
    //setTanggalLahir(Moment(date).format('DD MMMM yyyy'));
    setTanggalTutup(Moment(date).format('YYYY-MM-DD 23:59:59'));
  };

  const openWhatsapp = item => {
    var tanggalskg = Moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

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

  const resetHal = newValue => {
    setCari(newValue);
    setDaftarOpenBidding([]);
  };

  const submitSearch = async () => {
    console.log(searchQuery);
    await ClientData.post('/searchOB', {
      keywordSkill: '%' + searchQuery + '%',
    }).then(response => {
      console.log(response.data);
      setDaftarOpenBidding(response.data);
    });
  };

  const submitSearchTuptup = async () => {
    var tanggalskg = Moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
    console.log(searchQuery);
    await ClientData.post('/cariTutupOB', {
      tglSkg: tanggalskg,
      tglTutup: tanggalTutup,
    }).then(response => {
      console.log(response.data);
      setDaftarOpenBidding(response.data);
    });
  };

  const submitsearchAnggaran = async () => {
    console.log(searchQuery);
    await ClientData.post('/cariAnggaran', {
      min: minimal,
      max: maximal,
    }).then(response => {
      console.log(response.data);
      setDaftarOpenBidding(response.data);
    });
  };

  const submitSearchLama = async () => {
    console.log(searchQuery);
    await ClientData.post('/carilamaOB', {
      lamapengerjaan: permintaanLamapengerjaan,
    }).then(response => {
      console.log(response.data);
      setDaftarOpenBidding(response.data);
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

  return (
    <ScrollView>
      <Text style={{margin: 5}}>Cari Berdasarkan</Text>
      <RadioButton.Group
        onValueChange={newValue => resetHal(newValue)}
        value={cari}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', flex: 1, textAlign: 'center'}}>
            Skill
          </Text>
          <View style={{flex: 1}}>
            <RadioButton color="blue" style={{alignSelf: 'center'}} value={1} />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', flex: 1, textAlign: 'center'}}>
            Lama Pengerjaan
          </Text>
          <View style={{flex: 1}}>
            <RadioButton color="blue" style={{alignSelf: 'center'}} value={2} />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', flex: 1, textAlign: 'center'}}>
            Tanggal Tutup
          </Text>
          <View style={{flex: 1}}>
            <RadioButton color="blue" style={{alignSelf: 'center'}} value={3} />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', flex: 1, textAlign: 'center'}}>
            Anggaran
          </Text>
          <View style={{flex: 1}}>
            <RadioButton color="blue" style={{alignSelf: 'center'}} value={4} />
          </View>
        </View>
      </RadioButton.Group>
      {cari == 1 ? (
        <View>
          <Searchbar
            style={{margin: 10, borderRadius: 30}}
            placeholder="Ketik Skill"
            value={searchQuery}
            onChangeText={value => {
              setSearchQuery(value);
            }}
            onSubmitEditing={submitSearch}
          />
        </View>
      ) : cari == 2 ? (
        <View>
          <Slider
            style={{margin: 5}}
            value={permintaanLamapengerjaan}
            onValueChange={setPermintaanLamapengerjaan}
            maximumValue={14}
            step={1}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="#000000"
          />
          <TouchableOpacity
            onPress={submitSearchLama}
            style={{
              margin: 5,
              backgroundColor: '#7C83FD',
              padding: 5,
              borderRadius: 10,
            }}>
            <Text style={{textAlign: 'center'}}>
              Cari {permintaanLamapengerjaan} hari
            </Text>
          </TouchableOpacity>
        </View>
      ) : cari == 3 ? (
        <View>
          <View style={styles.date}>
            <View>
              <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                  editable={false}
                  label="Tanggal Lahir"
                  placeholder="Klik untuk pilih tanggal"
                  value={tanggalTutup}
                />
              </TouchableOpacity>
              <Button onPress={submitSearchTuptup} title="cari" />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={CompStyle.anggaranBox}>
            <View style={CompStyle.AnggaranFlex}>
              <Text style={CompStyle.labelAnggaran}>Dari</Text>
              <CurrencyInput
                keyboardType="numeric"
                style={{
                  fontSize: 25,
                  borderWidth: 1,
                  margin: 5,
                  borderRadius: 10,
                }}
                value={minimal}
                onChangeValue={setMin}
                prefix="Rp. "
                delimiter="."
                separator="-"
                precision={0}
                onChangeText={value => {
                  console.log(value); // $2,310.46
                }}
              />
            </View>
            <View style={CompStyle.AnggaranFlex}>
              <Text style={CompStyle.labelAnggaran}>Hingga</Text>
              <CurrencyInput
                keyboardType="numeric"
                style={{
                  fontSize: 25,
                  borderWidth: 1,
                  margin: 5,
                  borderRadius: 10,
                }}
                value={maximal}
                onChangeValue={setMax}
                prefix="Rp. "
                delimiter="."
                separator="-"
                precision={0}
                onChangeText={value => {
                  console.log(value); // $2,310.46
                }}
              />
            </View>
            <View style={{width: 100, margin: 5, alignSelf: 'center'}}>
              <Button onPress={() => submitsearchAnggaran()} title="Cari" />
            </View>
          </View>
        </View>
      )}

      {daftarOpenBidding.length > 0 ? (
        <View>
          {daftarOpenBidding.map((item, index) => {
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
                    {moment(item.tanggal_posting_OB).startOf('day').fromNow()}
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
                    {moment(item.waktu_tenggat_bidding).endOf('day').fromNow()}
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
                    color={'blue'}
                    icon="chat"
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
            Pencarian anda tidak ditemukan, silahkan coba yang lain
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
