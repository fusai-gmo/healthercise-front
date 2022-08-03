// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOXUoWxVKSsATo5yWtO7Fjyxav39TLyLE",
  authDomain: "debt-kun.firebaseapp.com",
  projectId: "debt-kun",
  storageBucket: "debt-kun.appspot.com",
  messagingSenderId: "976727588973",
  appId: "1:976727588973:web:6b972b2e1e23ebdfdd3f64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authorized = getAuth(app);

export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.provide('firebaseApp',app);
  nuxtApp.provide('auth',authorized);
  nuxtApp.provide('provider',new GoogleAuthProvider());
})