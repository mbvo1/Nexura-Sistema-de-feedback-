const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDlDzdNjARu1D_7Tf0JalwWnQc30aUajpg",
  authDomain: "nexura-sistema-feedback.firebaseapp.com",
  projectId: "nexura-sistema-feedback",
  storageBucket: "nexura-sistema-feedback.firebasestorage.app",
  messagingSenderId: "855639588380",
  appId: "1:855639588380:web:750b564e7e3238b8ff69d9",
  measurementId: "G-81JNZYGM26"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = { db };