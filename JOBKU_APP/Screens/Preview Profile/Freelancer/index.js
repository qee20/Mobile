import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Client from '../../../mysql api/client';
import moment from 'moment';

const ProfileInfo = ({route, navigation}) => {
  const {kodeClient} = route.params;

  const [profile, setProfile] = React.useState([]);
  const [companyprofile, setCompanyProfile] = React.useState([]);

  React.useEffect(async () => {
    await Client.post('/ProfileInfo/Client', {
      kode_client: kodeClient,
    }).then(response => {
      console.log('profilClient', response.data);
      Client.post('/client/ProfilPerusahaan', {
        kode_client: kodeClient,
      }).then(response => {
        console.log(response.data);
        setCompanyProfile(response.data);
      });
      setProfile(response.data);
    });
  }, []);

  return (
    <ScrollView>
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
            <View style={{borderWidth: 1, margin: 5, borderRadius: 10}}>
              <Text
                style={{
                  margin: 5,
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#0F52BA',
                }}>
                Profil Perusahaan
              </Text>
              {companyprofile.map(data => {
                return (
                  <View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#7C83FD',
                        alignItems: 'center',
                        padding: 5,
                        margin: 5,
                        borderRadius: 10,
                      }}>
                      <Text style={{fontSize: 15}}>Jenis Perusahaan</Text>
                      <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                        {data.jenis_perusahaan}
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
                      <Text style={{fontSize: 15}}>Nama Perusahaan</Text>
                      <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                        {data.nama_perusahaan}
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
                      <Text style={{fontSize: 15}}>
                        Nomor Telepon Perusahaan
                      </Text>
                      <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                        {data.nomor_telp_perusahaan}
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
                      <Text style={{fontSize: 15}}>Website Perusahaan</Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'blue',
                        }}>
                        {data.website_perusahaan}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ProfileInfo;
