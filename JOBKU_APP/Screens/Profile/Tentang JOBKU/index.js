import React from 'react';
import {View, Text, Image} from 'react-native';

const TentangJOBKU = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{alignSelf: 'center'}}>
        <Text style={{marginTop: 10, textAlign: 'center', fontSize: 20}}>
          JOBKU
        </Text>
        <Text style={{textAlign: 'center'}}>Versi 1.0.0</Text>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../../../assets/JOBKU-LOGO.png')}
        />
        <Text style={{textAlign: 'center'}}> © 2021 JOBKU</Text>
      </View>
    </View>
  );
};

export default TentangJOBKU;
