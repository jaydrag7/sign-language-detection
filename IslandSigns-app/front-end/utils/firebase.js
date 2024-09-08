// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7u3C15gCyjadyNfV68TUXYGDf3YBs_6o",
  authDomain: "islandsigns-99848.firebaseapp.com",
  databaseURL: "https://islandsigns-99848-default-rtdb.firebaseio.com",
  projectId: "islandsigns-99848",
  storageBucket: "islandsigns-99848.appspot.com",
  messagingSenderId: "301158096115",
  appId: "1:301158096115:web:4a8879477c1439387a2b86",
  measurementId: "G-L0W2V2MDFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);


export{
  db,
  auth
}