import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Pendingtrx,
  FinisedProject,
  ThePaymentLists,
} from '../../../../JOBKU RESC/componentStyles';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import moment from 'moment';
import {formatNumber} from 'react-native-currency-input';
import {List} from 'react-native-paper';
import {Badge} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const BelumBayarStack = createStackNavigator();

function BelumBayar({navigation}) {
  var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
  var d = Date.now();
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [pendingPaymentOB, setPendingPaymentOB] = React.useState([]);
  const [belumLunasOB, setBelumLunasOB] = React.useState([]);
  const [confirmedOB, setConfirmedOB] = React.useState([]);
  const [waitinOB, setWaitinOB] = React.useState([]);
  const [pendingPayment, setPendingPayment] = React.useState([]);
  const [belumLunas, setBelumLunas] = React.useState([]);
  const [confirmed, setConfirmed] = React.useState([]);
  const [waitin, setWaitin] = React.useState([]);
  const [expanded, setExpanded] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/kontrakjasaBelumTerbayar', {
      kode_client: passProfileData.kode_client,
    }).then(response => {
      console.log('belum bayar', response.data.result);
      Client.post('/pembayaranJasaBelumLunas', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('belum lunas', response.data.result);
        Client.post('/pembayaranJasaMenungguKonfirmasi', {
          kode_client: passProfileData.kode_client,
        }).then(response => {
          console.log('waiting confirm', response.data.result);
          Client.post('/pembayaranJasaDiKonfirmasi', {
            kode_client: passProfileData.kode_client,
          }).then(response => {
            console.log('dikonfirmasi', response.data.result);
            Client.post('/pembayaranOBDiKonfirmasi', {
              kode_client: passProfileData.kode_client,
            }).then(response => {
              console.log('ob dikonfirmasi', response.data.result);
              Client.post('/pembayaranOBMenungguDiKonfirmasi', {
                kode_client: passProfileData.kode_client,
              }).then(response => {
                console.log('ob tunggu', response.data.result);
                Client.post('/pembayaranOBBelumLunas', {
                  kode_client: passProfileData.kode_client,
                }).then(response => {
                  console.log('ob belum lunas', response.data.result);
                  Client.post('/pembayaranOBBelumBayar', {
                    kode_client: passProfileData.kode_client,
                  }).then(response => {
                    console.log('ob belum dibayar', response.data.result);
                    setPendingPaymentOB(response.data.result);
                  });
                  setBelumLunasOB(response.data.result);
                });
                setWaitinOB(response.data.result);
              });
              setConfirmedOB(response.data.result);
            });
            setConfirmed(response.data.result);
          });
          setWaitin(response.data.result);
        });
        setBelumLunas(response.data.result);
      });
      setPendingPayment(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handlePress = () => setExpanded(!expanded);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/kontrakjasaBelumTerbayar', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('belum bayar', response.data.result);
        Client.post('/pembayaranJasaBelumLunas', {
          kode_client: passProfileData.kode_client,
        }).then(response => {
          console.log('belum lunas', response.data.result);
          Client.post('/pembayaranJasaMenungguKonfirmasi', {
            kode_client: passProfileData.kode_client,
          }).then(response => {
            console.log('waiting confirm', response.data.result);
            Client.post('/pembayaranJasaDiKonfirmasi', {
              kode_client: passProfileData.kode_client,
            }).then(response => {
              console.log('dikonfirmasi', response.data.result);
              Client.post('/pembayaranOBDiKonfirmasi', {
                kode_client: passProfileData.kode_client,
              }).then(response => {
                console.log('ob dikonfirmasi', response.data.result);
                Client.post('/pembayaranOBMenungguDiKonfirmasi', {
                  kode_client: passProfileData.kode_client,
                }).then(response => {
                  console.log('ob tunggu', response.data.result);
                  Client.post('/pembayaranOBBelumLunas', {
                    kode_client: passProfileData.kode_client,
                  }).then(response => {
                    console.log('ob belum lunas', response.data.result);
                    Client.post('/pembayaranOBBelumBayar', {
                      kode_client: passProfileData.kode_client,
                    }).then(response => {
                      console.log('ob belum dibayar', response.data.result);
                      setPendingPaymentOB(response.data.result);
                    });
                    setBelumLunasOB(response.data.result);
                  });
                  setWaitinOB(response.data.result);
                });
                setConfirmedOB(response.data.result);
              });
              setConfirmed(response.data.result);
            });
            setWaitin(response.data.result);
          });
          setBelumLunas(response.data.result);
        });
        setPendingPayment(response.data.result);
      });
    });
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <List.AccordionGroup>
          <List.Accordion
            onPress={handlePress}
            expanded
            title="Belum Bayar"
            id="1"
            description="Pemesanan jasa yang sudah anda buat dan belum melakukan pembayaran"
            style={{borderRadius: 10, margin: 5}}>
            {/* Jasa Belum Bayar */}
            {pendingPayment.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Pembayaran', {
                        kode_pembayaran_jasa: data.kode_pembayaran_jasa,
                        kodekontrak: data.kode_kontrak_jasa,
                        harga: data.harga_paket_jasa,
                        downpayment: data.downpayment,
                        dp: data.harga_paket_jasa * data.persentase_dp,
                        sdp:
                          data.harga_paket_jasa -
                          data.harga_paket_jasa * data.persentase_dp,
                        persentase: data.persentase_dp,
                        tglktrk: data.tanggal_kontrak,
                        jenispaket: data.nama_jenis_paket,
                        namapry: data.judul_proyek,
                        client: data.nama_client,
                      })
                    }
                    key={data.kode_pembayaran_jasa}
                    style={ThePaymentLists.container}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Image
                            source={{uri: data.fotoProfil}}
                            style={ThePaymentLists.fotoProfil}
                          />
                        </View>
                        <Text style={ThePaymentLists.namaFreelancer}>
                          {data.nama_freelancer}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.judulproyek}>
                        <Text>{data.judul_proyek}</Text>
                        <Text>
                          {data.nama_kategori} - {data.nama_sub_kategori}
                        </Text>
                        <Text>{data.nama_jenis_paket}</Text>
                      </View>
                      <View style={ThePaymentLists.trxInfo}>
                        {data.downpayment == 1 ? (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {data.harga_paket_jasa * data.persentase_dp} -{' '}
                              {`(${data.persentase_dp * 100} %)`} - Down Payment
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {data.harga_paket_jasa} -Full Payment
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* Open Bidding Belum Bayar */}
            {pendingPaymentOB.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('KirimBuktiTF', {
                        previewData: '',
                        data: data,
                        persen: data.persentase_yang_ditetapkan,
                        jp: data.persentase_yang_ditetapkan,
                        kodebyr: data.kode_pembayaran_kontrak_open_bidding,
                        jtb: data.jumlah_sisa_bayar_kontrak_open_bidding,
                        urlImage: '',
                        kodeKontraOB: data.kode_kontrak_OB,
                      })
                    }
                    key={data.kode_pembayaran_jasa}
                    style={ThePaymentLists.container}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{uri: data.fotoProfil}}
                          style={ThePaymentLists.fotoProfil}
                        />
                        <Text style={ThePaymentLists.namaFreelancer}>
                          {data.nama_freelancer}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.judulproyek}>
                        <Text>{data.judul_open_bidding}</Text>
                        <Text>
                          {data.nama_kategori} - {data.nama_sub_kategori}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.trxInfo}>
                        <Text>{data.nama_jenis_paket}</Text>
                        {data.persentase_yang_ditetapkan > 0 ? (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(
                                data.anggaran_yang_ditetapkan -
                                  data.anggaran_yang_ditetapkan *
                                    data.persentase_yang_ditetapkan,
                                {
                                  separator: ',',
                                  prefix: 'Rp ',
                                  precision: 2,
                                  delimiter: '.',
                                  signPosition: 'beforePrefix',
                                },
                              )}{' '}
                              -{' '}
                              {`(${
                                100 - data.persentase_yang_ditetapkan * 100
                              } %) lagi`}{' '}
                              - Down Payment
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(data.anggaran_yang_ditetapkan, {
                                separator: ',',
                                prefix: 'Rp ',
                                precision: 2,
                                delimiter: '.',
                                signPosition: 'beforePrefix',
                              })}{' '}
                              -Full Payment
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </List.Accordion>
          <Badge style={{right: 23, bottom: 80}}>
            {pendingPaymentOB.length + pendingPayment.length}
          </Badge>
          <List.Accordion
            title="Belum Lunas"
            id="2"
            description="Info  belum lunas muncul ketika pembayaran pertama untuk downpayment anda sudah dikonfirmasi"
            style={{borderRadius: 10, margin: 5}}>
            {/* Jasa Belum Lunas */}
            {belumLunas.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Pembayaran', {
                        kode_pembayaran_jasa: data.kode_pembayaran_jasa_detail,
                        kodekontrak: data.kode_kontrak_jasa,
                        harga: data.harga_paket_jasa,
                        downpayment: data.downpayment,
                        dp:
                          data.harga_paket_jasa -
                          data.harga_paket_jasa * data.persentase_dp,
                        sdp: 0,
                        persentase: data.persentase_dp,
                        tglktrk: data.tanggal_kontrak,
                        jenispaket: data.nama_jenis_paket,
                        namapry: data.judul_proyek,
                        client: data.nama_client,
                      })
                    }
                    key={data.kode_pembayaran_jasa}
                    style={ThePaymentLists.container}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{uri: data.fotoProfil}}
                          style={ThePaymentLists.fotoProfil}
                        />
                        <Text style={ThePaymentLists.namaFreelancer}>
                          {data.nama_freelancer}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.judulproyek}>
                        <Text>{data.judul_proyek}</Text>
                        <Text>
                          {data.nama_kategori} - {data.nama_sub_kategori}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.trxInfo}>
                        <Text>{data.nama_jenis_paket}</Text>
                        {data.downpayment == 1 ? (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(
                                data.harga_paket_jasa -
                                  data.harga_paket_jasa * data.persentase_dp,
                                {
                                  separator: ',',
                                  prefix: 'Rp ',
                                  precision: 2,
                                  delimiter: '.',
                                  signPosition: 'beforePrefix',
                                },
                              )}{' '}
                              - {`(${100 - data.persentase_dp * 100} %) lagi`} -
                              Down Payment
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(data.harga_paket_jasa, {
                                separator: ',',
                                prefix: 'Rp ',
                                precision: 2,
                                delimiter: '.',
                                signPosition: 'beforePrefix',
                              })}{' '}
                              -Full Payment
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* Open Bidding Belum Lunas */}
            {belumLunasOB.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('KirimBuktiTF', {
                        previewData: '',
                        data: data,
                        persen: data.persentase_yang_ditetapkan,
                        jp: data.persentase_yang_ditetapkan,
                        kodebyr:
                          data.kode_detail_pembayaran_kontrak_open_bidding,
                        jtb: data.jumlah_sisa_bayar_kontrak_open_bidding,
                        urlImage: '',
                        kodeKontraOB: data.kode_kontrak_OB,
                      })
                    }
                    key={data.kode_detail_pembayaran_kontrak_open_bidding}
                    style={ThePaymentLists.container}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{uri: data.fotoProfil}}
                          style={ThePaymentLists.fotoProfil}
                        />
                        <Text style={ThePaymentLists.namaFreelancer}>
                          {data.nama_freelancer}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.judulproyek}>
                        <Text>{data.judul_open_bidding}</Text>
                        <Text>
                          {data.nama_kategori} - {data.nama_sub_kategori}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.trxInfo}>
                        <Text
                          style={{
                            margin: 5,
                            color: '#D9DD6B',
                            fontWeight: 'bold',
                          }}>
                          Open Bidding
                        </Text>
                        {data.persentase_yang_ditetapkan > 0 ? (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(
                                data.anggaran_yang_ditetapkan -
                                  data.anggaran_yang_ditetapkan *
                                    data.persentase_yang_ditetapkan,
                                {
                                  separator: ',',
                                  prefix: 'Rp ',
                                  precision: 2,
                                  delimiter: '.',
                                  signPosition: 'beforePrefix',
                                },
                              )}{' '}
                              -{' '}
                              {`(${
                                100 - data.persentase_yang_ditetapkan * 100
                              } %) lagi`}{' '}
                              - Down Payment
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(data.anggaran_yang_ditetapkan, {
                                separator: ',',
                                prefix: 'Rp ',
                                precision: 2,
                                delimiter: '.',
                                signPosition: 'beforePrefix',
                              })}{' '}
                              -Full Payment
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </List.Accordion>
          <Badge style={{right: 23, bottom: 80}}>
            {belumLunas.length + belumLunasOB.length}
          </Badge>
          <View>
            <List.Accordion
              title="Menunggu Konfirmasi"
              id="3"
              description="Bukti Transaksi yang anda kirimkan sedang dalam pemeriksaan oleh admin">
              {waitin.map(data => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailTransaksi', {
                          data: data,
                          type2Show: 'JS',
                        })
                      }
                      key={data.kode_pembayaran_jasa}
                      style={ThePaymentLists.container}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{uri: data.fotoProfil}}
                            style={ThePaymentLists.fotoProfil}
                          />
                          <Text style={ThePaymentLists.namaFreelancer}>
                            {data.nama_freelancer}
                          </Text>
                        </View>
                        <View style={ThePaymentLists.judulproyek}>
                          <Text>{data.judul_proyek}</Text>
                          <Text>
                            {data.nama_kategori} - {data.nama_sub_kategori}
                          </Text>
                          <Text>{data.nama_jenis_paket}</Text>
                        </View>
                        <View style={ThePaymentLists.trxInfo}>
                          {data.downpayment == 1 ? (
                            <View>
                              {data.jumlah_yang_belum_dibayar == 0 ? (
                                <View>
                                  <Text style={ThePaymentLists.txt}>
                                    {formatNumber(
                                      data.harga_paket_jasa -
                                        data.harga_paket_jasa *
                                          data.persentase_dp,
                                      {
                                        separator: ',',
                                        prefix: 'Rp ',
                                        precision: 2,
                                        delimiter: '.',
                                        signPosition: 'beforePrefix',
                                      },
                                    )}{' '}
                                    - {`(${100 - data.persentase_dp * 100} %)`}{' '}
                                    - Down Payment
                                  </Text>
                                </View>
                              ) : (
                                <View>
                                  <Text style={ThePaymentLists.txt}>
                                    {formatNumber(
                                      data.harga_paket_jasa *
                                        data.persentase_dp,
                                      {
                                        separator: ',',
                                        prefix: 'Rp ',
                                        precision: 2,
                                        delimiter: '.',
                                        signPosition: 'beforePrefix',
                                      },
                                    )}{' '}
                                    - {`(${data.persentase_dp * 100} %)`} - Down
                                    Payment
                                  </Text>
                                </View>
                              )}
                            </View>
                          ) : (
                            <View>
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(data.harga_paket_jasa, {
                                  separator: ',',
                                  prefix: 'Rp ',
                                  precision: 2,
                                  delimiter: '.',
                                  signPosition: 'beforePrefix',
                                })}{' '}
                                -Full Payment
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
              {waitinOB.map(data => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailTransaksi', {
                          data: data,
                          type2Show: 'JS',
                        })
                      }
                      key={data.kode_pembayaran_jasa}
                      style={ThePaymentLists.container}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{uri: data.fotoProfil}}
                            style={ThePaymentLists.fotoProfil}
                          />
                          <Text style={ThePaymentLists.namaFreelancer}>
                            {data.nama_freelancer}
                          </Text>
                        </View>
                        <View style={ThePaymentLists.judulproyek}>
                          <Text>{data.judul_open_bidding}</Text>
                          <Text>
                            {data.nama_kategori} - {data.nama_sub_kategori}
                          </Text>
                        </View>
                        <View style={ThePaymentLists.trxInfo}>
                          <Text
                            style={{
                              margin: 5,
                              color: '#D9DD6B',
                              fontWeight: 'bold',
                            }}>
                            Open Bidding
                          </Text>
                          {data.persentase_dp_ob > 0 ? (
                            <View>
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(
                                  data.anggaran_yang_ditetapkan -
                                    data.anggaran_yang_ditetapkan *
                                      data.persentase_dp_ob,
                                  {
                                    separator: ',',
                                    prefix: 'Rp ',
                                    precision: 2,
                                    delimiter: '.',
                                    signPosition: 'beforePrefix',
                                  },
                                )}{' '}
                                -{' '}
                                {`(${
                                  100 - data.persentase_dp_ob * 100
                                } %) lagi`}{' '}
                                - Down Payment
                              </Text>
                            </View>
                          ) : (
                            <View>
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(data.anggaran_yang_ditetapkan, {
                                  separator: ',',
                                  prefix: 'Rp ',
                                  precision: 2,
                                  delimiter: '.',
                                  signPosition: 'beforePrefix',
                                })}{' '}
                                -Full Payment
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </List.Accordion>
          </View>
          <Badge style={{right: 23, bottom: 80}}>
            {waitin.length + waitinOB.length}
          </Badge>
          <List.Accordion
            title="Dikonfirmasi"
            id="4"
            description="Bukti Transaksi yang anda kirimkan sudah diperiksa dan disetujui oleh admin">
            {confirmed.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailTransaksi', {
                        data: data,
                        type2Show: 'JS',
                      })
                    }
                    key={data.kode_pembayaran_jasa}
                    style={ThePaymentLists.container}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{uri: data.fotoProfil}}
                          style={ThePaymentLists.fotoProfil}
                        />
                        <Text style={ThePaymentLists.namaFreelancer}>
                          {data.nama_freelancer}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.judulproyek}>
                        <Text>{data.judul_proyek}</Text>
                        <Text>
                          {data.nama_kategori} - {data.nama_sub_kategori}
                        </Text>
                        <Text>{data.nama_jenis_paket}</Text>
                      </View>
                      {data.downpayment == 1 ? (
                        <View style={ThePaymentLists.trxInfo}>
                          {data.jumlah_yang_belum_dibayar == 0 ? (
                            <View>
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(
                                  data.harga_paket_jasa -
                                    data.harga_paket_jasa * data.persentase_dp,
                                  {
                                    separator: ',',
                                    prefix: 'Rp ',
                                    precision: 2,
                                    delimiter: '.',
                                    signPosition: 'beforePrefix',
                                  },
                                )}{' '}
                                - {`(${100 - data.persentase_dp * 100} %)`} -
                                Down Payment
                              </Text>
                            </View>
                          ) : (
                            <View>
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(
                                  data.harga_paket_jasa * data.persentase_dp,
                                  {
                                    separator: ',',
                                    prefix: 'Rp ',
                                    precision: 2,
                                    delimiter: '.',
                                    signPosition: 'beforePrefix',
                                  },
                                )}{' '}
                                - {`(${data.persentase_dp * 100} %)`} - Down
                                Payment
                              </Text>
                            </View>
                          )}
                        </View>
                      ) : (
                        <View>
                          <Text style={ThePaymentLists.txt}>
                            {formatNumber(data.harga_paket_jasa, {
                              separator: ',',
                              prefix: 'Rp ',
                              precision: 2,
                              delimiter: '.',
                              signPosition: 'beforePrefix',
                            })}{' '}
                            -Full Payment
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
            {confirmedOB.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailTransaksi', {
                        data: data,
                        type2Show: 'OB',
                      })
                    }
                    key={data.kode_pembayaran_jasa}
                    style={ThePaymentLists.container}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{uri: data.fotoProfil}}
                          style={ThePaymentLists.fotoProfil}
                        />
                        <Text style={ThePaymentLists.namaFreelancer}>
                          {data.nama_freelancer}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.judulproyek}>
                        <Text>{data.judul_open_bidding}</Text>
                        <Text>
                          {data.nama_kategori} - {data.nama_sub_kategori}
                        </Text>
                      </View>
                      <View style={ThePaymentLists.trxInfo}>
                        <Text
                          style={{
                            margin: 5,
                            color: '#D9DD6B',
                            fontWeight: 'bold',
                          }}>
                          Open Bidding
                        </Text>
                        <Text>{data.nama_jenis_paket}</Text>
                        {data.persentase_yang_ditetapkan > 0 ? (
                          <View>
                            {data.jumlah_sisa_bayar_kontrak_open_bidding ==
                            0 ? (
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(
                                  data.anggaran_yang_ditetapkan -
                                    data.anggaran_yang_ditetapkan *
                                      data.persentase_yang_ditetapkan,
                                  {
                                    separator: ',',
                                    prefix: 'Rp ',
                                    precision: 2,
                                    delimiter: '.',
                                    signPosition: 'beforePrefix',
                                  },
                                )}{' '}
                                -{' '}
                                {`(${
                                  100 - data.persentase_yang_ditetapkan * 100
                                } %) `}{' '}
                                - Down Payment
                              </Text>
                            ) : (
                              <Text style={ThePaymentLists.txt}>
                                {formatNumber(
                                  data.jumlah_pembayaran_kontrak_open_bidding,
                                  {
                                    separator: ',',
                                    prefix: 'Rp ',
                                    precision: 2,
                                    delimiter: '.',
                                    signPosition: 'beforePrefix',
                                  },
                                )}{' '}
                                -{' '}
                                {`(${
                                  data.persentase_yang_ditetapkan * 100
                                } %) `}{' '}
                                - Down Payment
                              </Text>
                            )}
                          </View>
                        ) : (
                          <View>
                            <Text style={ThePaymentLists.txt}>
                              {formatNumber(data.anggaran_yang_ditetapkan, {
                                separator: ',',
                                prefix: 'Rp ',
                                precision: 2,
                                delimiter: '.',
                                signPosition: 'beforePrefix',
                              })}{' '}
                              -Full Payment
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </List.Accordion>
          <Badge style={{right: 23, bottom: 80}}>
            {confirmed.length + confirmedOB.length}
          </Badge>
        </List.AccordionGroup>
      </View>
    </ScrollView>
  );
}

const BelumBayarStackScreen = () => (
  <BelumBayarStack.Navigator screenOptions={{headerShown: false}}>
    <BelumBayarStack.Screen name="BelumBayar" component={BelumBayar} />
  </BelumBayarStack.Navigator>
);

export default BelumBayarStackScreen;
