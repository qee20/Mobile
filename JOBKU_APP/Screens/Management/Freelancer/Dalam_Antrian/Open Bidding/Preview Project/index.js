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
    status_pembayaran_open_bidding,
    pembayaranyangditerima,
    kode_bayar_kontrak,
    kodekontrak,
    harga,
    persentase,
    tglktrk,
    jenispaket,
    namapry,
    subkategori,
    nama_client,
    tanggal_kontrak_jasa,
    waktu_pembayaran,
    kodeclient,
  } = route.params;

  const [trxDetail, setTrxDetail] = React.useState([]);
  const [trxDetailOB, setTrxDetailOB] = React.useState([]);

  React.useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      Client.post('/OBPaymentdetail', {
        kode_OB: kodekontrak,
      }).then(response => {
        console.log('detailbayar OB', response.data.result);
        setTrxDetailOB(response.data.result);
      });
    });
  }, []);

  return (
    <View>
      {persentase == 0 ? (
        <View style={Verif.container}>
          <View style={Verif.containerL}>
            <Text>Tanggal</Text>
            <Text>Kode Kontrak</Text>
            <Text>Nama Client</Text>
            <Text>Judul Proyek</Text>
            <Text>Sub Kategori</Text>
            <Text>Anggaran</Text>
            <Text>Status Pembayaran</Text>
          </View>
          <View style={Verif.containerR}>
            <Text>{tglktrk}</Text>
            <Text>{kodekontrak}</Text>
            <Text>{nama_client}</Text>
            <Text>{namapry}</Text>
            <Text>{subkategori}</Text>
            <Text>
              {formatNumber(harga, {
                separator: ',',
                prefix: 'Rp ',
                precision: 2,
                delimiter: '.',
                signPosition: 'beforePrefix',
              })}
            </Text>
            <Text>{status_pembayaran_open_bidding}</Text>
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
              <Text>Anggarant</Text>
              <Text>Jenis Pembayaran</Text>
              <Text>Persentase DownPayment</Text>
            </View>
            <View style={Verif.containerR}>
              <Text>{tglktrk}</Text>
              <Text>{kodekontrak}</Text>
              <Text>{nama_client}</Text>
              <Text>{namapry}</Text>
              <Text>{subkategori}</Text>
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
          {trxDetailOB.map((data, index) => {
            return (
              <View key={index}>
                <Text>Pembayaran {index + 1}</Text>
                <View style={Verif.container}>
                  <View style={Verif.containerL}>
                    <Text>Tanggal Pembayaran</Text>
                    <Text>Jumlah Pembayaran</Text>
                    <Text>Sisa Pembayaran</Text>
                    <Text style={{fontWeight: 'bold'}}>Status Pembayaran</Text>
                  </View>
                  <View style={Verif.containerR}>
                    <Text>
                      {moment(
                        data.waktu_detail_pembayaran_kontrak_open_bidding,
                      ).format('HH:mm DD-MM-YYYY')}
                    </Text>
                    <Text>
                      {formatNumber(
                        data.jumlah_pembayaran_kontrak_open_bidding,
                        {
                          separator: ',',
                          prefix: 'Rp ',
                          precision: 2,
                          delimiter: '.',
                          signPosition: 'beforePrefix',
                        },
                      )}
                    </Text>
                    <Text>
                      {formatNumber(
                        data.jumlah_sisa_bayar_kontrak_open_bidding,
                        {
                          separator: ',',
                          prefix: 'Rp ',
                          precision: 2,
                          delimiter: '.',
                          signPosition: 'beforePrefix',
                        },
                      )}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {data.status_konfirmasi_pembayaran_open_bidding}
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
            navigation.navigate('KerjakanOpenBidding', {
              kode_bayar_kontrak,
              kodekontrak,
              harga,
              pembayaranyangditerima,
              persentase,
              tglktrk,
              namapry,
              subkategori,
              nama_client,
              waktu_pembayaran,
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
