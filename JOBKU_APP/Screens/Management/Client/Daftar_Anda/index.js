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

  const [daftarOB, setDaftarOB] = useState({});
  const [loading, setLoading] = useState(true);

  const confirmDelete = id => {
    Alert.alert('Daftar Open Bidding', 'Apakah anda yakin untuk menghapus?', [
      {text: 'Ya', onPress: () => deleteDaftarOB(id)},
      {text: 'Batal', onPress: () => console.log('Hapus Katanya')},
    ]);
  };

  const deleteDaftarOB = id => {
    let kode_open_bidding;
    kode_open_bidding = id.id;
    console.log(kode_open_bidding);
    Client.delete(`/deleteOBSkillTagging/${kode_open_bidding}`)
      .then(response => {
        Client.delete(`/deleteOpenBidding/${kode_open_bidding}`)
          .then(response => {
            Alert.alert('Info', 'Berhasil Dihapus', [
              {text: 'Ok', onPress: () => navigation.navigate('Open Bidding')},
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
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PreviewOpenBidding', {previewData: item})
          }>
          <Card.Title
            titleStyle={CompStyle.cardTitle}
            title={item.judul_open_bidding}
            subtitle={moment(item.tanggal).format('dddd, DD MMMM YYYY')}
          />
        </TouchableOpacity>
        <Card.Cover style={CompStyle.cardCover} source={{uri: item.gambar}} />
      </View>
      <Card.Actions style={CompStyle.cardAction}>
        <Button
          style={CompStyle.cardButton}
          icon="open-in-app"
          mode="contained"
          onPress={() =>
            navigation.navigate('PreviewOpenBidding', {previewData: item})
          }
        />
        <Button
          style={CompStyle.cardButton}
          icon="delete"
          mode="contained"
          onPress={() => confirmDelete({id: item.kode_open_bidding})}
        />
      </Card.Actions>
    </Card>
  );

  useEffect(async () => {
    getDataProfile();
    navigation.addListener('focus', async () => {
      await Client.post('/openBidding', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log(response.data.result);
        setDaftarOB(response.data.result);
        setLoading(false);
      });
    });
    console.log(daftarOB);
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
        {!daftarOB ? (
          <View>
            <Text>Belum ada Ada, Silahkan Tambah</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={daftarOB}
              renderItem={renderItem}
              keyExtractor={item => item.kode_open_bidding}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        )}
      </View>
      <FAB
        style={CompStyle.fab}
        small
        icon="plus"
        onPress={() =>
          navigation.navigate('TambahDaftarOpenBidding', {urlImage: null})
        }
        color="blue"
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
