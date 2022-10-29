import React from 'react';
import {View, Text, Image} from 'react-native';
import Client from '../../../mysql api/client';
import moment from 'moment';

const ProfileInfo = ({route, navigation}) => {
  const {kodeFreelancer} = route.params;

  const [profile, setProfile] = React.useState([]);

  React.useEffect(async () => {
    await Client.post('/ProfileInfo/Freelancer', {
      kode_freelancer: kodeFreelancer,
    }).then(response => {
      console.log('profFree', response.data);
      setProfile(response.data);
    });
  }, []);

  return (
    <View>
      {profile.map(data => {
        return (
          <View>
            <View style={{alignItems: 'center', margin: 10}}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50}}
                source={{uri: data.fotoProfil}}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#7C83FD',
                alignItems: 'center',
                padding: 5,
                margin: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 15}}>username</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {data.username}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#7C83FD',
                alignItems: 'center',
                padding: 5,
                margin: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 15}}>Alamat Email</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {data.email}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#7C83FD',
                alignItems: 'center',
                padding: 5,
                margin: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 15}}>Alamat</Text>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
                {data.alamat}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#7C83FD',
                alignItems: 'center',
                padding: 5,
                margin: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 15}}>Tempat dan Tanggal Lahir</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {data.tempatLahir},{' '}
                {moment(data.tanggalLahir).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#7C83FD',
                alignItems: 'center',
                padding: 5,
                margin: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 15}}>No handphone / Whatsapp</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {data.nomorHP}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileInfo;
