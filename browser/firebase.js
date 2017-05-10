// FIREBASE MODULE
/* global firebase */
var config = {
  apiKey: "AIzaSyCao3V8b2INzVjRy8ZzTsSXBP-z3gZSJiI",
  authDomain: "testing-firebase-5f787.firebaseapp.com",
  databaseURL: "https://testing-firebase-5f787.firebaseio.com",
  projectId: "testing-firebase-5f787",
  storageBucket: "testing-firebase-5f787.appspot.com",
  messagingSenderId: "930281689218"
}

firebase.initializeApp(config)
console.log('FIREBASE initialized')
const setupDataBase = (referenceString) => firebase.database().ref(referenceString)

export default setupDataBase
