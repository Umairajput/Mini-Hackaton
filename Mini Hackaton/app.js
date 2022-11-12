import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";


import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBquEyvpqGASTp-l1357gLk8_uVnTmh_mA",
    authDomain: "hackaton-41ebc.firebaseapp.com",
    projectId: "hackaton-41ebc",
    storageBucket: "hackaton-41ebc.appspot.com",
    messagingSenderId: "678393815822",
    appId: "1:678393815822:web:c8dd188c431ce8f2f12d5f",
    measurementId: "G-L1F9Q2QFHP"
};
import { doc, setDoc, getFirestore, } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
function SignUp() {
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name: name.value,
                email: email.value,
                password: password.value
            });
            console.log("run anyway", user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error", errorMessage)
        });
    window.open("login.html")
}
let btn = document.getElementById("btn")
btn.addEventListener("click", SignUp)
