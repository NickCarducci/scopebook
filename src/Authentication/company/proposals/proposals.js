import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Proposal from "./proposal.js";

import ReactDatePicker from "react-datepicker";
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
  arrayRemove, //marx attacks debri//argument without holes, "don't combine" wassup dog
  deleteField
} from "firebase/firestore";

const firestore = getFirestore(firebase);
export default class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      proposalsAccount: [],
      proposalsClient: [],
      nav: "List", //defaults (as if) !this.props.isAdmin && nav==="List"
      viewAccount: "miscellaneous",
      viewAuthor: "",
      authors: [],
      authorProfiles: []
    };
    this.portals = {};
    props.proposals.forEach((proposal, i) => {
      this.portals[i] = React.createRef();
    });
    this.portal = React.createRef();
  }
  componentWillUnmount = () => {
    clearInterval(this.int);
  };
  openTask = () => {};

  componentDidMount = () => {};

  render() {
    const { willCall } = this.state;
    const { proposals } = this.props;
    const makeFancy = (d, sh = "/") => {
      //console.log(d);
      return isNaN(d)
        ? ""
        : d.getMonth() + 1 + `${sh + d.getDate() + sh + d.getFullYear()}`;
    };
    //console.log(this.state.proposal);
    return (
      <div>
        {/*&& !proposal.willCall*/
        /*|| this.state.proposal*/}{" "}
        {
          //this.props.details === proposal.id && (
        }
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {proposals.length < 1
            ? this.props.isAdmin
              ? "no rfps yet"
              : ""
            : proposals.map((proposal, i) => {
                return (
                  <Proposal
                    willCall={this.state.willCall}
                    ref={{ portal: this.portal /*s[i]*/ }}
                    details={this.state.details}
                    setProposalDetail={(proposal) => this.setState(proposal)}
                    newlymodified={
                      this.state.mountedmodificationid === proposal.id
                    }
                    makeFancy={makeFancy}
                    key={proposal.name + proposal.id}
                    proposal={proposal}
                    i={i}
                    company={this.props.company}
                    auth={this.props.auth}
                    isAdmin={this.props.isAdmin}
                    //proposal={this.state.proposal}
                  />
                );
              })}
        </div>
        <div
          style={{
            display: this.state.proposal ? "block" : "none",
            position: "fixed",
            top: "0px",
            width: "100%",
            right: "0px",
            zIndex: "1"
          }}
        >
          <ReactDatePicker
            ref={this.portal}
            placeholderText="Will Call"
            selected={
              this.state.proposal && this.state.proposal.willCall
                ? this.state.proposal.willCall * 1000
                : willCall
            }
            onCalendarClose={() => this.setState({ proposal: null })}
            onChange={(date) => {
              //console.log(new Date(date).getTime());
              this.setState(
                {
                  willCall: date
                },
                () => {
                  if (!this.props.isAdmin) return null;
                  const dt = new Date(date);
                  //console.log(this.props.makeFancy(dt));
                  const answer = window.confirm(
                    "update will call to " +
                      makeFancy(dt) +
                      " for the same price of " +
                      this.state.proposal.cost +
                      "?"
                  );
                  answer &&
                    updateDoc(
                      doc(firestore, "proposals", this.state.proposal.id),
                      {
                        willCall: new Date(date).getTime() / 1000
                      }
                    ).then((proposal) => this.setState({ proposal: null }));
                }
              );
            }}
            //withPortal //portalId="root-portal"
          />
        </div>
      </div>
    );
  }
}
