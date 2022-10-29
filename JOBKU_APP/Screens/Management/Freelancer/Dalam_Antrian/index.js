import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Pendingtrx} from '../../../../JOBKU RESC/componentStyles';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatNumber} from 'react-native-currency-input';
import {Card, Title, Paragraph} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DalamAntrianStack = createStackNavigator();

function DalamAntrian({navigation}) {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [kontrakJasa, setKontrakJasa] = React.useState([]);
  const [kontrakOB, setKontrakOB] = React.useState([]);
  const [proposalku, setProposalku] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/getKontrakJasa', {
      kode_freelancer: passProfileData.kode_freelancer,
    }).then(response => {
      console.log('kontrakberjalan', response.data.result);
      Client.post('/runningOB4Freelancer', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('onway OBF', response.data.result);
        Client.post('/proposalPribadi', {
          kode_freelancer: passProfileData.kode_freelancer,
        }).then(response => {
          console.log('proposalku', response.data);
          setProposalku(response.data);
        });
        setKontrakOB(response.data.result);
      });
      setKontrakJasa(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/getKontrakJasa', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('kontrakberjalan', response.data.result);
        Client.post('/runningOB4Freelancer', {
          kode_freelancer: passProfileData.kode_freelancer,
        }).then(response => {
          console.log('onway OBF', response.data.result);
          Client.post('/proposalPribadi', {
            kode_freelancer: passProfileData.kode_freelancer,
          }).then(response => {
            console.log('proposalku', response.data);
            setProposalku(response.data);
          });
          setKontrakOB(response.data.result);
        });
        setKontrakJasa(response.data.result);
      });
    });
  }, []);

  if (
    kontrakJasa.length == 0 &&
    kontrakOB.length == 0 &&
    proposalku.length == 0
  ) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginTop: 20}}>
          <Text style={{alignSelf: 'center'}}>
            Proyek yang sedang berjalan sedang tidak ada
          </Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {kontrakJasa.map(data => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PratinjauPesananjasa', {
                  kode_pembayaran_jasa: data.kode_pembayaran_jasa,
                  kodekontrak: data.kode_kontrak_jasa,
                  harga: data.harga_paket_jasa,
                  downpayment: data.downpayment,
                  dp: data.jumlah_pembayaran,
                  sdp: data.jumlah_yang_belum_dibayar,
                  persentase: data.persentase_dp,
                  tglktrk: data.tanggal_kontrak,
                  jenispaket: data.nama_jenis_paket,
                  namapry: data.judul_proyek,
                  subkategori: data.nama_sub_kategori,
                  nama_client: data.nama_client,
                  waktu_pembayaran: data.waktu_pembayaran,
                  tanggal_kontrak_jasa: data.tanggal_kontrak_jasa,
                  status_pembayaran_jasa: data.status_pembayaran_jasa,
                  kodeclient: data.kode_client,
                })
              }
              key={data.kode_pembayaran_jasa}
              style={Pendingtrx.container}>
              <View>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="cover"
                      source={{uri: data.fotoProfil}}
                      style={Pendingtrx.poster}
                    />
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        marginLeft: 10,
                      }}>
                      {data.nama_client}
                    </Text>
                  </View>
                  <View style={Pendingtrx.theproject}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="sticky-note" size={20} color="green" />
                      <Text
                        numberOfLines={1}
                        style={{fontSize: 20, marginLeft: 5}}>
                        {data.judul_proyek}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon color="green" name="dollar-sign" size={20} />
                      <Text style={{marginLeft: 10}}>
                        {formatNumber(
                          data.harga_paket_jasa -
                            data.harga_paket_jasa * data.persentase_dp,
                          {
                            separator: ',',
                            prefix: 'Rp ',
                            precision: 0,
                            delimiter: '.',
                            signPosition: 'beforePrefix',
                          },
                        )}
                      </Text>
                      {data.downpayment == 1 ? (
                        <Text> dengan DP {data.persentase_dp * 100} %</Text>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                  </View>
                </View>
                {data.downpayment == 1 ? (
                  <Text style={Pendingtrx.pending}>Down Payment</Text>
                ) : (
                  <Text style={Pendingtrx.confirmed}>Full Payment</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        {kontrakOB.map(data => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PratinjauOpenBidding', {
                  kode_bayar_kontrak: data.kode_pembayaran_kontrak_open_bidding,
                  kodekontrak: data.kode_kontrak_OB,
                  harga: data.anggaran_yang_ditetapkan,
                  pembayaranyangditerima: data.downpayment,
                  persentase: data.persentase_yang_ditetapkan,
                  tglktrk: data.tanggal_mulai_kontrak_ob,
                  namapry: data.judul_open_bidding,
                  subkategori: data.nama_sub_kategori,
                  nama_client: data.nama_client,
                  waktu_pembayaran: data.waktu_pembayaran_kontrak_open_bidding,
                  status_pembayaran_open_bidding:
                    data.status_pembayaran_open_bidding,
                  kodeclient: data.kode_client,
                })
              }
              key={data.kode_pembayaran_kontrak_open_bidding}
              style={Pendingtrx.container}>
              <View>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="cover"
                      source={{uri: data.fotoProfil}}
                      style={Pendingtrx.poster}
                    />
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        marginLeft: 10,
                      }}>
                      {data.nama_client}
                    </Text>
                  </View>
                  <View style={Pendingtrx.theproject}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="sticky-note" size={20} color="green" />
                      <Text
                        numberOfLines={1}
                        style={{fontSize: 20, marginLeft: 5}}>
                        {data.judul_open_bidding}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon color="green" name="dollar-sign" size={20} />
                      <Text style={{marginLeft: 10}}>
                        {formatNumber(data.anggaran_yang_ditetapkan, {
                          separator: ',',
                          prefix: 'Rp ',
                          precision: 0,
                          delimiter: '.',
                          signPosition: 'beforePrefix',
                        })}
                      </Text>
                      {data.persentase_yang_ditetapkan > 0 ? (
                        <Text>
                          {' '}
                          dengan DP {data.persentase_yang_ditetapkan * 100} %
                        </Text>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                  </View>
                </View>
                {data.persentase_yang_ditetapkan > 0 ? (
                  <Text style={Pendingtrx.pending}>Down Payment</Text>
                ) : (
                  <Text style={Pendingtrx.confirmed}>Full Payment</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        {proposalku.map(data => {
          return (
            <TouchableOpacity
              key={data.kode_proposal_open_bidding}
              style={Pendingtrx.container}>
              <Card>
                <Text style={{margin: 5, padding: 5, color: 'blue'}}>
                  Bidding
                </Text>
                <Card.Content>
                  <Title>{data.judul_open_bidding}</Title>
                  <Paragraph style={{fontWeight: 'bold'}}>
                    Proposal anda{' '}
                    {formatNumber(data.anggaran_yang_ditetapkan, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}{' '}
                  </Paragraph>
                  <Paragraph>
                    dari{' '}
                    {`${formatNumber(data.minimal, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })} - ${formatNumber(data.maksimal, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}`}
                  </Paragraph>
                  <Paragraph style={{fontWeight: 'bold'}}>
                    Dengan lama pengerjaan {data.durasi_pengerjaan} hari
                  </Paragraph>
                </Card.Content>
              </Card>
              <Text style={{margin: 5, padding: 5, color: '#FF7600'}}>
                Dalam Proses Seleksi
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const DalamAntrianStackScreen = () => (
  <DalamAntrianStack.Navigator screenOptions={{headerShown: false}}>
    <DalamAntrianStack.Screen name="DalamAntrian" component={DalamAntrian} />
  </DalamAntrianStack.Navigator>
);

export default DalamAntrianStackScreen;
