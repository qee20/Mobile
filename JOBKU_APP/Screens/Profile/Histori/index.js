import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Pendingtrx, FinisedProject} from '../../../JOBKU RESC/componentStyles';
import Client from '../../../mysql api/client';
import {ContextForAuth} from '../../../Context/Context';
import moment from 'moment';
import {formatNumber} from 'react-native-currency-input';
import {List} from 'react-native-paper';
import {Card, Title, Paragraph} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Histori = ({navigation}) => {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);

  const [trx, setTRX] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Client.post('/trxHistory', {
      kode_freelancer: passProfileData.kode_freelancer,
    }).then(response => {
      console.log('info trx', response.data.result);
      setTRX(response.data.result);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/trxHistory', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('info trx', response.data.result);
        setTRX(response.data.result);
      });
    });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {trx.map((info, index) => {
        return (
          <Card style={{margin: 5, borderWidth: 1, borderRadius: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Card.Content style={{flex: 1}}>
                <Title style={{fontSize: 15, fontWeight: 'bold'}}>
                  {info.jenis_transaksi}
                </Title>
                <Paragraph>
                  {moment(info.tanggal_transaksi).format('HH:mm , DD MM YYYY')}
                </Paragraph>
              </Card.Content>

              <View style={{alignSelf: 'center', flex: 1}}>
                {info.jenis_transaksi == 'Penarikan Dana' ? (
                  <Text>
                    -{' '}
                    {formatNumber(info.uang_keluar_freelancer, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}
                  </Text>
                ) : (
                  <Text>
                    {' '}
                    +{' '}
                    {formatNumber(info.uang_masuk_freelancer, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}
                  </Text>
                )}
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default Histori;
