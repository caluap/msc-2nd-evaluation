import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8_IFyeBoUXctrp0eeziX_-z0eiecl00k",
  authDomain: "msc-2nd-evaluation.firebaseapp.com",
  databaseURL: "https://msc-2nd-evaluation.firebaseio.com",
  projectId: "msc-2nd-evaluation",
  storageBucket: "msc-2nd-evaluation.appspot.com",
  messagingSenderId: "651937407659"
});

console.log(firebaseApp);

export const db = firebaseApp.firestore();
console.log(db);
