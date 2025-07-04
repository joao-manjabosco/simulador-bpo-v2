import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeJO3zIDJpBxHOmJPLHOQJacRsQ-RPBKs",
  authDomain: "simulador-bpo.firebaseapp.com",
  projectId: "simulador-bpo",
  storageBucket: "simulador-bpo.firebasestorage.app",
  messagingSenderId: "597279325224",
  appId: "1:597279325224:web:9a5f98f21ecae8778cc91d",
  measurementId: "G-JL9BLPTVL1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };

