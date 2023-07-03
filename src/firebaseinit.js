// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJX-CbIFV5B0MXkS0lnuAZ0TWZnHj6lI4",
  authDomain: "busybuy-cb839.firebaseapp.com",
  projectId: "busybuy-cb839",
  storageBucket: "busybuy-cb839.appspot.com",
  messagingSenderId: "768952955863",
  appId: "1:768952955863:web:57cfd2850268e9e7805192"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};

