import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBKV93pVyH4Ayc7NhDjB9hFdZYT8ME8x7c",
	authDomain: "bookstore-62813.firebaseapp.com",
	projectId: "bookstore-62813",
	storageBucket: "bookstore-62813.appspot.com",
	messagingSenderId: "146064125723",
	appId: "1:146064125723:web:d769b28630011dbe476dbe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { app, db };
