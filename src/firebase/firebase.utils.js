import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyC-gc52nP1iU2sxl52WRaANnRc4uRkejQM",
    authDomain: "crwn-db-60469.firebaseapp.com",
    projectId: "crwn-db-60469",
    storageBucket: "crwn-db-60469.appspot.com",
    messagingSenderId: "697679496964",
    appId: "1:697679496964:web:ecc3cf17fbd7ef363e7251",
    measurementId: "G-L3SZVZJ16G"
};
export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if (!userAuth)return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error){
            console.log('error creating user,',error.message)
        }
    }
    return userRef
}

// firebase.initializeApp(config)
firebase.initializeApp(config);

export const auth =  firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
