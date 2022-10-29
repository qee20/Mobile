import React from 'react';
import {View, Text, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Client from '../../../mysql api/client';
import moment from 'moment';

const Gamifikasi = ({navigation, route}) => {
  const [isiFeedback, setIsiFeedback] = React.useState('');

  const {dataPr} = route.params;

  const kirimFeedback = () => {
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');

    Client.post('/userFeedback', {
      tanggal_feedback: tanggalskg,
      kode_pengguna: dataPr.kode_pengguna,
      feedback_pengguna: isiFeedback,
      penilaian: ratings,
    }).then(response => {
      console.log(response);
      Alert.alert('Terimakasih', 'Feedback anda sudah terkirim', [
        {
          text: 'Kembali ke Home',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    });
  };

  const [ratings, setRating] = React.useState(1);
  return (
    <View>
      <Text
        style={{fontSize: 20, color: '#595260', fontWeight: 'bold', margin: 5}}>
        Bagaimana menurut anda tentang aplikasi JOBKU ?
      </Text>
      <TextInput
        value={isiFeedback}
        onChangeText={value => setIsiFeedback(value)}
        label="Masukkan Disini"
        mode="outlined"
        style={{margin: 10}}
        clearButtonMode="always"
        multiline={true}
      />
      <Text
        style={{fontSize: 20, color: '#595260', fontWeight: 'bold', margin: 5}}>
        Berikan penilaian anda terhadap usabilitas aplikasi JOBKU
      </Text>
      <AirbnbRating
        count={5}
        reviews={['Buruk', 'Kurang', 'Biasa Aja', 'Cukup', 'Mantap']}
        defaultRating={ratings}
        size={20}
        selectedColor="#7C83FD"
        reviewColor="black"
        onFinishRating={rating => setRating(rating)}
      />
      <Button onPress={kirimFeedback} style={{marginTop: 20}} mode="contained">
        Submit
      </Button>
    </View>
  );
};

export default Gamifikasi;
