import React from 'react';
import {View, Text, Button} from 'react-native';

const DoneProject = ({navigation, route}) => {
  return (
    <View>
      <Text>Project selesai</Text>
      <Button
        title="Kembali ke Daftar"
        onPress={() => navigation.navigate('MGMT')}
      />
    </View>
  );
};

export default DoneProject;
