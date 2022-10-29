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
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Checkout} from '../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {formatNumber} from 'react-native-currency-input';

const SewaFreelancer = ({navigation, route}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);
  const {dataShow} = route.params;

  const [value, setValue] = React.useState('first');
  const [selectedDP, setselectedDP] = React.useState(35 / 100);
  const [permintaanLamapengerjaan, setPermintaanLamapengerjaan] =
    React.useState(0);
  const [tanggalAkhir, setTanggalAkhir] = React.useState('');
  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');
  var msgs = `${passProfileData.nama_client} telah melakukan pemesanan terhadap penawaran jasa anda`;

  const createContract = () => {
    var kdkontrak, kdbyrjs;
    Alert.alert(
      'Sewa Freelancer',
      `Lanjutkan ke pembayaran?`,
      [
        {
          text: 'Lanjutkan',
          onPress: () =>
            Client.post('/createContractJasa', {
              kode_paket_penawaran_jasa: dataShow.kode_paket_penawaran_jasa,
              kode_client: passProfileData.kode_client,
              tanggal: tanggalskg,
              permintaan_lama_pengerjaan: permintaanLamapengerjaan,
              tanggalAkhir: moment(tanggalskg)
                .add(permintaanLamapengerjaan, 'days')
                .format('YYYY-MM-DD HH:mm:ss'),
            }).then(response => {
              console.log('kontrak', response);
              Client.post('/kontrakJasaData', {
                tanggal: tanggalskg,
              }).then(response => {
                console.log(response);
                console.log(response.data.result[0].kode_kontrak_jasa);
                kdkontrak = response.data.result[0].kode_kontrak_jasa;
                Client.post('/createPayment', {
                  kode_kontrak_projek_jasa:
                    response.data.result[0].kode_kontrak_jasa,
                  waktu_pembayaran: tanggalskg,
                  persentase_dp: selectedDP,
                }).then(response => {
                  console.log(response);
                  Client.post('/paymentCodeSservice', {
                    tanggal: tanggalskg,
                  }).then(response => {
                    console.log(response.data[0].kode_pembayaran_jasa);
                    kdbyrjs = response.data[0].kode_pembayaran_jasa;
                    Client.post('/pushNotification/Freelancer', {
                      kode_freelancer: dataShow.kode_freelancer,
                      tanggal_notifikasi: tanggalskg,
                      jenis_notifikasi: 2,
                      keterangan_notifikasi_freelancer: msgs,
                    }).then(response => {
                      console.log(response);
                      navigation.navigate('Pembayaran', {
                        kode_pembayaran_jasa: kdbyrjs,
                        kodekontrak: kdkontrak,
                        harga: dataShow.harga_paket_jasa,
                        persentase: selectedDP,
                        downpayment: dataShow.downpayment,
                        dp:
                          dataShow.harga_paket_jasa * selectedDP +
                          dataShow.harga_paket_jasa *
                            selectedDP *
                            (1 - selectedDP),
                        sdp:
                          dataShow.harga_paket_jasa -
                          dataShow.harga_paket_jasa * selectedDP,
                        dataShow,
                        arrays: response.data,
                      });
                    });
                  });
                });
              });
            }),
        },
      ],
      {cancelable: true},
    );
  };

  React.useEffect(() => {
    console.log(dataShow);
  }, []);

  const Detail = () => {
    return (
      <ScrollView>
        <View style={Checkout.Detailup}>
          <Image
            source={{uri: dataShow.url_gambar}}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
          <View>
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                flex: 1,
                fontSize: 20,
                marginLeft: 10,
              }}>
              {dataShow.judul_proyek}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                flex: 1,
                fontSize: 13,
                marginLeft: 10,
              }}>
              {dataShow.deskripsi}
            </Text>
            <Text
              style={{
                color: 'yellow',
                flex: 2,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              {dataShow.nama_freelancer}
            </Text>
          </View>
        </View>
        <View style={Checkout.Paketdetail}>
          <Text>
            Harga :{' '}
            {formatNumber(dataShow.harga_paket_jasa, {
              separator: ',',
              prefix: 'Rp ',
              precision: 0,
              delimiter: '.',
              signPosition: 'beforePrefix',
            })}
          </Text>
          <Text>Keterangan :</Text>
          <Text> + {dataShow.keterangan}</Text>
        </View>
        <View style={Checkout.downpayment}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{alignSelf: 'center'}}
              name="information-circle"
              size={25}
            />
            <Text style={{alignSelf: 'center', fontSize: 20, marginLeft: 10}}>
              Info
            </Text>
          </View>
          <View style={{margin: 10}}>
            {dataShow.downpayment == 1 ? (
              <Text>
                Freelancer menerima pembayaran secara downpayment. Jika anda
                ingin melanjutkan pembayaran, maka anda harus membayar biaya
                tambahan sebagai Deposit Receipt dan kemudian Deposit Receipt
                akan digabung dengan pembayaran kedua nantinya
              </Text>
            ) : (
              <Text>Tidak Menerima DownPayment</Text>
            )}
          </View>
        </View>
        {dataShow.downpayment == 1 ? (
          <View>
            <View style={Checkout.DPpersen}>
              <Text>Persentase DP : </Text>
              <Picker
                mode="dropdown"
                selectedValue={selectedDP}
                onValueChange={(itemValue, itemIndex) =>
                  setselectedDP(itemValue)
                }>
                <Picker.Item label="35%" value={35 / 100} />
                <Picker.Item label="50%" value={50 / 100} />
                <Picker.Item label="75%" value={75 / 100} />
              </Picker>
              <Text style={{margin: 3}}>
                Deposit Receipt :{' '}
                {formatNumber(
                  dataShow.harga_paket_jasa * selectedDP * (1 - selectedDP),
                  {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 0,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                  },
                )}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                }}>
                <Text style={{margin: 3}}>
                  Pembayaran I :{' '}
                  {formatNumber(dataShow.harga_paket_jasa * selectedDP, {
                    separator: ',',
                    prefix: 'Rp ',
                    precision: 0,
                    delimiter: '.',
                    signPosition: 'beforePrefix',
                  })}
                </Text>
                <Text style={{margin: 3, fontWeight: 'bold'}}>
                  Total Pembayaran :{' '}
                  {formatNumber(
                    dataShow.harga_paket_jasa * selectedDP +
                      dataShow.harga_paket_jasa * selectedDP * (1 - selectedDP),
                    {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    },
                  )}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                }}>
                <Text style={{margin: 3}}>
                  Pembayaran II :{' '}
                  {formatNumber(
                    dataShow.harga_paket_jasa -
                      dataShow.harga_paket_jasa * selectedDP,
                    {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    },
                  )}
                </Text>
                <Text style={{margin: 3, fontWeight: 'bold'}}>
                  Total Pembayaran :{' '}
                  {formatNumber(
                    dataShow.harga_paket_jasa -
                      dataShow.harga_paket_jasa * selectedDP -
                      dataShow.harga_paket_jasa * selectedDP * (1 - selectedDP),
                    {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    },
                  )}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={Checkout.Full}>
            <Text>
              Jumlah yang akan dibayarkan : Rp.{' '}
              {formatNumber(dataShow.harga_paket_jasa, {
                separator: ',',
                prefix: 'Rp ',
                precision: 0,
                delimiter: '.',
                signPosition: 'beforePrefix',
              })}
            </Text>
          </View>
        )}
        <Text style={{margin: 5}}>
          Tetapkan lama pengerjaan : {permintaanLamapengerjaan} hari
        </Text>
        <Slider
          style={{margin: 5}}
          value={permintaanLamapengerjaan}
          onValueChange={setPermintaanLamapengerjaan}
          maximumValue={dataShow.lama_pengerjaan_yang_diterima}
          step={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
        />
        <Text>
          Proyek akan diselesaikan sebelum{' '}
          {moment(tanggalskg)
            .add(permintaanLamapengerjaan, 'days')
            .format('YYYY-MM-DD HH:mm:ss')}{' '}
        </Text>
        <View style={{margin: 10}}>
          <Button title="Checkout" onPress={createContract} />
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      <Detail />
    </View>
  );
};

export default SewaFreelancer;
