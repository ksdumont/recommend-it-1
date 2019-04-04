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

  async getAuthors() {
    const authors = await this.db.collection("authors").get();
    return authors;
  }

  async getRecommendations() {
    const recommendations = await this.db.collection("recommendations").get();
    return recommendations;
  }
  async getRecommendationsByCategory(category) {
    const recommendations = await this.db
      .collection("recommendations")
      .where("recommendation.category", "==", category)
      .get();
    return recommendations;
  }
  async getRecommendationsByAuthor(author) {
    const recommendations = await this.db
      .collection("recommendations")
      .where("recommendation.author", "==", author)
      .get();
    return recommendations;
  }

  async getRecommendation(id) {
    const recommendation = await this.db
      .collection("recommendations")
      .doc(id)
      .get();
    return recommendation;
  }

  async updateRecommendation(id, recommendation) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }
    return this.db
      .collection("recommendations")
      .doc(id)
      .update({ recommendation });
  }

  addRecommendation(recommendation) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db.collection("recommendations").add({
      recommendation
    });
  }

  async addUser() {
    const author = await this.db
      .collection("authors")
      .where("uid", "==", this.auth.currentUser.uid)
      .get();
    let count = 0;
    author.forEach(val => {
      count++;
    });
    if (!count) {
      return this.db.collection("authors").add({
        uid: this.auth.currentUser.uid,
        username: this.auth.currentUser.displayName
      });
    } else {
      return true;
    }
  }

  deleteRecommendation(id) {
    return this.db
      .collection("recommendations")
      .doc(id)
      .delete();
  }
}

export default new Firebase();
