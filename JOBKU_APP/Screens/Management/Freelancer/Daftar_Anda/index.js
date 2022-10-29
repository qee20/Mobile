import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  LogBox,
  FlatList,
  Alert,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CompStyle} from '../../../../JOBKU RESC/componentStyles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Button, Card, FAB, Text} from 'react-native-paper';
import Client from '../../../../mysql api/client';
import {ContextForAuth} from '../../../../Context/Context';
import moment from 'moment';

LogBox.ignoreLogs(['Reanimated 2']);

const DaftarAndaStack = createStackNavigator();

const DaftarAnda = ({navigation}) => {
  const {passProfileData, getDataProfile} = useContext(ContextForAuth);

  const [daftarJasa, setDaftarJasa] = useState({});
  const [loading, setLoading] = useState(true);

  const confirmDelete = id => {
    Alert.alert('Daftar Penawaran Jasa', 'Apakah anda yakin untuk menghapus?', [
      {text: 'Ya', onPress: () => deleteDaftarJasa(id)},
      {text: 'Batal', onPress: () => console.log('Hapus Katanya')},
    ]);
  };

  const deleteDaftarJasa = id => {
    let kode_penawaran_jasa;
    kode_penawaran_jasa = id.id;
    console.log(kode_penawaran_jasa);
    Client.delete(`/deletePaketPenawaranJasa/${kode_penawaran_jasa}`)
      .then(response => {
        Client.delete(`/deletePenawaranJasa/${kode_penawaran_jasa}`)
          .then(response => {
            Alert.alert('Info', 'Berhasil Dihapus', [
              {text: 'Ok', onPress: () => navigation.navigate('Daftar Anda')},
            ]);
            console.log(response);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
  ];

  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Text>Belum ada data</Text>
      </View>
    );
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Card style={CompStyle.cardContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PreviewJasa', {penawaran_jasa: item})
        }>
        <Card.Title
          titleStyle={CompStyle.cardTitle}
          title={item.judul_proyek}
          subtitle={moment(item.tanggal).format('dddd, DD MMMM YYYY')}
        />
        <Card.Cover
          style={CompStyle.cardCover}
          source={{uri: item.url_gambar}}
        />
      </TouchableOpacity>
      <Card.Actions style={CompStyle.cardAction}>
        <Button
          style={CompStyle.cardButton}
          icon="square-edit-outline"
          mode="contained"
          onPress={() =>
            navigation.navigate('UpdateDaftarJasa', {
              urlImage: item.url_gambar,
              id: item.kode_penawaran_jasa,
            })
          }
        />
        <Button
          style={CompStyle.cardButton}
          icon="delete"
          mode="contained"
          onPress={() => confirmDelete({id: item.kode_penawaran_jasa})}
        />
      </Card.Actions>
    </Card>
  );

  useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/penawaranJasaFreelancerM', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log(response.data.result);
        setDaftarJasa(response.data.result);
        setLoading(false);
      });
    });
    console.log(daftarJasa);
  }, []);

  if (loading) {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <ActivityIndicator color={'blue'} size="large" />
      </View>
    );
  }

  return (
    <>
      <View>
        {!daftarJasa ? (
          <Text>Belum ada Ada, Silahkan Tambah</Text>
        ) : (
          <View>
            <FlatList
              data={daftarJasa}
              renderItem={renderItem}
              keyExtractor={item => item.kode_penawaran_jasa}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        )}
      </View>
      <FAB
        title="Tambah"
        style={CompStyle.fab}
        icon="plus"
        onPress={() =>
          navigation.navigate('TambahDaftarPenawaranJasa', {urlImage: null})
        }
        color="white"
      />
    </>
  );
};

const DaftarAndaStackScreen = () => (
  <DaftarAndaStack.Navigator>
    <DaftarAndaStack.Screen
      options={{headerShown: false}}
      name="DaftarAnda"
      component={DaftarAnda}
    />
  </DaftarAndaStack.Navigator>
);

export default DaftarAndaStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
0;
