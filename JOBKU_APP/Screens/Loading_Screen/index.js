import React from 'react';
import {View, Button, Text, ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';

const Loading_Screen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('./JOBKU-LOGO.png')}
        style={{width: 326, height: 193}}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default Loading_Screen;
