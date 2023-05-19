import React from "react";
import ReactDOM from "react-dom";
import Cable from "../.././Dropwire.js"; //"react-dropwire"; //
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

const firestore = getFirestore(firebase);
class Profile extends React.Component {
  state = { user: {} };
  componentDidMount = async () => {
    this.loadUser();
  };
  componentDidUpdate = async (prevProps) => {
    if (this.props.e !== prevProps.e) {
      this.loadUser();
    }
  };
  loadUser = async () => {
    var user = await getDoc(doc(firestore, "users", this.props.e));
    if (user.exists()) this.setState({ user: { ...user.data(), id: user.id } });
  };
  render() {
    const { user } = this.state;
    return !user ? null : (
      <div onClick={() => this.props.action(user)}>{user.username}</div>
    );
  }
}

export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const setting = (n, more) => {
      return {
        style: {
          color: this.state["hoverin" + n] ? "rgb(50,70,90)" : "black",
          cursor: "pointer",
          ...more
        },
        onMouseEnter: () => this.setState({ ["hoverin" + n]: true }),
        onMouseLeave: () => this.setState({ ["hoverin" + n]: false })
      };
    };
    const setting2 = (n, more) => {
      return {
        style: {
          color: this.state["hoverin" + n]
            ? "rgb(80,100,120)"
            : "rgb(50,70,90)",
          cursor: "pointer",
          ...more
        },
        onMouseEnter: () => this.setState({ ["hoverin" + n]: true }),
        onMouseLeave: () => this.setState({ ["hoverin" + n]: false })
      };
    };
    console.log(this.props.company);
    return (
      <div>
        {this.props.company.requestingadmin && (
          <div>
            <div
              onClick={() =>
                this.setState({
                  checkrequestingadmin: !this.state.checkrequestingadmin
                })
              }
            >
              {this.props.company.requestingadmin.length} requesting admin
            </div>
            {this.props.company.requestingadmin.map((e) => (
              <Profile
                key={"requestingadmin" + e}
                company={this.props.company}
                e={e}
                action={(e) => {
                  const answer = window.confirm(
                    "allow " + e.username + " to be an admin?"
                  );
                  answer &&
                    updateDoc(
                      doc(firestore, "companies", this.props.company.id),
                      {
                        requestingadmin: arrayRemove(e),
                        admin: arrayUnion(e)
                      }
                    );
                }}
              />
            ))}
          </div>
        )}
        {this.props.company.requestingemployment && (
          <div>
            <div
              onClick={() =>
                this.setState({
                  checkrequestingemploy: !this.state.checkrequestingemploy
                })
              }
            >
              {this.props.company.requestingemployment.length} requesting
              proposals to bid employment
            </div>
            {this.props.company.requestingemployment.map((e) => (
              <Profile
                key={"requestingemployment" + e}
                company={this.props.company}
                e={e}
                action={(e) => {
                  const answer = window.confirm("hire " + e.username + "?");
                  answer &&
                    updateDoc(
                      doc(firestore, "companies", this.props.company.id),
                      {
                        requestingemployment: arrayRemove(e),
                        employees: arrayUnion(e)
                      }
                    );
                }}
              />
            ))}
          </div>
        )}
        <Proposals
          company={this.props.company}
          auth={this.props.auth}
          isAdmin={this.props.isAdmin}
          history={this.props.history}
          pathname={this.props.pathname}
          setting={setting}
        />
      </div>
    );
  }
}
