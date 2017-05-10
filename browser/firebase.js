// FIREBASE MODULE
/* global firebase */
var config = {
  apiKey: 'AIzaSyAoEAecAsSgktGQmv2dHhinVRrMhoUYiYg',
  authDomain: 'test-61ce3.firebaseapp.com',
  databaseURL: 'https://test-61ce3.firebaseio.com',
  projectId: 'test-61ce3',
  storageBucket: 'test-61ce3.appspot.com',
  messagingSenderId: '555633723470'
}

firebase.initializeApp(config)
console.log('FIREBASE initialized')
const setupDataBase = (referenceString) => firebase.database().ref(referenceString)

export default setupDataBase
