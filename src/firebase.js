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

  async getFollowings() {
    const followedAuthors = [];
    const followings = await this.db
      .collection("followings")
      .where("follower", "==", this.auth.currentUser.uid)
      .get();

    followings.forEach(val => {
      followedAuthors.push(val.data().author);
    });

    return followedAuthors;
  }

  async countFollowings(author) {
    let count = 0;
    let followings = await this.db
      .collection("followings")
      .where("author", "==", author)
      .get();
    followings.forEach(val => {
      count++;
    });
    return count;
  }

  addFollowing(author) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db.collection("followings").add({
      follower: this.auth.currentUser.uid,
      author: author,
      lookupkey: `${this.auth.currentUser.uid}_${author}`
    });
  }

  async removeFollowing(author) {
    const following = await this.db
      .collection("followings")
      .where("lookupkey", "==", `${this.auth.currentUser.uid}_${author}`)
      .get();
    let docID;
    following.forEach(val => (docID = val.id));
    return this.db
      .collection("followings")
      .doc(docID)
      .delete();
  }

  async getRecommendation(id) {
    const recommendation = await this.db
      .collection("recommendations")
      .doc(id)
      .get();
    return recommendation;
  }

  addRecommendation(recommendation) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db.collection("recommendations").add({
      recommendation
    });
  }

  updateRecommendation(id, recommendation) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("recommendations")
      .doc(id)
      .update({
        recommendation
      });
  }

  deleteRecommendation(id) {
    return this.db
      .collection("recommendations")
      .doc(id)
      .delete();
  }

  async addAuthor() {
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

  async getAuthors() {
    const authors = await this.db.collection("authors").get();
    return authors;
  }
}

export default new Firebase();
