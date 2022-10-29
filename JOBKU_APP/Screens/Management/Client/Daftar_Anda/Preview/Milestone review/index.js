import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput, Button} from 'react-native-paper';

const MilestonePreview = ({navigation, route}) => {
  const {track, type} = route.params;
  if (type == 'JS') {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>
          {moment(track.waktu_milestonejasa).format('dddd, DD MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(track.foto_progres)}>
          <Image
            style={{
              width: 200,
              height: 100,
              margin: 10,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            source={{uri: track.foto_progres}}
          />
        </TouchableOpacity>
        <Text style={{margin: 5, fontSize: 20, textAlign: 'center'}}>
          {track.keterangan_milestone}
        </Text>
        <Text style={{margin: 5, fontSize: 20, textAlign: 'center'}}>
          Link File tambahan {track.link_file}
        </Text>
      </View>
    );
  } else {
    return (
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
          <TextInput
            multiline={true}
            style={{margin: 5}}
            mode="outlined"
            label="Masukkan Komentar"
          />
          <Button style={{margin: 5}} mode="contained">
            Konfirmasi
          </Button>
        </View>
      </View>
    );
  }
};

export default MilestonePreview;
