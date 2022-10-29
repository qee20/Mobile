import React from 'react';
import {Alert} from 'react-native';
import Client from '../mysql api/client';
export const ContextForAuth = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProviderforAuth = ({children}) => {
  var [userId, setUserId] = React.useState(null);
  var [token, setToken] = React.useState(null);
  var [userChoice, setUserChoice] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);
  const [variabels, setvariabels] = React.useState('');
  const [passProfileData, setPassProfileData] = React.useState([]);

  const getFreelancerData = () => {
    Client.post('/getFreelancerdata', {
      kode_pengguna: state.userId,
    })
      .then(response => {
        const thisData = response.data.freelancerData;
        setPassProfileData(thisData);
      })
      .catch(error => console.log(error));
  };

  const getClientData = () => {
    Client.post('/getClientdata', {
      kode_pengguna: state.userId,
    })
      .then(response => {
        const thisData = response.data.clientData;
        setPassProfileData(thisData);
      })
      .catch(error => console.log(error));
  };

  const chooseData = () => {
    if (state.userChoice == 'Client') {
      getClientData();
    } else if (state.userChoice == 'Freelancer') {
      getFreelancerData();
    }
  };

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userId: action.userId,
            userChoice: action.choose,
            token: action.token,
            isLoading: false,
          };
        case 'LOG_IN':
          return {
            ...prevState,
            isLoading: false,
            token: action.token,
            userChoice: action.choose,
            userId: action.userId,
          };
        case 'REGISTER':
          return {
            ...prevState,
            isLoading: false,
            token: action.token,
            userChoice: action.choose,
            userId: action.userId,
          };
        case 'LOG_OUT':
          return {
            ...prevState,
            isLoading: false,
            token: null,
            userChoice: null,
          };
        case 'CHOOSE':
          return {
            ...prevState,
            isLoading: false,
            token: action.token,
            userChoice: null,
          };
      }
    },
    {
      isLoading: true,
      token: null,
      userChoice: null,
    },
  );

  React.useEffect(() => {
    setTimeout(async () => {
      token = await AsyncStorage.getItem('token');
      userChoice = await AsyncStorage.getItem('userChoice');
      userId = await AsyncStorage.getItem('userid');

      dispatch({
        type: 'RESTORE_TOKEN',
        token: token,
        choose: userChoice,
        userId: userId,
      });
    }, 1000);
  }, []);

  return (
    <ContextForAuth.Provider
      value={{
        userId,
        setUserId,
        token,
        setToken,
        userChoice,
        setUserChoice,
        isLoading,
        setIsLoading,
        state,
        dispatch,
        variabels,
        setvariabels,
        passProfileData,
        setPassProfileData,
        logIn: async (username, password) => {
          await Client.post('/login', {
            username: username,
            password: password,
          })
            .then(response => {
              if (!response.data.auth) {
                Alert.alert('Error', response.data.message, [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
              } else {
                AsyncStorage.multiSet([
                  ['userid', response.data.userid],
                  ['token', response.data.token],
                ]).then(async response => {
                  userId = await AsyncStorage.getItem('userid');
                  token = await AsyncStorage.getItem('token');
                  dispatch({type: 'LOG_IN', token: token, userId: userId});
                });
              }
            })
            .catch(error => console.log(error));
        },
        sendInfo: async usrc => {
          AsyncStorage.setItem('userChoice', usrc).then(async () => {
            userChoice = await AsyncStorage.getItem('userChoice');
            dispatch({
              type: 'RESTORE_TOKEN',
              token: state.token,
              choose: userChoice,
              userId: state.userId,
            });
          });
        },
        registering: async (username, password, email, jeniskelamin) => {
          await Client.post('/register', {
            username: username,
            password: password,
            email: email,
            jeniskelamin: jeniskelamin,
          })
            .then(response => {
              console.log(response);
              Client.post('/regInfo', {
                username: username,
              })
                .then(response => {
                  console.log(response);
                  console.log(response.data.token);
                  Alert.alert(
                    'Info',
                    'Akun dengan  ID [' +
                      response.data.userid +
                      '] telah berhasil didaftar, Silahkan lengkapi data anda berikutnya',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  );
                  AsyncStorage.multiSet([
                    ['userid', response.data.userid],
                    ['token', response.data.token],
                  ]).then(async response => {
                    userId = await AsyncStorage.getItem('userid');
                    token = await AsyncStorage.getItem('token');
                    dispatch({type: 'REGISTER', token: token, userId: userId});
                  });
                })
                .catch(error => console.log(error));
            })
            .catch(error => alert(error));
        },
        logOut: async () => {
          token = await AsyncStorage.removeItem('token');
          userChoice = await AsyncStorage.removeItem('userChoice');
          userId = await AsyncStorage.removeItem('userid');
          dispatch({type: 'LOG_OUT'});
        },
        getDataProfile: () => {
          chooseData();
        },
        switchTo: async () => {
          userChoice = await AsyncStorage.removeItem('userChoice');
          token = await AsyncStorage.getItem('token');
          dispatch({type: 'CHOOSE', token: token, userChoice: null});
        },
      }}>
      {children}
    </ContextForAuth.Provider>
  );
};
