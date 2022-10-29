import React from 'react';
import {Button, Text, View, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import {formatNumber} from 'react-native-currency-input';
import {ContextForAuth} from '../../../Context/Context';
import Client from '../../../mysql api/client';
import moment from 'moment';

const Penarikan = ({navigation, route}) => {
  const [jumlahPenarikan, setjumlahPenarikan] = React.useState(0);
  const {dataPr} = route.params;
  const [dataProfil, setDataProfil] = React.useState([]);
  const [WDLog, setWDLog] = React.useState([]);

  const {
    state,
    logOut,
    variabels,
    passProfileData,
    getpassProfileData,
    switchTo,
  } = React.useContext(ContextForAuth);

  const tarikDana = () => {
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
    if (jumlahPenarikan < 20000) {
      Alert.alert('Error', 'Minimal penarikan sebanyak Rp. 20.000', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (jumlahPenarikan > dataProfil.saldo_freelancer) {
      Alert.alert('Error', 'Saldo Tidak Cukup!', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      Client.post('/Withdrawal', {
        kode_freelancer: dataPr.kode_freelancer,
        tanggal_penarikan: tanggalskg,
        jumlah_penarikan: jumlahPenarikan,
      }).then(response => {
        console.log('Tarik sis', response.data);
        Client.post('/myWDHistory', {
          kode_freelancer: dataPr.kode_freelancer,
        }).then(response => {
          console.log('wd log', response.data);
          Alert.alert('Info', 'Berhasil mengirim permintaan penarikan', [
            {text: 'OK', onPress: () => navigation.navigate('Profile')},
          ]);
        });
      });
    }
  };

  React.useEffect(() => {
    Client.post('/retrieveFreelancerInfo', {
      kode_pengguna: state.userId,
    })
      .then(response => {
        console.log('data free', response.data.freelancerData);
        const thisData = response.data.freelancerData;
        Client.post('/myWDHistory', {
          kode_freelancer: dataPr.kode_freelancer,
        }).then(response => {
          console.log('wd log', response.data.result);
          setWDLog(response.data.result);
        });
        setDataProfil(thisData);
        console.log(state.userId);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 20}}>Saldo</Text>
      <Text style={{textAlign: 'center', fontSize: 25}}>
        {formatNumber(dataProfil.saldo_freelancer, {
          separator: ',',
          prefix: 'Rp ',
          precision: 2,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })}
      </Text>
      <Text style={{textAlign: 'center', margin: 5}}>Rekening anda</Text>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 20}}>
        363876359858
      </Text>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 20}}>BRI</Text>
      <Text style={{textAlign: 'center', margin: 5, fontStyle: 'italic'}}>
        Untuk mengubah rekening, silahkan menuju menu ubah profil
      </Text>
      <CurrencyInput
        style={{
          fontSize: 25,
          borderWidth: 1,
          margin: 5,
          borderRadius: 5,
          padding: 5,
        }}
        value={jumlahPenarikan}
        onChangeValue={setjumlahPenarikan}
        prefix="Rp. "
        delimiter="."
        separator="-"
        precision={0}
        onChangeText={value => {
          console.log(value); // $2,310.46
        }}
      />

      <Button title="Tarik" onPress={tarikDana} />
      <View>
        {WDLog.map((WD, index) => {
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
                {moment(WD.tanggal_penarikan).format('HH:mm , DD MM YYYY')}
              </Text>
              <Text style={{flex: 1, alignSelf: 'center', fontWeight: 'bold'}}>
                {formatNumber(WD.jumlah_penarikan, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 0,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })}
              </Text>
              <Text style={{flex: 1, alignSelf: 'center'}}>
                {WD.status_penarikan}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Penarikan;
