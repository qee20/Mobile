import React from 'react';
import {View, Button, Text, Image, RefreshControl} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StylingHeader} from '../../JOBKU RESC/componentStyles';
import {ContextForAuth} from '../../Context/Context';
import Client from '../../mysql api/client';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

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

const Notification = () => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);

  const [notif, setNotif] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (state.userChoice == 'Freelancer') {
      Client.post('/getNotification/freelancer', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('notif freelancer', response.data);
        setNotif(response.data);
      });
    } else {
      Client.post('/getNotification/client', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('notif client', response.data);
        setNotif(response.data);
      });
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    getDataProfile();
    if (state.userChoice == 'Freelancer') {
      Client.post('/getNotification/freelancer', {
        kode_freelancer: passProfileData.kode_freelancer,
      }).then(response => {
        console.log('notif freelancer', response.data);
        setNotif(response.data);
      });
    } else {
      Client.post('/getNotification/client', {
        kode_client: passProfileData.kode_client,
      }).then(response => {
        console.log('notif client', response.data);
        setNotif(response.data);
      });
    }
  }, []);

  if (state.userChoice == 'Freelancer') {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {notif.length > 0 ? (
          <View>
            {notif.map(notif => {
              return (
                <Card
                  style={{margin: 5, borderRadius: 10}}
                  key={notif.kode_notifikasi}>
                  <Card.Content>
                    <Title>{notif.jenis_notifikasi}</Title>
                    <Paragraph>
                      {notif.keterangan_notifikasi_freelancer}
                    </Paragraph>
                    <Text>
                      {moment(notif.tanggal_notifikasi)
                        .startOf('hour')
                        .fromNow()}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        ) : (
          <View style={{alignItems: 'center', marginTop: '50%'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Belum ada notifikasi
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
        {notif.length > 0 ? (
          <View>
            {notif.map(notif => {
              return (
                <Card
                  style={{margin: 5, borderRadius: 10}}
                  key={notif.kode_notifkasi_client}>
                  <Card.Content>
                    <Title>{notif.jenis_notifikasi_client}</Title>
                    <Paragraph>{notif.keterangan_notifikasi_client}</Paragraph>
                    <Text>
                      {moment(notif.tanggal_notifikasi_client)
                        .startOf('hour')
                        .fromNow()}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        ) : (
          <View style={{alignItems: 'center', marginTop: '50%'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Belum ada notifikasi
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
};

const NotificationStack = createStackNavigator();

const NotificationStackScreen = () => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5352F7',
      },
      headerTintColor: '#fff',
    }}>
    <NotificationStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Notifikasi</Text>
          </View>
        ),
      }}
      name="Notif"
      component={Notification}
    />
  </NotificationStack.Navigator>
);

export default NotificationStackScreen;
