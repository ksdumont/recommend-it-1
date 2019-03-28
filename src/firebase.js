import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyD711Iqma6T5ByyPxKDBE7ZffNr63QVnw0",
  authDomain: "recommendit-6a6b2.firebaseapp.com",
  databaseURL: "https://recommendit-6a6b2.firebaseio.com",
  projectId: "recommendit-6a6b2",
  storageBucket: "recommendit-6a6b2.appspot.com",
  messagingSenderId: "868413591546"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
