import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const MilestonePreview = ({navigation, route}) => {
  const {track} = route.params;
  return (
    <View>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 20}}>
        Pratinjau Detail Progress Anda
      </Text>
      <View>
        <View>
          <Text style={{textAlign: 'center'}}>
            {moment(track.waktu_milestone_OB).format('dddd, DD MMMM YYYY')}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(track.foto_progresOB)}>
            <Image
              style={{
                width: 200,
                height: 100,
                margin: 10,
                borderRadius: 10,
                alignSelf: 'center',
              }}
              source={{uri: track.foto_progresOB}}
            />
          </TouchableOpacity>
          <Text style={{margin: 5, fontSize: 20, textAlign: 'center'}}>
            {track.keterangan}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(track.link_fileOB)}>
            <Text
              style={{
                margin: 5,
                fontSize: 20,
                textAlign: 'center',
                color: 'blue',
              }}>
              Link File tambahan : {track.link_fileOB}
            </Text>
          </TouchableOpacity>
          <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>
            Komentar Client
          </Text>
          <Text
            style={{borderWidth: 1, margin: 5, padding: 5, borderRadius: 10}}>
            Progress proyek yang anda buat untuk waktu ini sangat memuaskan dan
            sudah memenuhi harapan saya. Pola gambar rural nya sudah oke. Tapi
            kalau boleh,nih. Kira kira boleh tambah gambar logo gk di
            sampingnya, saya kirimkan contoh gambar logonya. Kalau gak boleh
            tidak apa apa juga
          </Text>
          <Button
            icon={{
              name: 'check-circle',
              size: 20,
              color: 'white',
            }}
            title="Sudah Disetujui"
          />
        </View>
      </View>
    </View>
  );
};

export default MilestonePreview;
