import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";


import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBquEyvpqGASTp-l1357gLk8_uVnTmh_mA",
    authDomain: "hackaton-41ebc.firebaseapp.com",
    projectId: "hackaton-41ebc",
    storageBucket: "hackaton-41ebc.appspot.com",
    messagingSenderId: "678393815822",
    appId: "1:678393815822:web:c8dd188c431ce8f2f12d5f",
    measurementId: "G-L1F9Q2QFHP"
};
import {
    doc, getDoc, getFirestore, query, collection, where, getDocs, addDoc, updateDoc, onSnapshot, orderBy
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
let name;
let email;
let password;
function Login() {
    let login_email = document.getElementById("login_email")
    let login_password = document.getElementById("login_password")
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                name = docSnap.data().name
                email = docSnap.data().email
                password = docSnap.data().password
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("not login", errorMessage)
        });
}
let login_btn = document.getElementById("login_btn")
login_btn.addEventListener("click", Login)
// window.onload = async () => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             if (!user.emailVerified) {
//                 // sendEmailVerification(auth.currentUser)
//                 //   .then(() => {
//                 //     console.log("Email sent");
//                 //   })
//                 //   .catch((err) => console.log(err));
//             }
//             getUserFromDataBase(user.uid);
//         } else {
//             console.log("not login");
//         }
//     });
// };
// const getUserFromDataBase = async (uid) => {
//     const docRef = doc(db, "users", uid);
//     const docSnap = await getDoc(docRef);
//     let currentUser = document.getElementById("current-user");
//     if (docSnap.exists()) {
//         let profile = document.getElementById("profile");
//         profile.src = docSnap.data().profile;
//         currentUser.innerHTML = `${docSnap.data().name} (${docSnap.data().email})`;
//         getAllUsers(docSnap.data().email, uid, docSnap.data().name);
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// };

// const getAllUsers = async (email, currentId, currentName) => {
//     const q = query(collection(db, "users"), where("email", "!=", email));
//     const querySnapshot = await getDocs(q);
//     let users = document.getElementById("users");
//     querySnapshot.forEach((doc) => {
//         users.innerHTML += `<li>${doc.data().name} <button onclick='startChat("${doc.id
//             }","${doc.data().name
//             }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`;
//     });
// };

// let unsubscribe;

// let startChat = (id, name, currentId, currentName) => {
//     if (unsubscribe) {
//         unsubscribe();
//     }
//     let chatWith = document.getElementById("chat-with");
//     chatWith.innerHTML = name;
//     let send = document.getElementById("send");
//     let message = document.getElementById("message");
//     let chatID;
//     if (id < currentId) {
//         chatID = `${id}${currentId}`;
//     } else {
//         chatID = `${currentId}${id}`;
//     }
//     loadAllChats(chatID, currentId);
//     send.addEventListener("click", async () => {
//         let allMessages = document.getElementById("all-messages");
//         allMessages.innerHTML = "";
//         await addDoc(collection(db, "messages"), {
//             sender_name: currentName,
//             receiver_name: name,
//             sender_id: currentId,
//             receiver_id: id,
//             chat_id: chatID,
//             message: message.value,
//             timestamp: new Date(),
//         });
//     });
// };

// const loadAllChats = (chatID, currentId) => {
//     try {
//         const q = query(
//             collection(db, "messages"),
//             where("chat_id", "==", chatID),
//             orderBy("timestamp", "asc")
//         );
//         let allMessages = document.getElementById("all-messages");
//         unsubscribe = onSnapshot(q, (querySnapshot) => {
//             allMessages.innerHTML = "";
//             querySnapshot.forEach((doc) => {
//                 let className =
//                     doc.data().sender_id === currentId ? "my-message" : "user-message";
//                 allMessages.innerHTML += `<li class="${className}">${doc.data().sender_name
//                     }: ${doc.data().message}</li>`;
//             });
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// window.startChat = startChat;

// let uploadBtn = document.getElementById("upload-btn");

// uploadBtn.addEventListener("click", async () => {
//     let myFile = document.getElementById("my-file");
//     let file = myFile.files[0];
//     const auth = getAuth();
//     let uid = auth.currentUser.uid;
//     let url = await uploadFiles(file);
//     const washingtonRef = doc(db, "users", uid);
//     await updateDoc(washingtonRef, {
//         profile: url,
//     });
// });

// const uploadFiles = (file) => {
//     return new Promise((resolve, reject) => {
//         const storage = getStorage();
//         const auth = getAuth();
//         let uid = auth.currentUser.uid;
//         const storageRef = ref(storage, `users/${uid}.png`);
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//                 const progress =
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log("Upload is " + progress + "% done");
//                 switch (snapshot.state) {
//                     case "paused":
//                         console.log("Upload is paused");
//                         break;
//                     case "running":
//                         console.log("Upload is running");
//                         break;
//                 }
//             },
//             (error) => {
//                 reject(error);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     resolve(downloadURL);
//                 });
//             }
//         );
//     });
// }; 