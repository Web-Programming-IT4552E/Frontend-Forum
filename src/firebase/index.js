import firebase, { initializeApp } from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAT8Cky7hDDnXaLEUaX5psnHgJTr6dRHFA",
	authDomain: "candle-upload-image.firebaseapp.com",
	projectId: "candle-upload-image",
	storageBucket: "candle-upload-image.appspot.com",
	messagingSenderId: "710341271634",
	appId: "1:710341271634:web:4376e9abe3b1923b72bf8b",
	measurementId: "G-ZZRD4Z2Y99",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
