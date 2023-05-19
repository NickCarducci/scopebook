import React from "react";
import ReactDOM from "react-dom";
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
import Proposals from "./proposals";
import { standardCatch } from "../Sudo.js";

const firestore = getFirestore(firebase);
export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRequest: { name: "" }
    };
  }
  openTask = () => {};
  newRequest = () => {
    this.props.auth !== undefined && //window.alert("login")
      addDoc(collection(firestore, "proposals"), {
        ...this.state.newRequest,
        authorId: this.props.auth.uid, //CompanyId+ "/" + this.props.company.id,
        companyId: this.props.company.id,
        willCall: 0

        //name: this.state.name
      })
        .then(() => {
          this.setState({ newRequest: { name: "" }, draftProposal: false });
        })
        .catch(standardCatch);
  };
  render() {
    const color = (x, set) =>
      set ? "rgb(160,250,200)" : this.state.hovering === x ? "white" : "grey";
    const styleOption = {
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    const id = this.props.auth !== undefined;
    return (
      <div>
        <div style={{ display: "flex" }}>
          {!this.state.draftProposal ? (
            <div
              onClick={() => {
                if (!id) return null;
                this.openTask();

                /*getDocs(
            query(
              collection(firestore, "companies"),
              where("name", "==", this.state.newRequest.name.toLowerCase())
            )
          ).then((snapshot) => {
            if (snapshot.docs.length !== 0) {
              var thisone = snapshot.docs[0];
              if (thisone.exists())
                thisone = { ...thisone.data(), id: thisone.id };*/
                //"investor accredited[, china-social]"
                //to get a lot done for non voters you need to be non-partisan
                //"volunteer[, you're afraid]"
                //"banning[] vs jail afterwards reprise]"
                //"weed allow gun I will[ famously-represent] you"
                var answer = window.confirm(
                  "Want to assign as employee of " +
                    this.props.company.name +
                    "?"
                );
                if (!answer) return null;
                updateDoc(doc(firestore, "companies", this.props.company.id), {
                  requestingemployment:
                    !this.props.company.requestingemployment ||
                    !this.props.company.requestingemployment.includes(
                      this.props.auth.uid
                    )
                      ? arrayUnion(this.props.auth.uid)
                      : arrayRemove(this.props.auth.uid)
                });
              }}
              id="new employee"
              onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
              onMouseLeave={() => this.setState({ hovering: "" })}
              style={{
                ...styleOption,
                border: `2px solid ${color(
                  "new employee",
                  id &&
                    this.props.company.requestingemployment &&
                    this.props.company.requestingemployment.includes(
                      this.props.auth.uid
                    )
                )}`,
                width: "min-content",
                top: "0px",
                marginRight: "15px"
              }}
            >
              <span role="img" aria-label="silhouette">
                &#128100;
              </span>
              {/*request
          {id &&
            this.props.company.requestingemployment &&
            this.props.company.requestingemployment.includes(
              this.props.auth.uid
            ) &&
            "ed"}{" "}
          employ*/}
            </div>
          ) : (
            //truncated by customer wholesale by gumbo
            //right now we have $15k_customer (threshold), to implement
            //max $60/transaction, after $15k_customer
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!id) return null; //we do education for the homeless kids
                this.newRequest(); //non voters don't have kids
              }}
            >
              <input
                state={this.state.newRequest.name}
                placeholder="name"
                id="name"
                onChange={(e) =>
                  this.setState({
                    newRequest: { [e.target.id]: e.target.value }
                  })
                }
                style={{
                  height: "36px",
                  width: "100%",
                  margin: "10px 0px",
                  textIndent: "5px"
                }}
              />
            </form>
          )}
          <div //request proposal
            onClick={() =>
              this.setState({ draftProposal: !this.state.draftProposal })
            }
            id="new proposal"
            onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
            onMouseLeave={() => this.setState({ hovering: "" })}
            style={{
              ...styleOption,
              border: `2px solid ${color("new proposal")}`,
              width: "min-content"
            }}
          >
            {!this.state.draftProposal ? "+" : "back"}
          </div>
        </div>

        <Proposals
          company={this.props.company}
          auth={this.props.auth}
          //hideProposals={this.state.draftProposal}
        />
      </div>
    );
  }
}
