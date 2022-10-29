import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {Preview$bid} from '../../../../JOBKU RESC/componentStyles';
import {Divider, Button, Colors, Chip, List} from 'react-native-paper';
import moment from 'moment';
import Client from '../../../../mysql api/client';
import {formatNumber} from 'react-native-currency-input';
import {ContextForAuth} from '../../../../Context/Context';
import Icon from 'react-native-vector-icons/Ionicons';

const PreviewBidding = ({navigation, route}) => {
  const {dataShow} = route.params;
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [pembiding, setPembiding] = React.useState([]);
  const [Skills, setSkills] = React.useState([]);
  const [jlhpbd, setjlhpbd, setstate] = React.useState(0);
  const [boleh, setBoleh] = React.useState(false);
  const [namaPerusahaan, setNamaPerusahaan] = React.useState('');

  const makeAbid = () => {
    Client.post('/cekAnomBidder', {
      kode_open_bidding: dataShow.kode_open_bidding,
      kode_freelancer: passProfileData.kode_freelancer,
    })
      .then(response => {
        console.log(response.data.action);
        if (response.data.action == 'deny') {
          Alert.alert(
            'Info',
            'Anda telah melakukan bid pada penawaran ini, proses seleksi sedang berjalan',
            [{text: 'OK', onPress: () => navigation.navigate('Home')}],
          );
        } else {
          navigation.navigate('BiddingIt', {dataShow});
        }
      })
      .catch(error => console.log(error));
  };

  React.useEffect(async () => {
    await Client.post('/pembiding', {
      kode_open_bidding: dataShow.kode_open_bidding,
    }).then(response => {
      console.log(response.data.result);
      setPembiding(response.data.result);
      Client.post('/jumlahpembiding', {
        kode_open_bidding: dataShow.kode_open_bidding,
      }).then(response => {
        console.log(response.data.result[0].jumlah_pembiding);
        Client.post('/cekAnomBidder', {
          kode_open_bidding: dataShow.kode_open_bidding,
          kode_freelancer: passProfileData.kode_freelancer,
        })
          .then(response => {
            console.log(response.data.action);
            Client.post('/OpenBidding/Skills', {
              kode_open_bidding: dataShow.kode_open_bidding,
            }).then(response => {
              console.log(response.data);
              Client.post('/client/ProfilPerusahaan', {
                kode_client: dataShow.kode_client,
              }).then(response => {
                console.log('nama company', response.data[0].nama_perusahaan);
                setNamaPerusahaan(response.data[0].nama_perusahaan);
              });
              setSkills(response.data);
            });
            if (response.data.action == 'deny') {
              setBoleh(true);
            } else {
              setBoleh(false);
            }
          })
          .catch(error => console.log(error));
        setjlhpbd(response.data.result[0].jumlah_pembiding);
      });
    });
  }, []);

  return (
    <ScrollView>
      <ImageBackground
        resizeMode="cover"
        source={{uri: dataShow.gambar}}
        style={Preview$bid.bidDisplay}>
        <View style={Preview$bid.fade}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              margin: 5,
            }}>
            {dataShow.judul_open_bidding}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{alignSelf: 'center'}}
              name="person-outline"
              size={20}
              color="orange"
            />
            <Text
              style={{
                color: Colors.amber600,
                fontSize: 15,
                fontWeight: 'bold',
                margin: 5,
              }}>
              {dataShow.nama_client}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{alignSelf: 'center'}}
              name="business-outline"
              size={20}
              color="orange"
            />
            <Text
              style={{
                color: Colors.amber600,
                fontSize: 15,
                fontWeight: 'bold',
                margin: 5,
              }}>
              {namaPerusahaan}
            </Text>
          </View>
          <Text style={{color: Colors.cyan400, fontSize: 13, margin: 5}}>
            {moment(dataShow.tanggal_posting_OB).format(
              'dddd, DD MMMM YYYY | HH:mm',
            )}
          </Text>
          <Text
            style={{
              color: Colors.white,
              fontSize: 15,
              fontWeight: 'bold',
              margin: 5,
            }}>
            Deskripsi
          </Text>
          <Divider
            style={{height: 2, backgroundColor: Colors.orange300, width: '60%'}}
          />
          <Text style={{color: 'white', fontSize: 15, margin: 5}}>
            {dataShow.deskripsi}
          </Text>
          <Text
            style={{
              color: Colors.white,
              fontSize: 15,
              fontWeight: 'bold',
              margin: 5,
            }}>
            Interval pelaporan progress
          </Text>
          <Divider
            style={{height: 2, backgroundColor: Colors.orange300, width: '60%'}}
          />
          <Text style={{color: 'white', fontSize: 15, margin: 5}}>
            {dataShow.milestoneInterval}
          </Text>
          <View style={Preview$bid.detailBid}>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                Fee
              </Text>
              <Divider style={{height: 2, backgroundColor: 'yellow'}} />
              <Text style={{color: 'white'}}>
                Kisaran :{' '}
                {`${formatNumber(dataShow.minimal, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 0,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })} - ${formatNumber(dataShow.maksimal, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 0,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })}`}
              </Text>
            </View>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                Jangka Waktu
              </Text>
              <Divider style={{height: 2, backgroundColor: 'yellow'}} />
              <Text style={{color: 'white'}}>
                Lama Pengerjaan : {dataShow.durasi_pengerjaan} Hari
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: Colors.white,
              fontSize: 15,
              fontWeight: 'bold',
              margin: 5,
            }}>
            Spesifikasi kemampuan yang dibutuhkan
          </Text>
          <Divider
            style={{height: 2, backgroundColor: Colors.orange300, width: '60%'}}
          />
          <Text style={{color: 'white', fontSize: 15, margin: 5}}>
            {Skills.map(data => {
              return (
                <View key={data.id}>
                  <Chip
                    style={{margin: 5}}
                    icon="tag"
                    onPress={() => console.log('Pressed')}>
                    {data.skill_tag}
                  </Chip>
                </View>
              );
            })}
          </Text>
          <Button
            disabled={boleh}
            color="yellow"
            mode="contained"
            style={{margin: 5}}
            onPress={makeAbid}>
            Lakukan Tawaran
          </Button>
        </View>
      </ImageBackground>
      <Text style={{margin: 5}}>Jumlah yang sudah menawarkan [{jlhpbd}]</Text>
      <View>
        {pembiding.map(freelancer => {
          return (
            <View key={freelancer.kode_freelancer} style={Preview$bid.pelamar}>
              <View style={{flex: 1, alignSelf: 'center'}}>
                <Image
                  resizeMode="cover"
                  source={{uri: freelancer.fotoProfil}}
                  style={{width: 50, height: 50, borderRadius: 30}}
                />
              </View>
              <View style={{flex: 2, alignSelf: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {freelancer.nama_freelancer}
                </Text>
                <Text>⭐⭐⭐⭐⭐</Text>
              </View>

              <Text style={{flex: 1, alignSelf: 'center'}}>
                {formatNumber(freelancer.anggaran_yang_ditetapkan, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 0,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })}{' '}
                dalam {freelancer.durasi_pengerjaan_ditetapkan} hari
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PreviewBidding;
