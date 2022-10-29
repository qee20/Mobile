import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CompStyle} from '../../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../Context/Context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import 'moment/locale/id';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import {Chip} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';

const TambahDaftar = ({route, navigation}) => {
  const {urlImage} = route.params;
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
  const [IntervalM, setIntervalM] = React.useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  var OpsiInterval = [
    {name: '3 kali sehari', indexnya: 1},
    {name: '10 kali dalam 3 hari', indexnya: 2},
    {name: '10 kali dalam seminggu', indexnya: 3},
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    Moment.locale('id');
    setTanggalExp(Moment(date).format(' hh:mm, DD MMMM yyyy'));
    setDatex(Moment(date).format('YYYY-MM-DD hh:mm:ss'));
  };

  const [judulOB, setJudulOB] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [valuenow, setValueNow] = React.useState('Pilih Kategori');
  const [valuenowsk, setValueNowSK] = React.useState('Pilih Sub Kategori');
  const [kategori, setKategori] = React.useState([]);
  const [subKategori, setSubKategori] = React.useState([]);
  const [tanggalExp, setTanggalExp] = React.useState('');
  const [datex, setDatex] = React.useState('');
  const [lamaPengerjaan, setLamaPengerjaan] = React.useState(0);
  var [skills, setSKills] = React.useState([]);
  var [query, setQuery] = React.useState('');
  const [maximal, setMax] = React.useState('');
  const [minimal, setMin] = React.useState('');

  var [skillsTmp, setSKillsTmp] = React.useState([]);

  const getKategori = async () => {
    await Client.get('/getKategori').then(response => {
      var data = [];
      data = response.data;
      setKategori(data);
      console.log(data);
    });
  };

  const getSubKategori = async (itemValue, itemValueSK) => {
    setValueNowSK(itemValueSK);
    setValueNow(itemValue);
    await Client.post('/getSubKategori', {kode_kategori: itemValue}).then(
      response => {
        console.log(response.data.subkategori);
        setSubKategori(response.data.subkategori);
      },
    );
  };

  const getSkillData = async () => {
    await Client.get('/skillSearch').then(response => {
      var data = [];
      data = response.data;
      setSKills(data);
      console.log(data);
    });
  };

  const tambahSkill = skillDipilih => {
    console.log(skillsTmp);
    setSKillsTmp(prevItem => [...prevItem, skillDipilih.skillDipilih]);
  };

  const hapusSkill = index => {
    console.log(index);
    skillsTmp.splice(index, 1);
    setSKillsTmp(prevItem => [...prevItem]);
  };

  const addPenawaranJasa = async () => {
    await Client.post('/tambahOpenBidding', {
      kode_client: passProfileData.kode_client,
      kode_subkategori_proyek: valuenowsk,
      tanggal: tanggalskg,
      judul_open_bidding: judulOB,
      deskripsi: deskripsi,
      gambar: urlImage,
      min: minimal,
      max: maximal,
      expire: datex,
      lamapengerjaan: lamaPengerjaan,
      interval: IntervalM,
      downpayment: toggleCheckBox,
    })
      .then(response => {
        Client.post('/retreiveKodeOpenBidding', {
          judul_open_bidding: judulOB,
        })
          .then(response => {
            Client.post('/openBiddingTagging', {
              kode_open_bidding: response.data.kodeOB,
              skill_tag: skillsTmp,
            })
              .then(response => {
                console.log(response);
                Alert.alert('Tambah Open Bidding', 'Berhasil ditambahkan !', [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Open Bidding'),
                  },
                ]);
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    getKategori();
    getDataProfile();
    getSkillData();
  }, []);

  return (
    <View>
      <ScrollView>
        <Text style={CompStyle.labelTbh}>Judul Open Bidding</Text>
        <TextInput
          style={CompStyle.inputTbh}
          placeholder="Masukkan Judul Open Bidding"
          value={judulOB}
          onChangeText={value => {
            setJudulOB(value);
          }}
        />
        <Text style={CompStyle.labelTbh}>Deskripsi</Text>
        <TextInput
          multiline={true}
          style={CompStyle.inputTbh}
          placeholder="Tambahkan Deskripsi"
          value={deskripsi}
          onChangeText={value => {
            setDeskripsi(value);
          }}
        />
        <Text style={CompStyle.labelTbh}>Kategori Open Bidding</Text>
        <View style={CompStyle.pickerX}>
          <Picker
            dropdownIconColor="black"
            selectedValue={valuenow}
            onValueChange={(itemValue, itemIndex) => getSubKategori(itemValue)}>
            {kategori.map((item, index) => {
              return (
                <Picker.Item
                  style={{backgroundColor: '#574EDB', color: 'white'}}
                  label={item.nama_kategori}
                  value={item.kode_kategori}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
        <Text style={CompStyle.labelTbh}>Subkategori Open Bidding</Text>
        <View style={CompStyle.pickerX}>
          <Picker
            itemStyle={{backgroundColor: 'red'}}
            selectedValue={valuenowsk}
            onValueChange={(itemValueSK, itemIndex) =>
              setValueNowSK(itemValueSK)
            }>
            {subKategori.map((item, index) => {
              return (
                <Picker.Item
                  style={{backgroundColor: '#574EDB', color: 'white'}}
                  label={item.nama_sub_kategori}
                  value={item.kode_sub_kategori_proyek}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
        <View style={CompStyle.illus}>
          <Text style={CompStyle.labelTbh}>Ilustrasi Pendukung</Text>
          {urlImage ? (
            <Image
              style={{width: 120, height: 240}}
              resizeMode="contain"
              source={{uri: urlImage}}
            />
          ) : (
            <View style={CompStyle.noImage}>
              <Text style={{textAlign: 'center', marginTop: 20}}>
                No Image Selected
              </Text>
            </View>
          )}
        </View>
        <Button
          title="Pilih dari koleksi JOBKU"
          onPress={() =>
            navigation.navigate('JOBKU Image User', {
              screenSource: 'TambahDaftarOpenBidding',
            })
          }
        />
        <Text style={CompStyle.labelTbh}>Keahlian yang dibutuhkan</Text>
        <View style={CompStyle.WrapSkill}>
          {skillsTmp.map((item, index) => {
            return (
              <View key={index}>
                <Chip
                  style={{backgroundColor: '#969ADA'}}
                  textStyle={{color: 'white'}}
                  mode="outlined"
                  onClose={() => hapusSkill(index)}>
                  {item}
                </Chip>
              </View>
            );
          })}
        </View>
        <View style={CompStyle.pilihSkill}>
          <TextInput
            style={CompStyle.inputTbh}
            placeholder="Cth : Menggambar , Mahir Sql"
            value={query}
            onChangeText={value => {
              setQuery(value);
            }}
          />
          {query == '' ? (
            <Text>Mulai Ketik</Text>
          ) : (
            <View>
              {skills
                .filter(keyWord => {
                  if (query == '') {
                    return keyWord;
                  } else if (
                    keyWord.nama_skill
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    return keyWord;
                  }
                })
                .map(keyWord => {
                  return (
                    <View key={keyWord.id}>
                      <TouchableOpacity
                        style={CompStyle.itemSkill}
                        onPress={() =>
                          tambahSkill({skillDipilih: keyWord.nama_skill})
                        }>
                        <Text style={{color: 'white'}}>
                          {keyWord.nama_skill}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          )}
        </View>
        <Text style={CompStyle.labelTbh}>Anggaran untuk Bid</Text>
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
        </View>
        <Text style={CompStyle.labelTbh}>Terbuka Hingga</Text>
        <View style={CompStyle.ExpireGroup}>
          <TextInput
            style={CompStyle.dateexp}
            editable={false}
            placeholder="Klik Ikon Kalender"
            placeholderTextColor={'black'}
            value={tanggalExp}
          />
          <TouchableOpacity
            style={CompStyle.ExpireButton}
            onPress={showDatePicker}>
            <Icon name="event" size={45} />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={CompStyle.labelTbh}>
          Lama Pengerjaan : {lamaPengerjaan} Hari
        </Text>
        <Slider
          value={lamaPengerjaan}
          onValueChange={setLamaPengerjaan}
          maximumValue={30}
          step={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
        />

        <View style={{margin: 10}}>
          <Text style={{margin: 20}}>
            Buat interval pembaruan milestone/progress proyek
          </Text>
          <Picker
            mode="dialog"
            selectedValue={IntervalM}
            onValueChange={(itemValue, itemIndex) => setIntervalM(itemValue)}>
            {OpsiInterval.map(OI => {
              return <Picker.Item label={OI.name} value={OI.indexnya} />;
            })}
          </Picker>
        </View>
        <View style={CompStyle.DP}>
          {maximal < 800000 ? (
            <CheckBox
              disabled={true}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
          ) : (
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
          )}
          <Text>Buat Pembayaran Down-Payment*</Text>
        </View>
        <Text style={{margin: 10}}>
          *Untuk pembayaran downpayment, hanya menerima anggaran minimal Rp
          800,000 rupiah keatas
        </Text>
        <View style={{margin: 10}}>
          <Button title="Tambah" onPress={addPenawaranJasa} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TambahDaftar;
