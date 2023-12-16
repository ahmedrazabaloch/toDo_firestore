import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFzlac5dAHtegd9wZLAyn8l6M3fhwQ0lo",
  authDomain: "todo-ar-firestore.firebaseapp.com",
  projectId: "todo-ar-firestore",
  storageBucket: "todo-ar-firestore.appspot.com",
  messagingSenderId: "181272773233",
  appId: "1:181272773233:web:8a5813f6e6d0fa8e3851d0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
};
