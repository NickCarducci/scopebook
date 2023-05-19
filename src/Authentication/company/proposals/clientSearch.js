import React from "react";
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
  arrayRemove
} from "firebase/firestore";
const firestore = getFirestore(firebase);
class Result extends React.Component {
  state = { users: [] };
  openTask = () => {};
  render() {
    const { e } = this.props;
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    return (
      //!viewUser ||
      //e.id === viewUser &&
      <div
        style={{
          cursor: "pointer",
          alignItems: "center",
          display: "flex"
        }}
        key={e.username + e.id}
      >
        <div
          onClick={() => {
            this.openTask();
            this.props.clientFilter(e.id);
            //this.props.history.push("/" + e.username);
            /*this.setState({
              viewUser: !viewUser && e.id
            });*/ //corporate prmium 80% market cap bonds
            //new bonds, cancel corresponding bonds, or keep bonds
            //deflationary (lt) unemployment of short term employment
            //"stop maing education a business," save the rats
          }}
          id={e.username}
          onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
          onMouseLeave={() => this.setState({ hovering: "" })}
          style={{
            ...styleOption,
            border: `2px solid ${color(e.username)}`
          }}
        >
          {e.username}
        </div>
      </div>
    );
  }
}
//How many girls shows one to be "good with the girls"?
//you gonna have an orgy now? fucking joke
class ClientSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], fetchingComments: null, viewUsername: "" };
  }

  componentDidMount = () => {
    //this.hydrateAllUsers();diverse important
    //this.pathUser();
  };
  componentDidUpdate = (prevProps) => {
    /*if (prevProps.auth !== this.props.auth)
      this.props.auth.uid && this.hydrateAllUsers();*/
    //if (prevProps.pathname !== this.props.pathname) this.pathUser();
  };
  pathUser = (nameAsArray) => {
    var compound = null;
    if (nameAsArray) {
      compound = query(
        collection(firestore, "users"),
        where("usernameAsArray", "array-contains", nameAsArray)
      );
    } else {
      /*compound = query(
        collection(firestore, "users"),
        where("username", "==", this.props.pathname.split("/")[1].toLowerCase())
      );*/
    }
    onSnapshot(compound, (snapshot) =>
      this.setState({ users: [] }, () => {
        const { docs } = snapshot;
        //console.log(docs);//Fh
        if (docs.length !== 0) {
          if (nameAsArray || docs.length > 1) {
            const users = docs.map((foo) => {
              return { ...foo.data(), id: foo.id };
            });
            //console.log(users);
            this.setState({
              users //: docs.length === 1 ? [users] : users
            }); //why can't you combine words!
          } else {
            //crime
            //console.log(viewUser.id);
            //if (viewUser.exists()) viewUser = { ...viewUser.data(), id: viewUser.id };

            const user = this.state.users.find((e) => e.id === docs[0].id);
            if (user) {
              this.setState({ viewUser: user.id });
            } else if (docs[0].exists()) {
              /*              onSnapshot(
                doc(
                  firestore,
                  "users",
                  docs[0].id //CompanyId.split("/" + e.companyId)[0]
                ),
                (doc) => {*/
              var foo = docs[0].data();
              foo.id = docs[0].id;
              //console.log(foo);
              this.setState({
                viewUserOk: foo
              });
            }
          }
          //);}
        } //if (this.props.pathname !== "/")
        /*this.setState({
            viewUser: "none"
          });*/
        else
          return console.log("no users for this client username array search");
      })
    );
  };
  hydrateAllUsers = () => {
    //var users = [];
    //console.log(this.props.auth.uid);
    onSnapshot(
      query(
        collection(firestore, "users")
        //where("authorId", "==", this.props.auth.uid)
      ),
      //{ includeMetadataChanges: true },
      (snapshot) => {
        /*snapshot.docChanges().forEach((change) => {
          //if (doc.exists()) {
          var modified = null;
          switch (change.type) {
            case "added":
              modified = !change.doc.metadata.hasPendingWrites;
              break;
            case "modified":
              modified = change.doc.metadata.hasPendingWrites;
              break;
            case "removed":
              break;
            default:
              console.log("default: ", change);
          }
          if (!modified) return null;
          var foo = change.doc.data();
          //console.log(foo);
          if (foo.username === "user") {
            foo.id = change.doc.id;
            this.setState({
              users: [
                ...this.state.users.filter((x) => x.id !== foo.id),
                foo
              ]
            });
          }
          //}
        });*/
        snapshot.docs.forEach((doc) => {
          //if (doc.metadata.hasPendingWrites && doc.exists()) {
          if (doc.exists()) {
            var foo = doc.data();
            if (foo.username) {
              //console.log(foo);
              foo.id = doc.id;
              this.props.setAdminSearch({
                users: [...this.state.users.filter((x) => x.id !== foo.id), foo]
              });
            }
          }
        });
      }
    );
  };
  render() {
    const { viewUser, viewUserOk } = this.state;
    const users = this.state.users.filter((x) => !x.deleted);
    //const user = users.find((e) => e.id === viewUser);
    return (
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {(!viewUser || viewUser !== "none") && !viewUserOk && (
          <h4
            onClick={this.props.selectinstead}
            {...this.props.setting(7, {
              marginBottom: "10px",
              width: "120px",
              cursor: "pointer"
            })}
          >
            Who is the client whom you would like a report on?
          </h4>
        )}
        {!viewUser && !viewUserOk && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.props.history.push("/" + this.state.viewUsername); //"not possible 'breakthrough'" we don't see generation but mutatioon.
              //why is generation not used to describe endocytosis insemination of amino carbon
            }}
          >
            <div style={{ position: "absolute", left: "-10px" }}>
              {this.state.viewUsername !== "" &&
                this.state.fetchingComments !== null && (
                  <span>.{!this.state.fetchingComments && <span>.</span>}</span>
                )}
            </div>
            <input
              maxLength={26}
              required={true}
              minLength={2}
              state={this.state.viewUsername}
              placeholder={
                viewUser ? this.props.pathname.split("/")[1] : "username"
              }
              id="viewUsername"
              onChange={(e) =>
                this.setState(
                  {
                    [e.target.id]: e.target.value,
                    searching: true
                  },
                  () => {
                    clearInterval(this.int);
                    this.int = setInterval(() => {
                      if (this.state.fetchingComments === null) {
                        this.setState({ fetchingComments: true });
                      } else if (this.state.fetchingComments) {
                        this.setState({ fetchingComments: false });
                      } else {
                        this.setState({ fetchingComments: null });
                      }
                    }, 600);
                    clearTimeout(this.searchin);
                    this.searchin = setTimeout(() => {
                      this.pathUser(this.state.viewUsername);
                      this.setState(
                        { searching: false, fetchingComments: null },
                        () => {
                          clearInterval(this.int);
                        }
                      );
                    }, 2000);
                  }
                )
              }
              authocomplete="off"
              style={{
                opacity: this.state.searching ? 1 : 0.5
              }}
            />
          </form>
        )}
        {viewUserOk ? (
          <div onClick={() => this.props.clientFilter(viewUserOk.id)}>
            {this.state.viewUserOk.usernme}
          </div>
        ) : users.length < 1 ? (
          <div>{this.state.viewUsername}</div>
        ) : (
          //ohh certainly - ut for lawyer ones (german?)
          //Is inflation not best analyzed by a concurrentable value basis as the cash to debt ratio of consumption rather than year to year interest?
          users.map(
            (e) =>
              this.state.viewUsername !== "" && (
                <Result
                  key={"result" + e.id}
                  e={e}
                  history={this.props.history}
                  setAdminSearch={(e) => this.setState(e)}
                  clientFilter={this.props.clientFilter}
                />
              )
          )
        )}
      </div>
    );
  }
}

export default ClientSearch;
