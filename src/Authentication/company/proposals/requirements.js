import React from "react";
import ReactDOM from "react-dom";
import firebase from "../.././init-firebase.js";
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
  arrayRemove,
  deleteField
} from "firebase/firestore";

const firestore = getFirestore(firebase);
export default class Requirements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      author: { username: "" },
      admin: [],
      employees: [],
      loadedImgs: [],
      newRequest: { name: "" },
      requirements: []
    }; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
    for (let i = 0; i < 250; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  openTask = () => {};

  componentDidMount = () => {
    onSnapshot(
      query(
        collection(firestore, "requirements"),
        where("proposalId", "==", this.props.proposal.id)
      ),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.exists()) {
            var foo = doc.data();
            if (foo.name) {
              foo.id = doc.id;
              const requirements = [
                ...this.state.requirements.filter((x) => x.id !== foo.id),
                foo
              ];
              this.setState(
                {
                  requirements
                },
                () => this.props.setBoard(requirements)
              );
            }
          }
        });
      }
    ); //boycott credit;-;;; save rats
  };
  render() {
    const space = " ";
    //if (pho1)
    //pho1.onload = `javascript: window.loadedImgs: [...window.loadedImgs, ${"author"}];`;
    //console.log(pho1.currentTarget);
    return (
      <div
        style={{
          margin: "4px 10px",
          color: "rgb(120,90,80)",
          //backgroundColor: "rgb(0,0,20)",
          //color: "rgb(230,230,230)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {this.state.requirements.length < 1 ? (
          <span
            style={{
              padding: "3px 7px",
              borderRadius: "10px",
              border: "4px solid rgb(120,90,80)"
            }}
          >
            as written
          </span>
        ) : (
          this.state.requirements.map((e, i) => {
            return (
              <div
                key={"requirements" + e.id}
                style={{
                  color: "black",
                  padding: "3px 7px",
                  borderRadius: "10px",
                  border: "4px solid rgb(120,90,80)"
                }}
              >
                {e.name}
              </div>
            );
          })
        )}
      </div>
    );
  }
}
