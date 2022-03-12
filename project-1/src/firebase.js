import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment } from  "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8qy5zZPvuvOFlPTiv21uElEVoJgFa3q4",
    authDomain: "d-and-d-project-e0c45.firebaseapp.com",
    projectId: "d-and-d-project-e0c45",
    storageBucket: "d-and-d-project-e0c45.appspot.com",
    messagingSenderId: "109482561895",
    appId: "1:109482561895:web:ae329cc6c1ba6732531fc2"
};

const likedDogsPath = "df-liked-dogs/";

const pushLikedDogToCloud = dog => {
  dog.likes = increment(1);
  const db = getDatabase();
  const favRef = ref(db, `${likedDogsPath}${dog.hash}`);
  set(favRef, dog); // `dog` is an object with `.title`, `.url`, `.likes` properties etc
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

export {db,likedDogsPath,ref,set,push,pushLikedDogToCloud,onValue};