import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-database'

const config = {
	apiKey: "AIzaSyBONNeeTvb6fNbrn8pZ_1sPmDUVjaMm3pw",
	authDomain: "test-39012.firebaseapp.com",
	databaseURL: "https://test-39012.firebaseio.com",
	projectId: "test-39012",
	storageBucket: "test-39012.appspot.com",
	messagingSenderId: "377823902565",
	appId: "1:377823902565:web:7f222f5c4637f2c9"
  };

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.database()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.ref(`test/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		return await this.db.ref(`test/${this.auth.currentUser.uid}`).once("value").then(snap => {
			console.log(snap.val())
			return 11
		})
    }
    async getData() {
		return await this.db.ref(`users`).once("value").then(snap => {
			return snap.val()
		})
	}
	async setData(ref, data) {
		return await this.db.ref(ref).set({
			data
		})
	}
}

export default new Firebase()