import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  FlatList,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  PreviewJasa,
  PreviewStyle,
} from '../../../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-elements';
import {IconButton, Colors, Divider} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';

const Payment = ({route, navigation}) => {
  const {kodeKontraOB, previewData, data, persen, jp, kodebyr, jtb} =
    route.params;

  React.useEffect(async () => {
    console.log('Prev Data', previewData);
    console.log('Freelancer Data', data);
  }, []);

  return (
    <View>
      <Text>Kode Pembayaran : {kodebyr}</Text>
      <Text style={{textAlign: 'center', margin: 5}}>Nomor Rekening</Text>
      <Text
        style={{
          textAlign: 'center',
          margin: 5,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        532 - 45687 - 09889
      </Text>
      <Text
        style={{
          textAlign: 'center',
          margin: 5,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        JOBKU - BRI
      </Text>
      <Text style={{textAlign: 'center'}}>Jumlah yang harus dibayarkan</Text>
      {jp == 0 ? (
        <Text style={{textAlign: 'center'}}>
          {formatNumber(data.anggaran_yang_ditetapkan, {
            separator: ',',
            prefix: 'Rp ',
            precision: 0,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })}
        </Text>
      ) : (
        <Text style={{textAlign: 'center'}}>
          {formatNumber(data.anggaran_yang_ditetapkan * persen, {
            separator: ',',
            prefix: 'Rp ',
            precision: 0,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })}
        </Text>
      )}
      <Text style={{fontSize: 20, margin: 5}}>
        Segera lakukan pembayaran sesuai jumlah tagihan diatas dan sebelum batas
        waktu yang ditentukan{' '}
      </Text>
      <Button
        title="Bayar Sekarang"
        onPress={() =>
          navigation.navigate('KirimBuktiTF', {
            previewData,
            data,
            persen,
            jp,
            kodebyr,
            jtb,
            urlImage: '',
            kodeKontraOB,
          })
        }
      />
      <Button title="Batal" />
    </View>
  );
};

export default Payment;
