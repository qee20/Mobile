import React from 'react';
import {
  View,
  Button,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import ImagePickerCropX from 'react-native-image-crop-picker';
import Client from '../mysql api/client';
import {ContextForAuth} from '../Context/Context';
import {IconButton, Colors} from 'react-native-paper';

const ImagePickerCrop = ({route, navigation}) => {
  const {state} = React.useContext(ContextForAuth);
  const [image, setImage] = React.useState(null);
  const [loadprogress, setLoadProgress] = React.useState(0);
  const [DATA, setDATA] = React.useState([]);
  const {screenSource} = route.params;

  const takePhotofromCamera = () => {
    ImagePickerCropX.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const takeLibrary = () => {
    ImagePickerCropX.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
      cropperToolbarTitle: 'Crop Foto',
      cropperToolbarWidgetColor: 'blue',
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const selectThisImage = ({url, namagbr}) => {
    Alert.alert('Pilih Gambar', 'Gunakan gambar ini?', [
      //{text: 'Ya', onPress: () => updateImage({url, id})},
      {
        text: 'Ya',
        onPress: () =>
          navigation.navigate(screenSource, {urlImage: url, namagbr: namagbr}),
      },
      {
        text: 'Batal',
      },
    ]);
  };

  const deleteImage = ({url, filename}) => {
    Alert.alert('Hapus Gambar', 'Konfirmasi Hapus ?', [
      {
        text: 'OK',
        onPress: () =>
          Client.post('/userImage/del', {filename: filename}).then(response => {
            Client.post('/userImages', {userid: state.userId}).then(
              response => {
                ToastAndroid.show('Foto Sudah Dihapus', 3000);
                setDATA(response.data.images);
              },
            );
          }),
      },
    ]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', {
      name: new Date() + '_image',
      uri: image,
      type: 'image/jpg',
    });
    formData.append('kode_pengguna', state.userId);

    try {
      const res = await Client.post('/uploadImage', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ({loaded, total}) => setLoadProgress(loaded / total),
      }).then(response => {
        Client.post('/userImages', {userid: state.userId})
          .then(response => {
            setDATA(response.data.images);
          })
          .then(response => {
            ToastAndroid.show('Foto berhasil diupload!', 3000);
            setImage(null);
          });
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            selectThisImage({url: item.image_url, namagbr: item.filename})
          }>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: item.image_url}}
          />
          <Text style={styles.text}>{item.filename}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <IconButton
            icon="delete-forever"
            color={Colors.red500}
            size={20}
            onPress={() => deleteImage({filename: item.filename})}
          />
          <IconButton
            icon="eye-outline"
            color={Colors.blue700}
            size={20}
            onPress={() => {
              Linking.openURL(item.image_url);
            }}
          />
        </View>
      </View>
    );
  };

  React.useEffect(() => {
    Client.post('/userImages', {userid: state.userId}).then(response => {
      setDATA(response.data.images);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerpre}>
        {image ? (
          <Image
            style={{width: 120, height: 240}}
            resizeMode="contain"
            source={{uri: image}}
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No Image Selected
            </Text>
          </View>
        )}
      </View>
      <View style={styles.fixToText}>
        <View style={{margin: 10}}>
          <Button title="Buka Galeri" onPress={takeLibrary} />
        </View>
        <View style={{margin: 10}}>
          <Button title="Camera" onPress={takePhotofromCamera} />
        </View>
        <View style={{margin: 10}}>
          {image ? (
            <Button disabled={false} title="Upload" onPress={uploadImage} />
          ) : (
            <Button disabled={true} title="Upload" />
          )}
        </View>
      </View>
      <FlatList
        numColumns={2}
        style={styles.container}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => `key-${item.image_ID}`}
      />
    </SafeAreaView>
  );
};

export default ImagePickerCrop;

const styles = StyleSheet.create({
  containerpre: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  noImage: {
    borderWidth: 2,
    width: 120,
    height: 120,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  item: {
    padding: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 8,
    marginHorizontal: 5,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  fixToText: {margin: 5},
});
