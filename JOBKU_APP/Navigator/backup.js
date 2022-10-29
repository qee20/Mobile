import * as React from 'react';
import {View, Text, Button, Image, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ContextForAuth} from '../Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Loading_Screen,
  Login,
  Register,
  Client_Form,
  Freelancer_Form,
  Forgot_Password,
  Choose,
  Chat,
  Home,
  Management,
  Profile,
  Notification,
  TambahDaftar,
  UserImageServer,
  DatePicker
} from '../Screens';
import Client from '../mysql api/client'

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

function About() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>About!</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
);

const ChatStack = createStackNavigator();

const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen name="Chat" component={Chat} />
    <ChatStack.Screen name="About" component={About} />
  </ChatStack.Navigator>
);

const MGMT_ProjectStack = createStackNavigator();

const MGMTStackScreen = () => (
  <MGMT_ProjectStack.Navigator>
    <MGMT_ProjectStack.Screen name="MGMT" component={Management} />
    <MGMT_ProjectStack.Screen name="TambahDaftar" component={TambahDaftar} />
    <MGMT_ProjectStack.Screen name="JOBKU Image User" component={UserImageServer} />
  </MGMT_ProjectStack.Navigator>
);

const NotificationStack = createStackNavigator();

const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen name="Notif" component={Notification} />
  </NotificationStack.Navigator>
);

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const Navigator = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userChoice: action.choose,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOG_IN':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
            userChoice: action.choose
          };
        case 'REGISTER':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
          };
        case 'LOG_OUT':
          return {
            ...prevState,
            isLoading: false,
            userToken: null,
            userChoice: null
          };
        case 'CHOOSE':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
          userChoice: action.choose
        };
      }
    },
    {
      isLoading: true,
      userToken: null,
      userChoice: null
    },
  );

  const authContext = React.useMemo(() => ({
      logIn: async (username, password) => {
       Client.post('/login', {
          username: username,
          password: password,
        })
          .then(response => {
            if (!response.data.auth) {
              Alert.alert('Error', response.data.message, [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            } else {
              console.log(response.data.token);
              AsyncStorage.multiSet([
                ['userid', JSON.stringify(response.data.userid)],
                ['token', response.data.token],
              ]).then(async response => {
                let userToken;

                try {
                  userToken = await AsyncStorage.getItem('token');
                } catch (e) {
                  alert('failed!');
                }
                dispatch({type: 'LOG_IN', token: userToken});
              });
            }
          })
          .catch(error => console.log(error));
      },
      sendInfo : async  () => {

        let userToken, userChoice;

        try {
          userToken = await AsyncStorage.getItem('token');
          userChoice = await AsyncStorage.getItem('userChoice');
        } catch (e) {
          alert('failed!');
        }

        dispatch({type: 'RESTORE_TOKEN', token: userToken, choose : userChoice});
        
      },
      registering: async (username, password, email) => {
        Client.post('/register', {
          username : username,
          password : password,
          email : email,
      }).then(()=>{
        Client.post('/regInfo', {
          username: username
        }).then(response => {
          console.log(response.data.token);
          Alert.alert('Info', 'Akun dengan  ID [' +response.data.userid+'] telah berhasil didaftar, Silahkan lengkapi data anda berikutnya', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          AsyncStorage.multiSet([
            ['userid', JSON.stringify(response.data.userid)],
            ['token', response.data.token]
          ]).then(async response => {
            let userToken;

            try {
              userToken = await AsyncStorage.getItem('token');
            } catch (e) {
              alert('failed!');
            }
            dispatch({type: 'REGISTER', token: userToken});
          });
        }).catch(error => console.log(error));
      }).catch(error=> alert(error));
      },
      logOut: async () => {
        let userToken, userChoice;

        try {
          userToken = await AsyncStorage.removeItem('token');
          userChoice = await AsyncStorage.removeItem('userChoice');
        } catch (e) {
          alert('failed!');
        }

        dispatch({type: 'LOG_OUT'});
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken, userChoice;

      try {
        userToken = await AsyncStorage.getItem('token');
        userChoice = await AsyncStorage.getItem('userChoice');
      } catch (e) {
        console.log(e);
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken, choose : userChoice});
    }, 1000);
  }, []);

  if (state.isLoading) {
    return <Loading_Screen />;
  }

  return (
    <ContextForAuth.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken==null && state.userChoice==null ? (
          <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
        ) : state.userToken && state.userChoice==null ? (
          <Stack.Navigator>
            <Stack.Screen name="Choose" component={Choose} />
            <Stack.Screen name="Client_Form" component={Client_Form} />
            <Stack.Screen name="Freelancer_Form" component={Freelancer_Form} />
            <Stack.Screen name="Pilih Foto" component={UserImageServer} />
            <Stack.Screen name="DatePicker" component={DatePicker} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'md-home' : 'md-home-outline';
              } else if (route.name === 'Chat') {
                iconName = focused
                  ? 'md-chatbubble'
                  : 'md-chatbubble-outline';
              } else if (route.name === 'Management') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Notification') {
                iconName = focused
                  ? 'notifications'
                  : 'notifications-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#393FE3',
            inactiveTintColor: '#FF8298',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Chat" component={ChatStackScreen} />
          <Tab.Screen name="Management" component={MGMTStackScreen} />
          <Tab.Screen
            name="Notification"
            component={NotificationStackScreen}
          />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
        )}
      </NavigationContainer>
    </ContextForAuth.Provider>
  );
};

export default Navigator;
