import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import axios from 'axios';
import Client from './JOBKU_APP/mysql api/client';

const App = () => {
  const [teks, setteks] = React.useState('');

  const chkfd = () => {
    Client.post('/testFeedBack', {
      input: teks,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <View>
      <Text>App</Text>
      <TextInput onChangeText={setteks} />
      <Button onPress={chkfd} title={'Dodge this!!'} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
