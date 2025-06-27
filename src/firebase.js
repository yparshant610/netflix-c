import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";

import { 
    addDoc, 
    collection, 
    getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAJjGDeHPBzdyy2wRdsGr1R51RB-e0rlik",
  authDomain: "netflix-clone-pary.firebaseapp.com",
  projectId: "netflix-clone-pary",
  storageBucket: "netflix-clone-pary.firebasestorage.app",
  messagingSenderId: "29393906951",
  appId: "1:29393906951:web:47b87149b4ab6749a369a2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
   try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
   } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
   } 
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));      
    }
}

const logout = ()=>{
    signOut(auth);
}

export { auth, db, login, signup, logout};