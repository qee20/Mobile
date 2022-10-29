import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {PreviewStyle} from '../../../../../../JOBKU RESC/componentStyles';
//import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-elements';
import {IconButton, Colors, Button, Divider} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';
import {Picker} from '@react-native-picker/picker';

const Checkout = ({navigation, route}) => {
  const {previewData, data} = route.params;

  const [selectedDP, setselectedDP] = React.useState(0);
  const [choice, setChoice] = React.useState(0);

  const setPayment = itemValue => {
    setChoice(itemValue);
    setselectedDP(35 / 100);
  };

  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');

  const contractConfirmed = () => {
    var kontrakOB;
    var kodebayarM;
    Alert.alert(
      'Kontrak Open Bidding',
      `Lanjutkan ke pembayaran?`,
      [
        {
          text: 'Lanjutkan',
          onPress: () =>
            Client.post('/createContractOB', {
              kode_open_bidding: previewData.kode_open_bidding,
              kode_proposal_open_bidding: data.kode_proposal_open_bidding,
              tanggal_mulai_kontrak_ob: tanggalskg,
              tanggal_selesai_kontrak_ob: moment(tanggalskg)
                .add(data.durasi_pengerjaan, 'days')
                .format('YYYY-MM-DD HH:mm:ss'),
            })
              .then(response => {
                console.log('createOBk', response);
                Client.post('/retriveContractOB', {
                  tanggal: tanggalskg,
                })
                  .then(response => {
                    console.log(
                      'kodeobk',
                      response.data.result[0].kode_kontrak_OB,
                    );
                    kontrakOB = response.data.result[0].kode_kontrak_OB;
                    Client.post('/generatePaymentOB', {
                      kode_kontrak_open_bidding:
                        response.data.result[0].kode_kontrak_OB,
                      waktu_pembayaran_ob: tanggalskg,
                      persentase_dp_ob: selectedDP,
                    })
                      .then(response => {
                        console.log('createpayment', response.data);
                        Client.post('/paymentOBMS', {
                          tanggal: tanggalskg,
                        })
                          .then(response => {
                            console.log(
                              'kode bayar',
                              response.data[0]
                                .kode_pembayaran_kontrak_open_bidding,
                            );
                            kodebayarM =
                              response.data[0]
                                .kode_pembayaran_kontrak_open_bidding;
                            Client.put(
                              `/UpdateSelectedProposal/${data.kode_proposal_open_bidding}`,
                              {
                                proposalID: data.kode_proposal_open_bidding,
                              },
                            )
                              .then(response => {
                                console.log('updateproposal', response.data);
                                Client.put(
                                  `/CloseOB/${previewData.kode_open_bidding}`,
                                  {
                                    OB_id: previewData.kode_open_bidding,
                                  },
                                )
                                  .then(response => {
                                    Client.post(
                                      '/pushNotification/Freelancer',
                                      {
                                        kode_freelancer: data.kode_freelancer,
                                        tanggal_notifikasi: tanggalskg,
                                        jenis_notifikasi: 1,
                                        keterangan_notifikasi_freelancer: `${previewData.kode_client} telah menerima proposal anda pada proyek ${previewData.judul_open_bidding}`,
                                      },
                                    ).then(response => {
                                      console.log(response);
                                    });
                                    console.log('updateOB', response.data);
                                    navigation.navigate('BayarOB', {
                                      kodebyr: kodebayarM,
                                      previewData,
                                      data,
                                      jp: selectedDP,
                                      persen: selectedDP,
                                      jtb:
                                        data.anggaran_yang_ditetapkan -
                                        data.anggaran_yang_ditetapkan *
                                          selectedDP,
                                      kodeKontraOB: kontrakOB,
                                    });
                                  })
                                  .catch(error => console.log(error));
                              })
                              .catch(error => console.log(error));
                          })
                          .catch(error => console.log(error));
                      })
                      .catch(error => console.log(error));
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error)),
        },
      ],
      {cancelable: true},
    );
  };

  React.useEffect(async () => {
    console.log('Prev Data', previewData);
    console.log('Freelancer Data', data);
  }, []);

  return (
    <View>
      <Text style={{margin: 5, fontWeight: 'bold', fontSize: 18}}>
        Open Bidding Anda
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          margin: 5,
          borderWidth: 1,
        }}>
        <View>
          <Text>Kode Open Bidding</Text>
          <Text>Judul Open Bidding</Text>
          <Text>Kategori Bidding</Text>
          <Text>Sub Kategori Bidding</Text>
          <Text>Anggaran Proyek</Text>
          <Text>Durasi Pengerjaan</Text>
          <Text>Tanggal Buka Open Bidding</Text>
          <Text>Tanggal Tutup Open Bidding</Text>
        </View>
        <View>
          <Text>{previewData.kode_open_bidding}</Text>
          <Text>{previewData.judul_open_bidding}</Text>
          <Text>{previewData.nama_kategori}</Text>
          <Text>{previewData.nama_sub_kategori}</Text>
          <Text>{previewData.anggaran_biaya}</Text>
          <Text>{previewData.durasi_pengerjaan} hari</Text>
          <Text>
            {moment(previewData.tanggal_posting_OB).format('DD MMMM YYYY')}
          </Text>
          <Text>
            {moment(previewData.waktu_tenggat_bidding).format('DD MMMM YYYY')}
          </Text>
        </View>
      </View>
      <Text style={{margin: 5, fontWeight: 'bold', fontSize: 18}}>
        Proposal Freelancer
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          margin: 5,
          borderWidth: 1,
        }}>
        <View>
          <Text>Tanggal Proposal</Text>
          <Text>Nama Freelancer</Text>
          <Text>Anggaran yang ditawar</Text>
          <Text>Tawaran Lama pengerjaan</Text>
          <Text>Jenis Pembayaran Diterima</Text>
        </View>
        <View>
          <Text>{moment(data.tanggal_proposal).format('DD MMMM YYYY')}</Text>
          <Text>{data.nama_freelancer}</Text>
          <Text>
            {formatNumber(data.anggaran_yang_ditetapkan, {
              separator: ',',
              prefix: 'Rp ',
              precision: 0,
              delimiter: '.',
              signPosition: 'beforePrefix',
            })}
          </Text>
          <Text>{data.durasi_pengerjaan} Hari</Text>
          {data.pembayaran_yang_diterima == 'Down Payment' ? (
            <Text>{data.pembayaran_yang_diterima} dan Full Payment</Text>
          ) : (
            <Text>{data.pembayaran_yang_diterima}</Text>
          )}
        </View>
      </View>
      {data.pembayaran_yang_diterima == 'Full Payment' ? (
        <View></View>
      ) : (
        <View>
          <Text style={{margin: 5}}>
            *Freelancer menerima pembayaran Down Payment, tetapkan persentase
            Down Payment jika anda ingin membayar dengan Down Payment{' '}
          </Text>
          <Text style={{margin: 5}}>Pilih Pembayaran</Text>
        </View>
      )}
      {data.pembayaran_yang_diterima == 'Full Payment' ? (
        <Picker
          enabled={false}
          mode="dropdown"
          selectedValue={choice}
          onValueChange={(itemValue, itemIndex) => setPayment(itemValue)}>
          <Picker.Item label="Full Payment" value={0} />
          <Picker.Item label="Down Payment" value={1} />
        </Picker>
      ) : (
        <Picker
          mode="dropdown"
          selectedValue={choice}
          onValueChange={(itemValue, itemIndex) => setPayment(itemValue)}>
          <Picker.Item label="Full Payment" value={0} />
          <Picker.Item label="Down Payment" value={1} />
        </Picker>
      )}
      {choice == 0 ? (
        <Text
          style={{
            textAlign: 'center',
            margin: 10,
            fontWeight: 'bold',
            color: 'blue',
          }}>
          Pembayaran Full Payment
        </Text>
      ) : (
        <Picker
          mode="dropdown"
          selectedValue={selectedDP}
          onValueChange={(itemValue, itemIndex) => setselectedDP(itemValue)}>
          <Picker.Item label="35%" value={35 / 100} />
          <Picker.Item label="50%" value={50 / 100} />
          <Picker.Item label="75%" value={75 / 100} />
        </Picker>
      )}
      <Button onPress={contractConfirmed} style={{margin: 5}} mode="outlined">
        Lanjutkan ke Pembayaran
      </Button>
    </View>
  );
};

export default Checkout;
