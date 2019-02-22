import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8_IFyeBoUXctrp0eeziX_-z0eiecl00k",
  authDomain: "msc-2nd-evaluation.firebaseapp.com",
  databaseURL: "https://msc-2nd-evaluation.firebaseio.com",
  projectId: "msc-2nd-evaluation",
  storageBucket: "msc-2nd-evaluation.appspot.com",
  messagingSenderId: "651937407659"
});

// export let anonUserId = null;
// firebase
//   .auth()
//   .signInAnonymously()
//   .then(
//     function(user) {
//       anonUserId = user.user.uid;
//     },
//     function(err) {
//       console.log(err);
//     }
//   );

export const db = firebaseApp.firestore();
