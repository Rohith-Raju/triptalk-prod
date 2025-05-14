import { initializeApp } from 'firebase/app';
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDlC5VmSbpAgFZnPp7CAbtoSkaqhuhMLxA",
  authDomain: "triptalk-production.firebaseapp.com",
  projectId: "triptalk-production",
  storageBucket: "triptalk-production.appspot.com",
  messagingSenderId: "942991050911",
  appId: "1:942991050911:web:987a6cb862cd7fffdc7aaa",
  measurementId: "G-JHH8W9GMW9",
};

const app = initializeApp(firebaseConfig);

export default app;
