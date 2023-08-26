// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDzey3J7ZKD7ZnzgMzg4LRRVVUh-bDYYFU',
    authDomain: 'mern-teahouse.firebaseapp.com',
    projectId: 'mern-teahouse',
    storageBucket: 'mern-teahouse.appspot.com',
    messagingSenderId: '55319723032',
    appId: '1:55319723032:web:8742eb241652827a26976d',
    measurementId: 'G-H5L14128XN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
