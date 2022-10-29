import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import DaftarPenawaranJasa from './Freelancer/Daftar_Anda';
import DalamPengerjaan from './Freelancer/Dalam_Antrian';
import BelumBayar from './Freelancer/Belum_Bayar';
import Selesai from './Freelancer/Selesai';
import DaftarOpenBidding from './Client/Daftar_Anda';
import DalamPengerjaanFreelancer from './Client/Dalam_Antrian';
import PembayaranTertunda from './Client/Belum_Bayar';
import DiselesaikanFreelancer from './Client/Selesai';
import {
  TambahDaftarPenawaranJasa,
  UserImageServer,
  UpdateDaftarJasa,
  TambahDaftarOpenBidding,
  UpdateDaftarOpenBidding,
  Verifikasi_Pembayaran,
  Pembayaran_Diverifikasi,
  FeedBackReview,
  TRXDetail,
  OnwayFinishiingProject,
  CheckOutProposal,
  PayContract,
  SendTRX,
  ProjectFinishedJasa,
  ProjectFinishedOpenBidding,
  PreviewJasa,
  PreviewContractJasa,
  PreviewContractOpenBidding,
  ExecuteContractJasa,
  ExecuteContractOpenBidding,
  UserReport,
  KontrakOpenBiddingSelesai,
  KontrakJasaSelesai,
  PreviewOpenBidding,
  ToFreelancerProfile,
  ToClientProfile,
  PreviewMilestone,
  PreviewMyMilestone,
} from '../../Screens';
import {ContextForAuth} from '../../Context/Context';
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

const Tab = createMaterialTopTabNavigator();
const MGMT_ProjectStack = createStackNavigator();

const Management = () => {
  const {state, logOut, variabels, passProfileData, getDataProfile, switchTo} =
    React.useContext(ContextForAuth);
  React.useEffect(() => {
    getDataProfile();
  }, []);
  if (state.userChoice == 'Freelancer') {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Daftar Anda" component={DaftarPenawaranJasa} />
        <Tab.Screen name="Dalam Antrian" component={DalamPengerjaan} />
        <Tab.Screen name="Pending" component={BelumBayar} />
        <Tab.Screen name="Selesai" component={Selesai} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Open Bidding" component={DaftarOpenBidding} />
        <Tab.Screen
          name="Dalam Pengerjaan"
          component={DalamPengerjaanFreelancer}
        />
        <Tab.Screen name="Pembayaran Tertunda" component={PembayaranTertunda} />
        <Tab.Screen
          name="Selesai Dikerjakan"
          component={DiselesaikanFreelancer}
        />
      </Tab.Navigator>
    );
  }
};

const MGMTStackScreen = () => (
  <MGMT_ProjectStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5352F7',
      },
      headerTintColor: '#fff',
    }}>
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Manajemen Proyek</Text>
          </View>
        ),
      }}
      name="MGMT"
      component={Management}
    />
    <MGMT_ProjectStack.Screen
      name="TambahDaftarPenawaranJasa"
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Penawaran Jasa Baru</Text>
          </View>
        ),
      }}
      component={TambahDaftarPenawaranJasa}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Perbarui Info</Text>
          </View>
        ),
      }}
      name="UpdateDaftarJasa"
      component={UpdateDaftarJasa}
    />
    <MGMT_ProjectStack.Screen
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
      name="PreviewJasa"
      component={PreviewJasa}
    />
    <MGMT_ProjectStack.Screen
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
      name="JOBKU Image User"
      component={UserImageServer}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Buat Open Bidding</Text>
          </View>
        ),
      }}
      name="TambahDaftarOpenBidding"
      component={TambahDaftarOpenBidding}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Perbarui Info</Text>
          </View>
        ),
      }}
      name="UpdateDaftarOpenBidding"
      component={UpdateDaftarOpenBidding}
    />
    <MGMT_ProjectStack.Screen
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
      name="PreviewOpenBidding"
      component={PreviewOpenBidding}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>
              Verifikasi Pembayaran Kedua
            </Text>
          </View>
        ),
      }}
      name="VerifikasiPembayaranBelumLunas"
      component={Verifikasi_Pembayaran}
    />
    <MGMT_ProjectStack.Screen
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
      name="VerifikasiPembayaranClient"
      component={Verifikasi_Pembayaran}
    />
    <MGMT_ProjectStack.Screen
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
      name="Confirmed"
      component={Pembayaran_Diverifikasi}
    />
    <MGMT_ProjectStack.Screen
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
      name="PratinjauPesananjasa"
      component={PreviewContractJasa}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pengerjaan</Text>
          </View>
        ),
      }}
      name="KerjakanJasa"
      component={ExecuteContractJasa}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Kontrak Diselesaikan</Text>
          </View>
        ),
      }}
      name="JasaSelesai"
      component={ProjectFinishedJasa}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pratinjau Kontrak</Text>
          </View>
        ),
      }}
      name="PratinjauOpenBidding"
      component={PreviewContractOpenBidding}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pengerjaan Proyek</Text>
          </View>
        ),
      }}
      name="KerjakanOpenBidding"
      component={ExecuteContractOpenBidding}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Kontrak Selesai</Text>
          </View>
        ),
      }}
      name="OpenBiddingSelesai"
      component={ProjectFinishedOpenBidding}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Form Pelaporan</Text>
          </View>
        ),
      }}
      name="LaporPengguna"
      component={UserReport}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Review Client</Text>
          </View>
        ),
      }}
      name="KontrakJasaSelesai"
      component={KontrakJasaSelesai}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Review Client</Text>
          </View>
        ),
      }}
      name="KontrakOpenBiddingSelesai"
      component={KontrakOpenBiddingSelesai}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Feedback Anda</Text>
          </View>
        ),
      }}
      name="FeedbackClient"
      component={FeedBackReview}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Detail Pembayaran</Text>
          </View>
        ),
      }}
      name="DetailTransaksi"
      component={TRXDetail}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Progres Proyek</Text>
          </View>
        ),
      }}
      name="PantauProyek"
      component={OnwayFinishiingProject}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Buat Kontrak</Text>
          </View>
        ),
      }}
      name="CheckoutProposal"
      component={CheckOutProposal}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Pembayaran Kontrak</Text>
          </View>
        ),
      }}
      name="BayarOB"
      component={PayContract}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Kirim Bukti Pembayaran</Text>
          </View>
        ),
      }}
      name="KirimBuktiTF"
      component={SendTRX}
    />
    <MGMT_ProjectStack.Screen
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
    <MGMT_ProjectStack.Screen
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
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Detail Progres</Text>
          </View>
        ),
      }}
      name="PreviewM4Client"
      component={PreviewMilestone}
    />
    <MGMT_ProjectStack.Screen
      options={{
        headerTitle: props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <LogoTitle {...props} />
            </View>
            <Text style={StylingHeader.headerText}>Progres Proyek</Text>
          </View>
        ),
      }}
      name="PreviewMyOwnProgress"
      component={PreviewMyMilestone}
    />
  </MGMT_ProjectStack.Navigator>
);

export default MGMTStackScreen;
