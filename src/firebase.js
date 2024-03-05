// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCEghLWTUo_3YZwx3g7SFvx8fp6tVsL8_g',
	authDomain: 'productsproject-2fef2.firebaseapp.com',
	projectId: 'productsproject-2fef2',
	storageBucket: 'productsproject-2fef2.appspot.com',
	messagingSenderId: '996475148861',
	appId: '1:996475148861:web:ff84bb53a637f263f3e854',
	databaseURL:
		'https://productsproject-2fef2-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app); // ref - на нашу базу данных
