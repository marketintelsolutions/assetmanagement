// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { disableNetwork, doc, enableNetwork, getDoc, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: "pacam-51069",
  storageBucket: "pacam-51069.firebasestorage.app",
  messagingSenderId: "388745824318",
  appId: `${process.env.REACT_APP_FIREBASE_API_ID}`,
  measurementId: "G-15W0VTR2J7"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// const forceOnlineMode = async () => {
//   try {
//     // First disable network to reset connection
//     await disableNetwork(db);
//     // Wait a moment
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     // Re-enable network to force fresh connection
//     await enableNetwork(db);
//     console.log('✅ Firestore forced online mode');
//   } catch (error) {
//     console.error('Error forcing online mode:', error);
//   }
// };

// Call this function when your app starts
// forceOnlineMode();

// const testDoc = doc(db, 'test', 'connection');

// getDoc(testDoc)
//   .then(() => console.log('✅ Basic Firestore access works'))
//   .catch(err => console.error('❌ Firestore access failed:', err))
