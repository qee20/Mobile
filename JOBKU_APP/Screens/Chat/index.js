import React from 'react';
import {
  View,
  Button,
  Text,
  Image,
  ScrollView,
  Linking,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Client from '../../mysql api/client';
import {StylingHeader} from '../../JOBKU RESC/componentStyles';
import {ContextForAuth} from '../../Context/Context';
import {Card, Title, Paragraph, Avatar} from 'react-native-paper';
import moment from 'moment';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function LogoTitle() {
  return (
    <Image
      resizeMode="center"
      style={{width: 60, height: 60}}
      source={require('../../../assets/JOBKU-LOGO.png')}
    />
  );
}

const Chat = () => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [Chatroom, setChatroom] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataProfile();
    if (state.userChoice == 'Freelancer') {
      Client.post('/getChatRoomF', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log(response.data.result);
        setChatroom(response.data.result);
      });
    } else if (state.userChoice == 'Client') {
      Client.post('/getChatRoomC', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log(response.data.result);
        setChatroom(response.data.result);
      });
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const openWa = chat => {
    let url =
      'whatsapp://send?text=' +
      'Selamat,siang dari aplikasi JOBKU' +
      '&phone=62' +
      chat.nomorHP;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  React.useEffect(() => {
    getDataProfile();
    if (state.userChoice == 'Freelancer') {
      Client.post('/getChatRoomF', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log(response.data.result);
        setChatroom(response.data.result);
      });
    } else if (state.userChoice == 'Client') {
      Client.post('/getChatRoomC', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log(response.data.result);
        setChatroom(response.data.result);
      });
    }
  }, []);

  if (state.userChoice == 'Freelancer') {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Chatroom.length > 0 ? (
          <View>
            {Chatroom.map(chat => {
              return (
                <Card
                  onPress={() => openWa(chat)}
                  style={{margin: 5, padding: 5, backgroundColor: '#96BAFF'}}
                  key={Chatroom.chatroom_id}>
                  <Card.Title
                    title={chat.nama_client}
                    subtitle={moment(chat.waktu_menghubungi).format(
                      'HH:mm dddd , DD MMMM YYYY',
                    )}
                    left={props => (
                      <Avatar.Image
                        {...props}
                        source={{uri: chat.fotoProfil}}
                      />
                    )}
                  />
                </Card>
              );
            })}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={{alignSelf: 'center', flex: 3, marginTop: 100}}>
              Belum Ada Data, coba refresh
            </Text>
          </View>
        )}
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Chatroom.length > 0 ? (
          <View>
            {Chatroom.map(chat => {
              return (
                <Card
                  onPress={() => openWa(chat)}
                  style={{margin: 5, padding: 5, backgroundColor: '#96BAFF'}}
                  key={Chatroom.chatroom_id}>
                  <Card.Title
                    title={chat.nama_freelancer}
                    subtitle={moment(chat.waktu_menghubungi).format(
                      'HH:mm dddd , DD MMMM YYYY',
                    )}
                    left={props => (
                      <Avatar.Image
                        {...props}
                        source={{uri: chat.fotoProfil}}
                      />
                    )}
                  />
                </Card>
              );
            })}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={{alignSelf: 'center', flex: 3, marginTop: 100}}>
              Belum Ada Data, coba refresh
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
};

const ChatStack = createStackNavigator();

const ChatStackScreen = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5352F7',
      },
      headerTintColor: '#fff',
    }}>
    <ChatStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>
              Yang Pernah Anda Hubungi
            </Text>
          </View>
        ),
      }}
      name="Chat"
      component={Chat}
    />
  </ChatStack.Navigator>
);

export default ChatStackScreen;
