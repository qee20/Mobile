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
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {PreviewStyle} from '../../../../../JOBKU RESC/componentStyles';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Client from '../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-elements';
import {IconButton, Colors, Button, Divider} from 'react-native-paper';
import {formatNumber} from 'react-native-currency-input';

const PreviewBidding = ({route, navigation}) => {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);
  const {previewData} = route.params;

  const [daftarPembiding, setDaftarPembiding] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const tetapkanFreelancer = data => {
    Alert.alert(
      'Pilih Freelancer',
      `Pilih ${data.nama_freelancer} sebagai freelancer anda untuk menyelasaikan proyek ini? Pastikan Anda sudah memeriksa proposalnya`,
      [
        {
          text: 'Pilih',
          onPress: () =>
            navigation.navigate('CheckoutProposal', {
              previewData,
              data,
            }),
        },
      ],
    );
  };

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/pembiding', {
        kode_open_bidding: previewData.kode_open_bidding,
      }).then(response => {
        console.log('pembiding', response.data.result);
        setDaftarPembiding(response.data.result);
        setLoading(false);
      });
    });
  }, []);

  return (
    <ScrollView>
      <View style={PreviewStyle.headerSmall}>
        <Text style={{fontSize: 10}}>
          Kode Project : {previewData.kode_open_bidding}
        </Text>
        <Text style={{fontSize: 10}}>
          {moment(previewData.tanggal).format('dddd, DD MMMM YYYY')}
        </Text>
      </View>
      <View style={PreviewStyle.mainContent}>
        <Text style={PreviewStyle.judul}>{previewData.judul_open_bidding}</Text>
        <Image
          resizeMode="cover"
          source={{uri: previewData.gambar}}
          style={PreviewStyle.poster}
        />
        <Text style={PreviewStyle.deskripsi}>{previewData.deskripsi}</Text>
      </View>
      <View style={PreviewStyle.info}>
        <View style={PreviewStyle.infoItem}>
          <Icon name="user-plus" size={30} />
        </View>
        <View style={PreviewStyle.infoItem}>
          <Icon name="comment-dollar" size={30} />
          <Text style={{fontSize: 17}}>{`${formatNumber(previewData.minimal, {
            separator: ',',
            prefix: 'Rp ',
            precision: 0,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })} - ${formatNumber(previewData.maksimal, {
            separator: ',',
            prefix: 'Rp ',
            precision: 0,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })}`}</Text>
        </View>
        <View style={PreviewStyle.infoItem}>
          <Icon name="calendar-alt" size={30} />
          <Text style={{fontSize: 17}}>
            {moment(previewData.waktu_tenggat_bidding).format('DD MMMM')} -{' '}
            {moment(previewData.waktu_tenggat_bidding)
              .add(previewData.durasi_pengerjaan, 'days')
              .format('DD MMMM')}{' '}
            / {previewData.durasi_pengerjaan} Hari
          </Text>
        </View>
        <View style={PreviewStyle.infoItem}>
          <Icon name="hourglass-end" size={30} />
          <Text style={{fontSize: 17}}>
            Akan ditutup{' '}
            {moment(previewData.waktu_tenggat_bidding).endOf('day').fromNow()}
          </Text>
        </View>
      </View>
      <View>
        <Divider />
        <Text>Daftar Pembidding</Text>
        {daftarPembiding.map(data => {
          return (
            <View key={data.id_proposal}>
              <Divider style={{height: 2}} />
              <View style={PreviewStyle.Pembidding}>
                <View style={PreviewStyle.InfoPembiding}>
                  <Avatar
                    size="medium"
                    rounded
                    source={{uri: data.fotoProfil}}
                    containerStyle={PreviewStyle.profileIMG}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ToFreelancerProfile', {
                        kodeFreelancer: data.kode_freelancer,
                      })
                    }
                    style={PreviewStyle.InfoPembidingChild}>
                    <Text>{data.nama_freelancer}</Text>
                  </TouchableOpacity>
                </View>
                <View style={PreviewStyle.infoBidingan}>
                  <Text style={PreviewStyle.bidIt}>
                    {formatNumber(data.anggaran_yang_ditetapkan, {
                      separator: ',',
                      prefix: 'Rp ',
                      precision: 0,
                      delimiter: '.',
                      signPosition: 'beforePrefix',
                    })}{' '}
                    Pengerjaan {data.durasi_pengerjaan_ditetapkan} hari
                  </Text>
                </View>
                <Text
                  style={{margin: 5}}
                  numberOfLines={4}
                  ellipsizeMode="tail">
                  {data.keterangan_proposal}
                </Text>
                <View style={PreviewStyle.Footer}>
                  <Text style={{marginTop: 13, marginLeft: 5}}>
                    {moment(data.tanggal_proposal).startOf('hour').fromNow()}
                  </Text>
                  <View style={PreviewStyle.ButtonOp}>
                    <IconButton
                      icon="chat"
                      color={Colors.blueA100}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                    <Button
                      onPress={() => tetapkanFreelancer(data)}
                      mode="contained"
                      color={Colors.orange500}>
                      Tetapkan
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PreviewBidding;
