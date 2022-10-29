import React from 'react';
import {View, Button, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ContextForAuth} from '../../Context/Context';
import {
  PreviewItem,
  PreviewBidding,
  Bidding_it,
  Hiring,
  Pembayaran,
  Pembayaran_Diverifikasi,
  Verifikasi_Pembayaran,
  Bukti_Pembayaran,
  UserImageServer,
  BerandaJasa,
  BerandaOpenBidding,
  Management,
  CariOpenBidding,
  CariJasa,
  ToClientProfile,
  ToFreelancerProfile,
  InfoPerusahaanClient,
} from '../../Screens';
import {StylingHeader} from '../../JOBKU RESC/componentStyles';

function LogoTitle() {
  return (
    <Image
      resizeMode="center"
      style={{width: 60, height: 60}}
      source={require('../../../assets/JOBKU-LOGO.png')}
    />
  );
}

const Beranda = () => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);
  if (state.userChoice == 'Freelancer') {
    return <BerandaOpenBidding />;
  } else {
    return <BerandaJasa />;
  }
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5352F7',
      },
      headerTintColor: '#fff',
    }}>
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Beranda</Text>
          </View>
        ),
      }}
      name="Home"
      component={Beranda}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pratinjau</Text>
          </View>
        ),
      }}
      name="PreviewPJF"
      component={PreviewItem}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Halaman Pencarian</Text>
          </View>
        ),
      }}
      name="Cari Jasa"
      component={CariJasa}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Halaman Pencarian</Text>
          </View>
        ),
      }}
      name="Cari OpenBidding"
      component={CariOpenBidding}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Sewa Freelancer</Text>
          </View>
        ),
      }}
      name="Hiring"
      component={Hiring}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pratinjau Bidding</Text>
          </View>
        ),
      }}
      name="PreviewBid"
      component={PreviewBidding}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Lakukan Penawaran</Text>
          </View>
        ),
      }}
      name="BiddingIt"
      component={Bidding_it}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pembayaran</Text>
          </View>
        ),
      }}
      name="Pembayaran"
      component={Pembayaran}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Verifikasi Pembayaran</Text>
          </View>
        ),
      }}
      name="VerifikasiPembayaran"
      component={Verifikasi_Pembayaran}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>
              Pembayaran Diverifikasi
            </Text>
          </View>
        ),
      }}
      name="PembayaranDiverfikasi"
      component={Pembayaran_Diverifikasi}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Bukti Transaksi</Text>
          </View>
        ),
      }}
      name="BuktiPembayaran"
      component={Bukti_Pembayaran}
    />
    <HomeStack.Screen
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
      name="ImageUser"
      component={UserImageServer}
    />
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Management"
      component={Management}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Profil Freelancer</Text>
          </View>
        ),
      }}
      name="ToFreelancerProfile"
      component={ToFreelancerProfile}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Profil Client</Text>
          </View>
        ),
      }}
      name="ToClientProfile"
      component={ToClientProfile}
    />
    <HomeStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>
              Profil Perusahaan Client
            </Text>
          </View>
        ),
      }}
      name="CompanyProfile"
      component={InfoPerusahaanClient}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
