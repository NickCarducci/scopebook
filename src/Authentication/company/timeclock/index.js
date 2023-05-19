import React from "react";
import firebase from "../../.././init-firebase.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  arrayUnion,
  addDoc,
  getDoc,
  updateDoc,
  setDoc,
  increment,
  query,
  where,
  deleteDoc,
  getDocs,
  arrayRemove
} from "firebase/firestore";
import Proposals from ".././proposals";

const firestore = getFirestore(firebase);
export default class Timeclock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openTask = () => {};
  render() {
    return <div></div>;
  }
}
