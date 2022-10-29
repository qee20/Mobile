import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import {ContextForAuth} from '../../../Context/Context';
import {createStackNavigator} from '@react-navigation/stack';
import {StylingHeader} from '../../JOBKU RESC/componentStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton, Colors} from 'react-native-paper';
import Client from '../../../mysql api/client';
import moment from 'moment';

const SlipGAji = ({navigation, route}) => {
  const [slipGaji, setSlipGaji] = React.useState([]);
  const {dataPr} = route.params;
  React.useEffect(() => {
    Client.post('/getSlipgaji', {
      kode_freelancer: dataPr.kode_freelancer,
    }).then(response => {
      console.log(response.data);
      setSlipGaji(response.data);
    });
  }, []);

  return (
    <View>
      {slipGaji.map((slip, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              margin: 10,
              padding: 5,
            }}>
            <Text style={{flex: 1, alignSelf: 'center'}}>
              {moment(slip.tanggal_penarikan).format('MMMM YYYY')}
            </Text>

            <Text style={{flex: 1, alignSelf: 'center'}}>
              {slip.status_slip_gaji}
            </Text>
            <IconButton
              icon="open-in-new"
              color={Colors.red500}
              size={20}
              onPress={() => Linking.openURL(slip.file_slip_gaji)}
              style={{marginRight: 5}}
            />
          </View>
        );
      })}
    </View>
  );
};

export default SlipGAji;
