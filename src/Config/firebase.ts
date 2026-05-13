import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr0n8_7JjRbFVsvd0ic0oZTjl6CXrULnk",
  authDomain: "front-end-projeto1.firebaseapp.com",
  projectId: "front-end-projeto1",
  storageBucket: "front-end-projeto1.firebasestorage.app",
  messagingSenderId: "49999469755",
  appId: "1:49999469755:web:3e273cad9b164791c01d9e",
  measurementId: "G-LJQ602TEHN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
