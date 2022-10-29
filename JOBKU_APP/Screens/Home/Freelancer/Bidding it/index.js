import React from 'react';
import {View, Alert} from 'react-native';
import {TextInput, Button, Text, Checkbox} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Client from '../../../../mysql api/client';
import CurrencyInput from 'react-native-currency-input';
import {ContextForAuth} from '../../../../Context/Context';
import {formatNumber} from 'react-native-currency-input';
import moment from 'moment';
import {HelperText} from 'react-native-paper';

const Bidding_it = ({route, navigation}) => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);
  const {dataShow} = route.params;
  const [lamaPengerjaan, setLamaPengerjaan] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [dp, setDP] = React.useState(1);
  const [anggaran, setAnggaran] = React.useState();
  const [keterangan, setKeterangan] = React.useState('');

  const pilihanDP = checked => {
    setChecked(!checked);
    if (!checked) {
      setDP(2);
    } else {
      setDP(1);
    }
  };

  const tawarkanBidding = () => {
    var msgs = `${passProfileData.nama_freelancer} menawarkan proposal pada Open Bidding ${dataShow.judul_open_bidding}`;
    var tanggalskg = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm');
    Alert.alert(
      'Info',
      'Penawaran telah berhasil dilakukan ! Silahkan mengunggu persetujuan dari client',
      [{text: 'OK', onPress: () => navigation.navigate('Home')}],
    );
    Client.post('/bidTheProject', {
      kode_open_bidding: dataShow.kode_open_bidding,
      kode_freelancer: passProfileData.kode_freelancer,
      anggaran_yang_ditetapkan: anggaran,
      durasi_pengerjaan_ditetapkan: lamaPengerjaan,
      tanggal_proposal_open_bidding: tanggalskg,
      pembayaran_yang_diterima: dp,
      keterangan_proposal: keterangan,
    }).then(response => {
      console.log(response);
      Client.post('/pushNotification/Client', {
        kode_client: dataShow.kode_client,
        tanggal_notifikasi_client: tanggalskg,
        jenis_notifikasi_client: 2,
        keterangan_notifikasi_client: msgs,
      }).then(response => {
        console.log(response);
      });
    });
  };

  return (
    <View>
      <Text style={{marginLeft: 5}}>Tetapkan Anggaran</Text>
      <CurrencyInput
        placeholder={`${formatNumber(dataShow.minimal, {
          separator: ',',
          prefix: 'Rp ',
          precision: 0,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })} - ${formatNumber(dataShow.maksimal, {
          separator: ',',
          prefix: 'Rp ',
          precision: 0,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })}`}
        style={{fontSize: 25, borderWidth: 1, margin: 10, borderRadius: 10}}
        value={anggaran}
        onChangeValue={setAnggaran}
        prefix="Rp. "
        delimiter="."
        separator="-"
        precision={0}
        onChangeText={value => {
          console.log(value); // $2,310.46
        }}
      />
      <HelperText style={{color: '#5089C6'}} type="info" visible={true}>
        Info : Anggaran yang ditetapkan akan dikenakan biaya penanganan aplikasi
        sebanyak 5%{' '}
        {`(${formatNumber(anggaran * (5 / 100), {
          separator: ',',
          prefix: 'Rp ',
          precision: 0,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })})`}{' '}
        jika proposal anda terpilih
      </HelperText>
      <Text style={{margin: 5}}>
        Tetapkan lama pengerjaan : {lamaPengerjaan} hari
      </Text>
      <Slider
        style={{margin: 5}}
        value={lamaPengerjaan}
        onValueChange={setLamaPengerjaan}
        maximumValue={dataShow.durasi_pengerjaan}
        step={1}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="#000000"
      />
      <TextInput
        style={{margin: 5}}
        multiline={true}
        mode="outlined"
        label="Tambahkan Keterangan"
        value={keterangan}
        onChangeText={value => {
          setKeterangan(value);
        }}
      />
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={{alignSelf: 'center', marginRight: 5}}>
          Terima Pembayaran Down Payment
        </Text>
        <Checkbox
          color="blue"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            pilihanDP(checked);
          }}
        />
      </View>
      <Button onPress={tawarkanBidding}>Tawarkan</Button>
    </View>
  );
};

export default Bidding_it;
