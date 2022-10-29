import Firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyDeW-ggq8ShoHy7-Rrv9QIi1AMmnBsBOqU',
  authDomain: 'jobku-f82b5.firebaseapp.com',
  projectId: 'jobku-f82b5',
  storageBucket: 'jobku-f82b5.appspot.com',
  messagingSenderId: '645506630831',
  appId: '1:645506630831:web:030df444544567e44e805a',
  measurementId: 'G-1LPBDCFNS5',
};

export default !Firebase.apps.length
  ? Firebase.initializeApp(firebaseConfig)
  : Firebase.app();

export const database = Firebase.database();

export const storage = Firebase.storage();
