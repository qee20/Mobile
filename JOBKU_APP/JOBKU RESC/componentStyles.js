import {StyleSheet} from 'react-native';

export const ThePaymentLists = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#96BAFF',
  },
  fotoProfil: {
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
  },
  namaFreelancer: {
    alignSelf: 'center',
    flex: 4,
    fontSize: 20,
    fontWeight: 'bold',
  },
  judulproyek: {
    backgroundColor: '#F0D9E7',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  trxInfo: {
    borderWidth: 1,
    margin: 6,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#393E46',
  },
  txt: {
    color: 'white',
  },
});

export const StylingHeader = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    flex: 1.5,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export const Preview$bid = StyleSheet.create({
  bidDisplay: {
    borderWidth: 1,
  },
  detailBid: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#7C83FD',
    borderRadius: 10,
  },
  fade: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  pelamar: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
  },
});

export const Profile = StyleSheet.create({
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  wrapUp: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  nameDisplay: {
    fontSize: 20,
    marginTop: 5,
  },
  starWrap: {
    flexDirection: 'row',
    margin: 5,
  },
  VwrapC: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  CnameDisplay: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  Saldo: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  Opsi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Menus: {
    borderWidth: 1,
  },
  Menubtn: {
    margin: 5,
  },
});

export const Verif = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  containerL: {
    margin: 5,
  },
  containerR: {
    margin: 5,
  },
});

export const FinisedProject = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
  poster: {
    borderWidth: 1,
    margin: 3,
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  theproject: {
    margin: 3,
    padding: 3,
  },
  pending: {
    margin: 3,
    color: 'black',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  confirmed: {
    margin: 3,
    color: 'white',
    backgroundColor: '#00A3FF',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export const Pendingtrx = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
  poster: {
    borderWidth: 1,
    margin: 3,
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  theproject: {
    margin: 3,
    padding: 3,
  },
  pending: {
    margin: 3,
    color: 'black',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#FB9300',
  },
  belumLunas: {
    margin: 3,
    color: 'black',
    backgroundColor: 'yellow',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  confirmed: {
    margin: 3,
    color: 'white',
    backgroundColor: '#C68B59',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export const PreviewJasa = StyleSheet.create({
  header: {
    alignSelf: 'center',
    padding: 5,
  },
  ProfileInfoFr: {
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  PosterDes: {
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  btnGrp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoPaket: {
    borderWidth: 1,
    height: 150,
    padding: 10,
  },
  harga: {
    textAlign: 'center',
    fontSize: 20,
    margin: 3,
    color: 'green',
    fontWeight: 'bold',
  },
});

export const Checkout = StyleSheet.create({
  Detailup: {
    borderWidth: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  Paketdetail: {
    borderWidth: 1,
    backgroundColor: '#00DBAF',
    padding: 5,
    margin: 5,
  },
  downpayment: {
    backgroundColor: '#49A4E6',
    padding: 5,
    margin: 5,
    borderRadius: 2,
  },
  DPpersen: {
    borderWidth: 1,
    padding: 5,
  },
  Full: {
    margin: 5,
    padding: 5,
  },
});

export const VP = StyleSheet.create({
  noPic: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },
});

export const BerandaStyle = StyleSheet.create({
  containerItem: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  headerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Poster: {
    width: 170,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  infoPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  tagKetagori: {
    margin: 8,
    borderColor: '#402218',
    padding: 8,
    borderRadius: 25,
    color: '#402218',
    borderWidth: 1,
  },
});

export const PreviewStyle = StyleSheet.create({
  headerSmall: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    margin: 3,
    borderRadius: 10,
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  judul: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
  },
  poster: {
    width: 360,
    height: 200,
  },
  deskripsi: {
    margin: 5,
  },
  info: {
    padding: 5,
  },
  infoItem: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Pembidding: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
  },
  profileIMG: {
    borderWidth: 1,
    backgroundColor: 'blue',
    margin: 5,
  },
  InfoPembiding: {
    flexDirection: 'row',
  },
  InfoPembidingChild: {
    margin: 10,
  },
  infoBidingan: {
    margin: 6,
  },
  bidIt: {
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'yellow',
    borderRadius: 30,
    textAlign: 'center',
    width: '80%',
  },
  Footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonOp: {
    flexDirection: 'row',
    margin: 5,
  },
});

export const CompStyle = StyleSheet.create({
  noImage: {
    borderWidth: 2,
    width: 120,
    height: 120,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  illus: {
    alignItems: 'center',
  },
  labelTbh: {
    margin: 10,
    fontSize: 16,
  },
  inputTbh: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  DP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    margin: 5,
    padding: 5,
  },
  subt: {
    textAlign: 'center',
    fontSize: 25,
  },
  highlight: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 10,
    borderBottomWidth: 2,
    margin: 2,
  },
  pickerX: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  cardContainer: {
    borderWidth: 3,
    margin: 10,
  },
  cardTitle: {
    color: '#222EE0',
  },
  cardCover: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  cardAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardButton: {
    margin: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  fab: {
    borderWidth: 2,
    borderColor: 'rgba(252,208,8,1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    position: 'absolute',
    bottom: 30,
    right: 20,
    height: 70,
    backgroundColor: 'rgba(78,131,252,0.7)',
    borderRadius: 100,
  },
  AnggaranFlex: {
    borderWidth: 1,
    margin: 5,
  },
  anggaranBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
    margin: 5,
  },
  inputanggaran: {
    borderWidth: 1,
    width: 150,
    height: 30,
    margin: 5,
    fontSize: 9,
  },
  labelAnggaran: {
    textAlign: 'center',
    margin: 5,
  },
  ExpireGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateexp: {
    borderWidth: 2,
    width: 250,
  },
  itemSkill: {
    margin: 3,
    backgroundColor: 'blue',
    padding: 5,
    width: '80%',
    position: 'relative',
  },
  pilihSkill: {
    alignSelf: 'center',
  },
  WrapSkill: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
