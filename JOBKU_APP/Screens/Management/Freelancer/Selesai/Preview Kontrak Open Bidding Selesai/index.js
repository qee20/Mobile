import React from 'react';
import {View, Text} from 'react-native';
import Client from '../../../../../mysql api/client';
import moment from 'moment';
import {Button, Divider, Headline, TextInput} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';
import StarRating from 'react-native-star-rating';

const ReviewClient = ({navigation, route}) => {
  const {kodekontrak, client, dp, namapry, harga} = route.params;

  const [keterangan, setKeterangan] = React.useState('');
  const [milesTone, setMilestone] = React.useState([]);
  const [ulasanCheck, setUlasanCheck] = React.useState([]);
  const [ratingF, setRatingF] = React.useState(3.5);
  const [textUlasan, setTextUlasan] = React.useState('');

  const getmilestone = () => {
    Client.post('/getLastOBProgress', {
      kode_kontrak_OB: kodekontrak,
    }).then(response => {
      console.log(response.data.result);
      setMilestone(response.data.result);
      Client.post('/ulasanOB', {
        kode_kontrak_OB: kodekontrak,
      }).then(response => {
        console.log(response.data.result);
        setUlasanCheck(response.data.result);
      });
    });
  };

  React.useEffect(async () => {
    getmilestone();
  }, []);

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text>Nama Proyek</Text>
          <Text>Client</Text>
          <Text>Anggaran</Text>
        </View>
        <View style={{flex: 2}}>
          <Text>{namapry}</Text>
          <Text>{client}</Text>
          <Text>
            {' '}
            {formatNumber(harga, {
              separator: ',',
              prefix: 'Rp ',
              precision: 0,
              delimiter: '.',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <Button
          style={{flex: 1, alignSelf: 'center'}}
          mode="contained"
          color="red"
          icon="information"
          labelStyle={{fontSize: 15}}>
          Laporkan Client ?
        </Button>
      </View>
      <Divider style={{marginTop: 10, height: 2}} />
      <Headline style={{textAlign: 'center', marginTop: 30}}>
        Milestone Pengerjaan
      </Headline>
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
      {ulasanCheck.length > 0 ? (
        <View>
          <StarRating
            fullStarColor="green"
            halfStarColor="green"
            emptyStarColor="green"
            disabled={true}
            maxStars={5}
            starSize={20}
            starStyle={{margin: 30}}
            rating={ulasanCheck[0].jumlah_bintang_jasa}
            selectedStar={rating => setRatingF(rating)}
          />
          <TextInput
            editable={false}
            label="Anda telah mengirim ulasan"
            clearButtonMode="while-editing"
            mode="outlined"
            multiline={true}
            value={ulasanCheck[0].ulasan_penyelesaian_permintaan_jasa}
          />
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
            clearButtonMode="while-editing"
            mode="outlined"
            multiline={true}
            value={textUlasan}
            placeholder="Client Belum memberikan ulasan"
            editable={false}
            onChangeText={value => {
              setTextUlasan(value);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewClient;
