import React from 'react';
import {View, Text, Image, Alert} from 'react-native';
import Client from '../../../../../mysql api/client';
import moment from 'moment';
import {Button, Divider, Headline, TextInput} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';
import StarRating from 'react-native-star-rating';
import {ContextForAuth} from '../../../../../Context/Context';

const ReviewClient = ({navigation, route}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const {data, show} = route.params;
  const [ratingF, setRatingF] = React.useState(3);
  const [keterangan, setKeterangan] = React.useState('');
  const [milesTone, setMilestone] = React.useState([]);
  const [ulasanCheck, setUlasanCheck] = React.useState([]);
  const [textUlasan, setTextUlasan] = React.useState('');
  const [milesToneOB, setMilestoneOB] = React.useState([]);
  const [ulasanCheckOB, setUlasanCheckOB] = React.useState([]);
  const [textUlasanOB, setTextUlasaOB] = React.useState('');
  const [ratingFK, setRatingFK] = React.useState(3);
  var ulasan = '';

  const getmilestone = () => {
    console.log('data kontrak', data);
    if (show == 'JS') {
      Client.post('/getLastMilestone', {
        kode_kontrak_jasa: data.kode_kontrak_jasa,
      }).then(response => {
        Client.post('/ulasanJasa', {
          kode_kontrak_jasa: data.kode_kontrak_jasa,
        }).then(response => {
          console.log('ulas', response.data.result);
          setUlasanCheck(response.data.result[0]);
        });
        console.log(response.data.result);
        setMilestone(response.data.result);
      });
    } else {
      Client.post('/getLastOBProgress', {
        kode_kontrak_OB: data.kode_kontrak_OB,
      }).then(response => {
        Client.post('/ulasanOB', {
          kode_kontrak_OB: data.kode_kontrak_OB,
        }).then(response => {
          console.log('ulas OB', response.data.result);
          setUlasanCheckOB(response.data.result[0]);
        });
        console.log(response.data.result);
        setMilestoneOB(response.data.result);
      });
    }
  };

  const berikanFeedBack = () => {
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');
    if (show == 'JS') {
      Client.post('/givefeedbackJasa', {
        tanggal_ulasan_penawaran_jasa: tanggalskg,
        kode_kontrak_jasa: data.kode_kontrak_jasa,
        kode_client: passProfileData.kode_client,
        ulasan_penyelesaian_permintaan_jasa: textUlasan,
        jumlah_bintang_jasa: ratingF,
      }).then(response => {
        console.log('kasih ulas', response);
        Client.post('/ulasanJasa', {
          kode_kontrak_jasa: data.kode_kontrak_jasa,
        }).then(response => {
          console.log('ulasan', response.data);
          getmilestone();
          setUlasanCheck('yang nol', response.data[0]);
          Alert.alert('Info', 'Terimakasih, feedback  anda sudah terkirim', [
            {
              text: 'OK',
              onPress: () =>
                Client.post('/ulasanJasa', {
                  kode_kontrak_jasa: data.kode_kontrak_jasa,
                }).then(response => {
                  console.log('ulasan', response.data.result);
                  setUlasanCheck(response.data.result[0]);
                }),
            },
          ]);
        });
      });
    } else {
      Client.post('/givefeedbackOB', {
        tanggal_ulasan_diberikan: tanggalskg,
        kode_kontrak_OB: data.kode_kontrak_OB,
        isi_ulasan: textUlasanOB,
        jumlah_rating_bintang: ratingF,
      }).then(response => {
        console.log('kasih ulas OB', response);
        Client.post('/ulasanOB', {
          kode_kontrak_OB: data.kode_kontrak_OB,
        }).then(response => {
          console.log('ulasanOBeff', response.data.result);
          getmilestone();
          setUlasanCheckOB(response.data[0]);
          Alert.alert('Info', 'Terimakasih, feedback  anda sudah terkirim', [
            {
              text: 'OK',
              onPress: () =>
                Client.post('/ulasanOB', {
                  kode_kontrak_OB: data.kode_kontrak_OB,
                }).then(response => {
                  console.log('ulasan', response.data.result);
                  setUlasanCheckOB(response.data.result[0]);
                }),
            },
          ]);
        });
      });
    }
  };

  React.useEffect(async () => {
    getmilestone();
    if (show == 'JS') {
      await Client.post('/ulasanJasa', {
        kode_kontrak_jasa: data.kode_kontrak_jasa,
      }).then(response => {
        console.log('ulasanXX', response.data.result[0]);
        setUlasanCheck(response.data.result[0]);
      });
    } else {
      await Client.post('/ulasanOB', {
        kode_kontrak_OB: data.kode_kontrak_OB,
      }).then(response => {
        console.log('ulasanOB', response);
        setUlasanCheckOB(response.data.result[0]);
      });
    }
  }, []);

  if (show == 'JS') {
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              padding: 5,
              backgroundColor: '#96BAFF',
              borderRadius: 10,
            }}>
            <View style={{flex: 2}}>
              <Image
                source={{uri: data.url_gambar}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
            <View style={{flex: 4, alignSelf: 'center'}}>
              {milesTone ? (
                <Text>Sudah Selesai</Text>
              ) : (
                <Text>Belum Dimulai</Text>
              )}
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {data.judul_proyek}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'space-between',
            }}>
            <Text>No. Kontrak</Text>
            <Text style={{fontWeight: 'bold'}}>{data.kode_kontrak_jasa}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 5,
            }}>
            <View>
              {milesTone.map(track => {
                return (
                  <View key={track.id}>
                    <Text>
                      {moment(track.waktu_milestonejasa).format(
                        '⏳ HH:MM:ss | dddd',
                      )}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View>
              {milesTone.map(track => {
                return (
                  <View key={track.id}>
                    <Text>{track.keterangan_milestone}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        {ulasanCheck ? (
          <View>
            <StarRating
              fullStarColor="green"
              halfStarColor="green"
              emptyStarColor="green"
              disabled={true}
              maxStars={5}
              starSize={20}
              starStyle={{margin: 30}}
              rating={ulasanCheck.jumlah_bintang_jasa}
              selectedStar={rating => setRatingF(rating)}
            />
            <TextInput
              editable={false}
              placeholder={ulasanCheck.ulasan_penyelesaian_permintaan_jasa}
              clearButtonMode="while-editing"
              mode="outlined"
              multiline={true}
              value={textUlasan}
              onChangeText={value => {
                setTextUlasan(value);
              }}
            />
            <Button
              mode="outlined"
              onPress={berikanFeedBack}
              style={{margin: 5}}>
              Kirim
            </Button>
          </View>
        ) : (
          <View>
            <StarRating
              fullStarColor="green"
              halfStarColor="green"
              emptyStarColor="green"
              maxStars={5}
              starSize={20}
              starStyle={{margin: 30}}
              rating={ratingF}
              selectedStar={rating => setRatingF(rating)}
            />
            <TextInput
              label="Silahkan Masukkan Ulasan Anda"
              clearButtonMode="while-editing"
              mode="outlined"
              multiline={true}
              value={textUlasan}
              onChangeText={value => {
                setTextUlasan(value);
              }}
            />
            <Button
              mode="outlined"
              onPress={berikanFeedBack}
              style={{margin: 5}}>
              Kirim
            </Button>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              padding: 5,
              backgroundColor: '#96BAFF',
              borderRadius: 10,
            }}>
            <View style={{flex: 2}}>
              <Image
                source={{uri: data.gambar}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
            <View style={{flex: 4, alignSelf: 'center'}}>
              {milesTone ? (
                <Text>Sudah Selesai</Text>
              ) : (
                <Text>Belum Dimulai</Text>
              )}
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {data.judul_open_bidding}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'space-between',
            }}>
            <Text>No. Kontrak</Text>
            <Text style={{fontWeight: 'bold'}}>{data.kode_kontrak_OB}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 5,
            }}>
            <View>
              {milesToneOB.map(track => {
                return (
                  <View key={track.trackID}>
                    <Text>
                      {moment(track.waktu_milestone_OB).format(
                        '⏳ HH:MM:ss | dddd',
                      )}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View>
              {milesToneOB.map(track => {
                return (
                  <View key={track.trackID}>
                    <Text>{track.keterangan}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        {ulasanCheckOB ? (
          <View>
            <StarRating
              fullStarColor="green"
              halfStarColor="green"
              emptyStarColor="green"
              disabled={true}
              maxStars={5}
              starSize={20}
              starStyle={{margin: 30}}
              rating={ulasanCheckOB.jumlah_rating_bintang}
              selectedStar={rating => setRatingF(rating)}
            />
            <TextInput
              editable={false}
              placeholder={ulasanCheckOB.isi_ulasan}
              clearButtonMode="while-editing"
              mode="outlined"
              multiline={true}
              value={textUlasanOB}
              onChangeText={value => {
                setTextUlasan(value);
              }}
            />
            <Button
              mode="outlined"
              onPress={berikanFeedBack}
              style={{margin: 5}}>
              Kirim
            </Button>
          </View>
        ) : (
          <View>
            <StarRating
              fullStarColor="green"
              halfStarColor="green"
              emptyStarColor="green"
              disabled={true}
              maxStars={5}
              starSize={20}
              starStyle={{margin: 30}}
              rating={ratingF}
              selectedStar={rating => setRatingF(rating)}
            />
            <TextInput
              label="Silahkan Masukkan Ulasan Anda"
              clearButtonMode="while-editing"
              mode="outlined"
              multiline={true}
              value={setTextUlasaOB}
              onChangeText={value => {
                setTextUlasaOB(value);
              }}
            />
            <Button
              mode="outlined"
              onPress={berikanFeedBack}
              style={{margin: 5}}>
              Kirim
            </Button>
          </View>
        )}
      </View>
    );
  }
};

export default ReviewClient;
