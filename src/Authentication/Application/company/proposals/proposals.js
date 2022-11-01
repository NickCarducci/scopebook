import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Proposal from "./proposal.js";

import ReactDatePicker from "react-datepicker";
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
    const { proposals } = this.props;
    const makeFancy = (d, sh = "/") => {
      //console.log(d);
      return isNaN(d)
        ? ""
        : d.getMonth() + 1 + `${sh + d.getDate() + sh + d.getFullYear()}`;
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            overflow: "hidden",
            height: "0px",
            width: "0px",
            position: "relative",
            zIndex: this.state.editWillCall ? "1" : "-10"
          }}
        >
          {/*&& !e.willCall*/
          /*|| this.state.editWillCall*/}{" "}
          {
            //this.props.details === e.id && (
            <ReactDatePicker
              ref={this.portal}
              placeholderText="Will Call"
              selected={
                this.state.editWillCall && this.state.editWillCall.willCall
                  ? this.state.editWillCall.willCall * 1000
                  : this.state.willCall
              }
              onCalendarClose={() => this.setState({ editWillCall: null })}
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
                        this.state.editWillCall.cost +
                        "?"
                    );
                    answer &&
                      updateDoc(
                        doc(firestore, "proposals", this.state.editWillCall.id),
                        {
                          willCall: new Date(date).getTime() / 1000
                        }
                      ).then((e) => this.setState({ editWillCall: null }));
                  }
                );
              }}
              withPortal //portalId="root-portal"
            />
          }
        </div>
        {proposals.length < 1
          ? this.props.isAdmin
            ? "no rfps yet"
            : ""
          : proposals.map((e, i) => {
              return (
                <Proposal
                  willCall={this.state.willCall}
                  ref={{ portal: this.portal /*s[i]*/ }}
                  details={this.state.details}
                  setProposalDetail={(e) => this.setState(e)}
                  newlymodified={this.state.mountedmodificationid === e.id}
                  makeFancy={makeFancy}
                  key={e.name + e.id}
                  e={e}
                  i={i}
                  company={this.props.company}
                  auth={this.props.auth}
                  isAdmin={this.props.isAdmin}
                />
              );
            })}
      </div>
    );
  }
}
