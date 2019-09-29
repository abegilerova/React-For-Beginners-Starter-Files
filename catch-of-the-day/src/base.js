import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCSJr3QqMW6X11Hi_oWCzyVJuyu401zELw",
    authDomain: "catch-of-the-day-aika.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-aika.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());


//this is named export

export { firebaseApp };

//this is a default export

export default base;

