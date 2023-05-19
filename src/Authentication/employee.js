import React from "react";
import RecentlyDeleted from "./recentlydeleted.js";
import firebase from "./init-firebase.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  increment,
  query,
  where,
  deleteDoc
  //getDocs
} from "firebase/firestore";
import Company from "./company";
import { standardCatch } from "./Sudo.js";

const firestore = getFirestore(firebase);
export default class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      newCompany: { name: "", chartOfAccounts: [] }
    }; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
    this.companyCloner = React.createRef();
  }
  openTask = () => {};
  componentDidMount = () => this.hydrateCompanies();
  componentDidUpdate = (prevProps) => {
    if (prevProps.auth !== this.props.auth)
      this.props.auth.uid && this.hydrateCompanies();
  };
  hydrateCompanies = () => {
    //var companies = [];
    //console.log(this.props.auth.uid);
    this.props.auth &&
      onSnapshot(
        query(
          collection(firestore, "companies"),
          where("authorId", "==", this.props.auth.uid)
        ),
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.exists()) {
              var foo = doc.data();
              if (foo.name) {
                foo.id = doc.id;
                this.setState({
                  companies: [
                    ...this.state.companies.filter((x) => x.id !== foo.id),
                    foo
                  ]
                });
              }
            }
          });
        }
      );
    this.props.auth &&
      onSnapshot(
        query(
          collection(firestore, "companies"),
          where("admin", "array-contains", this.props.auth.uid)
        ),
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.exists()) {
              var foo = doc.data();
              if (foo.name) {
                foo.id = doc.id;
                this.setState({
                  companies: [
                    ...this.state.companies.filter((x) => x.id !== foo.id),
                    foo
                  ]
                });
              }
            }
          });
        }
      );
    this.props.auth &&
      onSnapshot(
        query(
          collection(firestore, "companies"),
          where("employees", "array-contains", this.props.auth.uid)
        ),
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.exists()) {
              var foo = doc.data();
              if (foo.name) {
                foo.id = doc.id;
                //companies.push(foo);
                this.setState({
                  companies: [
                    ...this.state.companies.filter((x) => x.id !== foo.id),
                    foo
                  ]
                });
              }
            }
          });
        }
      );
    /*
    onSnapshot(collection(firestore, "companies"), (snapshot) => {
      var companies = [];
      snapshot.docs.forEach((doc) => {
        if (doc.exists()) {
          var foo = doc.data();
          if (foo.name) {
            foo.id = doc.id;
            companies.push(foo);
          }
        }
      });
      this.setState({ companies });
    });*/
  };
  newCompany = () => {
    //getDocs(query)
    //getDoc(doc(firestore))
    getDocs(
      query(
        collection(firestore, "companies"),
        where("name", "==", this.state.newCompany.name.toLowerCase())
      )
    )
      .then((snapshot) => {
        if (snapshot.docs.length !== 0) {
          var thisone = snapshot.docs[0];
          if (thisone.exists()) thisone = { ...thisone.data(), id: thisone.id };

          return thisone.deleted && thisone.authorId === this.props.auth.uid
            ? this.setState({ companyclone: thisone }, () =>
                this.companyCloner.current.click()
              ) //restoreCompany()
            : window.alert("try again: this company name is already taken") &&
                getDoc(
                  doc(firestore, "users", thisone.authorId).then((doc) => {
                    //, (doc) => {
                    if (doc.exists()) {
                      var foo = doc.data();
                      foo.id = doc.id;
                      window.alert(
                        "..but it is deleted by " +
                          foo.username +
                          ". either message them or nick@thumbprint.us"
                      );
                    }
                  }) //;
                );
        }
        //snapshot.forEach((doc) => {
        //if (!doc.exists()) {

        var nameAsArray = [];
        const c = this.state.newCompany.name.toLowerCase();
        for (let i = 1; i < c.length + 1; i++) {
          nameAsArray.push(c.substring(0, i));
        }
        addDoc(collection(firestore, "companies"), {
          ...this.state.newCompany,
          authorId: this.props.auth.uid,
          nameAsArray
          //name: this.state.name
        })
          .then(() => {
            this.setState({ newCompany: { name: "" }, tempCompany: false });
          })
          .catch(standardCatch);
        //}
        //});
      })
      .catch(standardCatch);
  };
  render() {
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    const space = " ";
    const companies = this.state.companies.filter((x) => !x.deleted);
    return (
      <div
        style={{
          //I named my squirrel
          transition: ".3s ease-in",
          display: "flex",
          flexDirection: "column",
          justifyContent: this.props.onscroll ? "start" : "space-around",
          maxheight: "min-content",
          fontFamily: "sans-serif",
          textAlign: "center",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        <RecentlyDeleted
          tempRecentlyDeleted={this.props.tempRecentlyDeleted}
          companyclone={this.state.companyclone}
          ref={{
            current: { companyCloner: this.companyCloner }
          }}
          companies={this.state.companies}
          auth={this.props.auth}
        />
        {!this.props.tempRecentlyDeleted && (
          <div>
            {!this.state.viewCompany && (
              <div>
                <div
                  onClick={() =>
                    this.setState({ tempCompany: !this.state.tempCompany })
                  }
                  id="new company"
                  onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
                  onMouseLeave={() => this.setState({ hovering: "" })}
                  style={{
                    ...styleOption,
                    width: "max-content",
                    border: `2px solid ${color("new company")}`
                  }}
                >
                  {companies.length < 1 ? "new company" : "+"}
                </div>
                {this.state.tempCompany && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.newCompany();
                    }}
                  >
                    <input
                      state={this.state.newCompany.name}
                      placeholder="name"
                      id="name"
                      onChange={(e) =>
                        this.setState({
                          newCompany: {
                            ...this.state.newCompany,
                            [e.target.id]: e.target.value
                          }
                        })
                      }
                    />
                  </form>
                )}
              </div>
            )}
            {(!this.state.searching || !this.state.viewCompany) &&
              //ohh certainly - ut for lawyer ones
              companies.map((e) => (
                <div
                  style={{
                    alignItems: "center",
                    display: "flex"
                  }}
                  key={e.name + e.id}
                >
                  <div
                    onClick={() => {
                      this.openTask();

                      this.setState({ viewCompany: e.id });
                    }}
                    id={e.name}
                    onMouseEnter={(e) =>
                      this.setState({ hovering: e.target.id })
                    }
                    onMouseLeave={() => this.setState({ hovering: "" })}
                    style={{
                      ...styleOption,
                      border: `2px solid ${color(e.name)}`
                    }}
                  >
                    {e.name}
                  </div>
                  {!this.state.viewCompany ? (
                    e.authorId === this.props.auth.uid && (
                      <div
                        style={{ padding: "9px" }}
                        onClick={() => {
                          //const docref = doc(firestore, "companies", e.id);
                          const answer = window.confirm("delete this company?");
                          answer &&
                            updateDoc(doc(firestore, "companies", e.id), {
                              deleted: true
                            }).catch(standardCatch);
                          /*deleteDoc(doc(firestore, "companies", e.id)).catch(
                        standardCatch
                      );*/
                        }} //make recoverable, law applied equally, save the rats
                      >
                        &times;
                      </div>
                    )
                  ) : (
                    <div
                      style={{ padding: "9px" }}
                      onClick={() => this.setState({ viewCompany: false })}
                    >
                      go back
                    </div>
                  )}
                </div>
              ))}
            {this.state.viewCompany && (
              <Company
                company={companies.find((e) => e.id === this.state.viewCompany)}
                auth={this.props.auth}
                history={this.props.history}
                pathname={this.props.pathname}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
//commodity land is money perishable for tax
//have kids to make use of property tax
//collective bargain rollover
//negotiated commodity non-perishable
