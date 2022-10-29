import React from 'react';
import {View, Text, Button, Alert, ScrollView, Image} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import Client from '../../../../../../mysql api/client';
import moment from 'moment';
import {formatNumber} from 'react-native-currency-input';
import {Divider} from 'react-native-paper';
import {ContextForAuth} from '../../../../../../Context/Context';

const Execute = ({navigation, route}) => {
  const {
    kode_pembayaran_jasa,
    kodekontrak,
    harga,
    downpayment,
    dp,
    sdp,
    persentase,
    tglktrk,
    jenispaket,
    namapry,
    subkategori,
    nama_client,
    waktu_pembayaran,
    tanggal_kontrak_jasa,
    status_pembayaran_jasa,
    kodeclient,
    urlImage,
    namagbr,
  } = route.params;

  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [keterangan, setKeterangan] = React.useState('');
  const [milesTone, setMilestone] = React.useState([]);
  const [keteranganOB, setKeteranganOB] = React.useState('');
  const [milesToneOB, setMilestoneOB] = React.useState([]);
  const [linkFile, setLink] = React.useState('');

  const Confirm = () => {
    Alert.alert(
      'Info',
      'Apakah anda yakin untuk menetapkan kontrak ini sudah selesai? Pastikan anda sudah memeriksa detail dan pembayaran kontrak pada halaman sebelumnya.',
      [{text: 'Ya', onPress: () => updateKontrak()}],
      {cancelable: true},
    );
  };

  const updateKontrak = async () => {
    var tanggalskg = moment(Date.now())
      .utcOffset('+07:00')
      .format('YYYY-MM-DD HH:mm:ss');

    var msgs = `${passProfileData.nama_freelancer} telah menyelesaikan proyeknya pada proyek ${namapry}`;

    await Client.put(`/updateKontrakJasa/${kodekontrak}`, {
      status_kontrak: 3,
      kodekontrak: kodekontrak,
    }).then(response => {
      console.log(response);
      Client.post('/pushNotification/Client', {
        kode_client: kodeclient,
        tanggal_notifikasi_client: tanggalskg,
        jenis_notifikasi_client: 4,
        keterangan_notifikasi_client: msgs,
      }).then(response => {
        console.log(response);
        Alert.alert(
          'Info',
          'Status proyek telah berubah menjadi selesai, pembayaran kontrak akan diteruskan pada akun anda.',
          [{text: 'OK', onPress: () => navigation.navigate('Selesai')}],
          {cancelable: true},
        );
      });
    });
  };

  const tambahMilestone = () => {
    var tanggalskg = moment(Date.now())
      .utcOffset('+07:00')
      .format('YYYY-MM-DD HH:mm:ss');

    var msgs = `${passProfileData.nama_freelancer} menambahkan milestone pada proyek ${namapry}`;

    Client.post('/addMilestoneJasa', {
      kode_kontrak_projek_jasa: kodekontrak,
      tanggal: tanggalskg,
      keterangan: keterangan,
      foto_progres: urlImage,
      link_file: linkFile,
    }).then(response => {
      console.log(response);
      Client.post('/pushNotification/Client', {
        kode_client: kodeclient,
        tanggal_notifikasi_client: tanggalskg,
        jenis_notifikasi_client: 3,
        keterangan_notifikasi_client: msgs,
      }).then(response => {
        console.log(response);
      });
      getmilestone();
      setKeterangan('');
    });
  };

  const getmilestone = async () => {
    await Client.post('/getLastMilestone', {
      kode_kontrak_jasa: kodekontrak,
    }).then(response => {
      console.log(response.data.result);
      setMilestone(response.data.result);
    });
  };

  React.useEffect(async () => {
    getmilestone();
  }, []);

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', margin: 5, padding: 5}}>
        <View style={{flex: 1}}>
          <Text>Nama Proyek</Text>
          <Text>Client</Text>
          <Text>Anggaran</Text>
        </View>
        <View style={{flex: 2}}>
          <Text>{namapry}</Text>
          <Text>{nama_client}</Text>
          <Text>
            {formatNumber(harga, {
              separator: ',',
              prefix: 'Rp ',
              precision: 2,
              delimiter: '.',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Button
            onPress={() => navigation.navigate('LaporPengguna', {kodeclient})}
            title="Laporkan Client"
          />
        </View>
      </View>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 20}}>
        Milestone Proyek
      </Text>
      <View style={{justifyContent: 'center'}}>
        <TextInput
          multiline={true}
          value={keterangan}
          onChangeText={value => {
            setKeterangan(value);
          }}
          label="Input Milestone"
          style={{margin: 5}}
          mode="outlined"
        />
        <Divider style={{height: 2}} />

        <TextInput
          style={{margin: 10}}
          mode="outlined"
          multiline={true}
          label="Masukkan Link File atau gambar"
          value={linkFile}
          onChangeText={value => {
            setLink(value);
          }}
        />
        <Text style={{margin: 10, textAlign: 'center'}}>{namagbr}</Text>
        <View style={{marginTop: 10, margin: 10}}>
          <Button
            onPress={() =>
              navigation.navigate('JOBKU Image User', {
                screenSource: 'KerjakanJasa',
                userID: passProfileData.kode_pengguna,
              })
            }
            title="Pilih Gambar"
          />
        </View>

        <View style={{marginTop: 30, margin: 10}}>
          <Button
            title="Tambah Progres"
            style={{alignSelf: 'center', borderWidth: 1}}
            icon="plus"
            size={20}
            onPress={tambahMilestone}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          margin: 5,
        }}>
        <View>
          {milesTone.map(track => {
            return (
              <View
                style={{
                  margin: 5,
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                key={track.id}>
                <Text>
                  {moment(track.waktu_milestonejasa).format(
                    '⏳ dddd, HH:mm DD MMMM',
                  )}
                </Text>
                <Text>{track.keterangan_milestone}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{marginTop: 100, margin: 10}}>
        <Button title="Selesai" onPress={Confirm} />
      </View>

      <View style={{marginTop: 10}}></View>
    </ScrollView>
  );
};

export default Execute;
