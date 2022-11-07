import React from 'react';
import {View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {ContextForAuth} from '../../Context/Context';
import Client from '../../mysql api/client';
import {Button, RadioButton} from 'react-native-paper';

const Choose = ({route, navigation}) => {
  const [choiceIndex, setChoiceIndex] = React.useState(0);

  const CheckAccountFreelancer = async () => {
    Client.post('/getFreelancerdata', {
      kode_pengguna: state.userId,
    })
      .then(response => {
        if (!response.data.auth) {
          Alert.alert('Pemeriksaan Akun', response.data.message, [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('Freelancer_Form', {
                  urlImage:
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.OlnxO753VRgHKDLLDzCKoAHaHw%26pid%3DApi&f=1',
                }),
            },
          ]);
        } else {
          let usrc;
          usrc = 'Freelancer';
          sendInfo(usrc);
        }
      })
      .catch(error => console.log(error));
  };

  const CheckAccountClient = () => {
    Client.post('/getClientdata', {
      kode_pengguna: state.userId,
    })
      .then(response => {
        if (!response.data.auth) {
          Alert.alert('Pemeriksaan Akun', response.data.message, [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('Client_Form', {
                  urlImage:
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.OlnxO753VRgHKDLLDzCKoAHaHw%26pid%3DApi&f=1',
                }),
            },
          ]);
        } else {
          let usrc;
          usrc = 'Client';
          sendInfo(usrc);
        }
      })
      .catch(error => console.log(error));
  };

  const {state, sendInfo, setUserChoice, userChoice} =
    React.useContext(ContextForAuth);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flex: 1}}>
        {choiceIndex == 1 ? (
          <View style={{margin: 5}}>
            <Text>Sebagai Freelancer : </Text>
            <Text>1. Anda dapat membuat penawaran jasa</Text>
            <Text>2. Anda dapat membuat proposal untuk Open Bidding</Text>
            <Text>
              3. Anda akan menerima bayaran pada setiap penyelesaian proyek
            </Text>
            <Text>4. Anda akan menerima slip gaji pada setiap bulan</Text>
          </View>
        ) : choiceIndex == 2 ? (
          <View style={{margin: 5}}>
            <Text>Sebagai Client : </Text>
            <Text>1. Anda dapat mencari jasa freelancer</Text>
            <Text>2. Anda dapat melakukan Open Bidding</Text>
            <Text>3. Anda dapat melakukan pembayaran secara Down-Payment*</Text>
          </View>
        ) : (
          <View style={{margin: 5}}>
            <Text>Silahkan Pilih Peran</Text>
          </View>
        )}
      </View>
      <View style={{flex: 1}}>
        <RadioButton.Group
          onValueChange={value => setChoiceIndex(value)}
          value={choiceIndex}>
          <RadioButton.Item
            style={{
              margin: 5,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'blue',
            }}
            color="blue"
            mode="ios"
            label="Freelancer"
            labelStyle={{color: 'blue'}}
            value={1}
          />
          <RadioButton.Item
            style={{
              margin: 5,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'blue',
            }}
            labelStyle={{color: 'blue'}}
            color="blue"
            mode="ios"
            label="Client"
            value={2}
          />
        </RadioButton.Group>
      </View>
      <View style={{flex: 1}}>
        {choiceIndex == 1 ? (
          <Button mode="outlined" onPress={CheckAccountFreelancer}>
            Lanjutkan Sebagai Freelancer
          </Button>
        ) : choiceIndex == 2 ? (
          <Button mode="outlined" onPress={CheckAccountClient}>
            Lanjutkan Sebagai Client
          </Button>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default Choose;
