import React from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Pendingtrx, Verif} from '../../../../../../JOBKU RESC/componentStyles';
import Client from '../../../../../../mysql api/client';
import {ContextForAuth} from '../../../../../../Context/Context';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatNumber} from 'react-native-currency-input';

const PreviewContract = ({navigation, route}) => {
  const {passProfileData, getDataProfile} = React.useContext(ContextForAuth);
  const {
    kodeclient,
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
    tglOBmulai,
    kodekontrakOB,
    terima,
    persen,
    display,
  } = route.params;

  const [trxDetail, setTrxDetail] = React.useState([]);
  const [trxDetailOB, setTrxDetailOB] = React.useState([]);

  React.useEffect(async () => {
    getDataProfile();
    Client.post('/getPaymentDetail', {
      kode_pembayaran_jasa: kode_pembayaran_jasa,
    }).then(response => {
      console.log('detailbayar', response.data.result);
      setTrxDetail(response.data.result);
    });
  }, []);

  return (
    <View>
      {downpayment == 0 ? (
        <View style={Verif.container}>
          <View style={Verif.containerL}>
            <Text>Tanggal</Text>
            <Text>Kode Kontrak</Text>
            <Text>Nama Client</Text>
            <Text>Judul Proyek</Text>
            <Text>Sub Kategori</Text>
            <Text>Paket yang dipilih</Text>
            <Text>Harga</Text>
            <Text>Status Pembayaran</Text>
          </View>
          <View style={Verif.containerR}>
            <Text>
              {moment(tanggal_kontrak_jasa).format('dddd, DD MMMM YYYY')}
            </Text>
            <Text>{kodekontrak}</Text>
            <Text>{nama_client}</Text>
            <Text>{namapry}</Text>
            <Text>{subkategori}</Text>
            <Text>{jenispaket}</Text>
            <Text>
              {formatNumber(harga, {
                separator: ',',
                prefix: 'Rp ',
                precision: 2,
                delimiter: '.',
                signPosition: 'beforePrefix',
              })}
            </Text>
            <Text>{status_pembayaran_jasa}</Text>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
              margin: 5,
            }}>
            <View style={Verif.containerL}>
              <Text>Tanggal Kontrak</Text>
              <Text>Kode Kontrak</Text>
              <Text>Nama Client</Text>
              <Text>Judul Proyek</Text>
              <Text>Sub Kategori</Text>
              <Text>Paket yang dipilih</Text>
              <Text>Harga Paket</Text>
              <Text>Jenis Pembayaran</Text>
              <Text>Persentase DownPayment</Text>
            </View>
            <View style={Verif.containerR}>
              <Text>
                {' '}
                {moment(tanggal_kontrak_jasa).format('dddd, DD MMMM YYYY')}
              </Text>
              <Text>{kodekontrak}</Text>
              <Text>{nama_client}</Text>
              <Text>{namapry}</Text>
              <Text>{subkategori}</Text>
              <Text>{jenispaket}</Text>
              <Text>
                {formatNumber(harga, {
                  separator: ',',
                  prefix: 'Rp ',
                  precision: 2,
                  delimiter: '.',
                  signPosition: 'beforePrefix',
                })}
              </Text>
              <Text>Down Payment</Text>
              <Text>{persentase * 100} %</Text>
            </View>
          </View>
          {trxDetail.map((data, index) => {
            return (
              <View key={index}>
                <Text>Pembayaran {index + 1}</Text>
                <View style={Verif.container}>
                  <View style={Verif.containerL}>
                    <Text>Tanggal Pembayaran</Text>
                    <Text>Jumlah Pembayaran</Text>
                    <Text>Sisa Pembayaran</Text>
                    <Text style={{fontWeight: 'bold'}}>Status Pembayaran</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Status Pembayaran Kontrak
                    </Text>
                  </View>
                  <View style={Verif.containerR}>
                    <Text>
                      {moment(data.tanggal_pembayaran_jasa).format(
                        'HH:mm DD-MM-YYYY',
                      )}
                    </Text>
                    <Text>
                      {formatNumber(data.jumlah_pembayaran, {
                        separator: ',',
                        prefix: 'Rp ',
                        precision: 2,
                        delimiter: '.',
                        signPosition: 'beforePrefix',
                      })}
                    </Text>
                    <Text>
                      {formatNumber(data.jumlah_yang_belum_dibayar, {
                        separator: ',',
                        prefix: 'Rp ',
                        precision: 2,
                        delimiter: '.',
                        signPosition: 'beforePrefix',
                      })}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {data.status_konfirmasi}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {status_pembayaran_jasa}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
      <View>
        <Button
          title="Selesaikan"
          onPress={() =>
            navigation.navigate('KerjakanJasa', {
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
              urlImage: '',
              namagbr: '',
            })
          }
        />
      </View>
    </View>
  );
};

export default PreviewContract;
