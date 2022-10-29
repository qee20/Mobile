import * as React from 'react';
import {View, Text, Button, Image, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ContextForAuth} from '../Context/Context';
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
  UserImageServer,
  DatePicker,
  Skills,
  InitAccount,
  FormInfoPerusahaan,
} from '../Screens';
import Client from '../mysql api/client';
import {StylingHeader} from '../JOBKU RESC/componentStyles';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      resizeMode="center"
      style={{width: 60, height: 60}}
      source={require('../../assets/JOBKU-LOGO.png')}
    />
  );
}

const Navigator = () => {
  const {state, notif} = React.useContext(ContextForAuth);

  if (state.isLoading) {
    return <Loading_Screen />;
  }

  return (
    <NavigationContainer>
      {state.token == null && state.userChoice == null ? (
        <AuthStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5352F7',
            },
            headerTintColor: '#fff',
          }}>
          <AuthStack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>Masuk akun</Text>
                </View>
              ),
            }}
            name="Login"
            component={Login}
          />
          <AuthStack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>Daftar akun</Text>
                </View>
              ),
            }}
            name="CreateAccount"
            component={InitAccount}
          />
          <AuthStack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>Lengkapi Data</Text>
                </View>
              ),
            }}
            name="CompleteData"
            component={Register}
          />
        </AuthStack.Navigator>
      ) : state.token && state.userChoice == null ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5352F7',
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>Pilih Peran</Text>
                </View>
              ),
            }}
            name="Choose"
            component={Choose}
          />
          <Stack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>
                    Pendaftaran Client
                  </Text>
                </View>
              ),
            }}
            name="Client_Form"
            component={Client_Form}
          />
          <Stack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>
                    Pendaftaran Freelancer
                  </Text>
                </View>
              ),
            }}
            name="Freelancer_Form"
            component={Freelancer_Form}
          />
          <Stack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>Pilih Gambar</Text>
                </View>
              ),
            }}
            name="Pilih Foto"
            component={UserImageServer}
          />
          <Stack.Screen
            options={{
              headerTitle: props => (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 1}}>
                    <LogoTitle {...props} />
                  </View>
                  <Text style={StylingHeader.headerText}>
                    Tambahkan Info Perusahaan
                  </Text>
                </View>
              ),
            }}
            name="AddCompanyInfo"
            component={FormInfoPerusahaan}
          />
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
                iconName = focused ? 'md-chatbubble' : 'md-chatbubble-outline';
              } else if (route.name === 'Management') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Notification') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#00A3FF',
            inactiveTintColor: '#FF8298',
            keyboardHidesTabBar: true,
            showLabel: false,
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="Management" component={Management} />
          <Tab.Screen
            name="Notification"
            options={{tabBarBadge: notif.length}}
            component={Notification}
          />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
