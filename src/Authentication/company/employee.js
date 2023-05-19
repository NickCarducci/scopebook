import React from "react";
import firebase from ".././init-firebase.js";
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

const firestore = getFirestore(firebase);
export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    return (
      <div>
        <div
          onClick={() => {
            this.openTask();

            updateDoc(doc(firestore, "companies", this.props.company.id), {
              requestingadmin:
                !this.props.company.requestingadmin ||
                !this.props.company.requestingadmin.includes(
                  this.props.auth.uid
                )
                  ? arrayUnion(this.props.auth.uid)
                  : arrayRemove(this.props.auth.uid)
            });
          }}
          id="new admin"
          onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
          onMouseLeave={() => this.setState({ hovering: "" })}
          style={{
            ...styleOption,
            border: `2px solid ${color("new admin")}`
          }}
        >
          request
          {this.props.company.requestingadmin &&
            this.props.company.requestingadmin.includes(this.props.auth.uid) &&
            "ed"}{" "}
          to be admin
        </div>
        <div>Timeclock</div>
      </div>
    );
  }
}
