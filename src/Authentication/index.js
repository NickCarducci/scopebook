import React from "react";
import Main from "./Main";
import Sudo, { standardCatch } from "./Sudo";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  signOut,
  browserSessionPersistence
} from "firebase/auth";
import firebase from "./init-firebase.js";
import PromptAuth from "./PromptAuth.js"; //"react-local-firebase";
import Customs from "./Customs.js";
import Employee from "./employee";
import Application from "./Application";
//import RefFacility from "./RefFacility.js";

const firestore = getFirestore(firebase);
export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    const init = {
      auth: undefined,
      user: undefined
    };
    this.state = { ...init, companies: [] };
    this.pa = React.createRef();
    this.gui = React.createRef();
    this.ra = React.createRef();
  }
  openTask = () => {};
  componentDidMount = () => {
    //this.hydrateAllCompanies();
    this.pathCompany();
  };
  componentDidUpdate = (prevProps) => {
    /*if (prevProps.auth !== meAuth)
      meAuth.uid && this.hydrateAllCompanies();*/
    if (prevProps.pathname !== this.props.pathname) this.pathCompany();
  };
  pathCompany = (nameAsArray) => {
    var compound = null;
    if (nameAsArray) {
      compound = query(
        collection(firestore, "companies"),
        where("nameAsArray", "array-contains", nameAsArray)
      );
    } else {
      const comp = this.props.pathname.split("/")[1].toLowerCase();
      //console.log(window.location.href);
      compound = query(
        collection(firestore, "companies"),
        where("name", "==", comp)
      );
    } //the usual suspects (geohash spoof) docket

    //"[example tech guild] prioritizing safety of or schools put first"
    //call cops on white collar investigating
    //cop-people smarts in the FTC ...not found at the non-fine appeal bond (from otherwise reprise of the necessary)
    onSnapshot(compound, (snapshot) =>
      this.setState({ companies: [] }, () => {
        const { docs } = snapshot;
        if (docs.length !== 0) {
          if (nameAsArray || docs.length > 1) {
            const companies = docs.map((foo) => {
              //console.log(foo);
              return { ...foo.data(), id: foo.id };
            });
            //console.log(companies);
            this.setState({
              companies //: docs.length === 1 ? [companies] : companies
            });
            //ar technology guilds not naturally ordinal by open-source abstraction
          } else {
            //console.log(viewCompany.id);
            //if (viewCompany.exists()) viewCompany = { ...viewCompany.data(), id: viewCompany.id };
            if (docs.length === 0) return null;
            const company = this.state.companies.find(
              (e) => e.id === docs[0].id
            );
            if (company) {
              this.setState({ viewCompany: company.id });
            } /*if (doc.exists())*/ else if (docs[0].exists()) {
              /*onSnapshot(
                doc(
                  firestore,
                  "companies",
                  docs[0].id //CompanyId.split("/" + e.companyId)[0]
                ),
                (doc) => {*/
              var foo = docs[0].data();
              console.log("comp", foo.name);
              foo.id = docs[0].id;
              //console.log(foo);
              this.setState({
                viewCompanyOk: foo
              });
            }
          }
          //);}
        } else if (this.props.pathname !== "/")
          this.setState({
            viewCompany: "none"
          });
      })
    );
  };
  hydrateAllCompanies = () => {
    //var companies = [];
    //console.log(meAuth.uid);
    onSnapshot(
      query(
        collection(firestore, "companies")
        //where("authorId", "==", meAuth.uid)
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
          if (foo.name === "company") {
            foo.id = change.doc.id;
            this.setState({
              companies: [
                ...this.state.companies.filter((x) => x.id !== foo.id),
                foo
              ]
            });
          }
          //}

          Does eagerness not require egoism for nature?
          Isn't it more selfish not to give into eagerness?

        });*/
        snapshot.docs.forEach((doc) => {
          //if (doc.metadata.hasPendingWrites && doc.exists()) {
          if (doc.exists()) {
            var foo = doc.data();
            if (foo.name) {
              //console.log(foo);
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
  };
  render() {
    const { sudo } = this.props;
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
    const hiddenUserData = (ath) => {
        onSnapshot(
          doc(firestore, "userDatas", ath.uid),
          (doc) => {
            var userDatas = undefined;
            if (doc.exists()) {
              var u = this.state.user;
              userDatas = doc.data(); //{...,doc.id}
              if (userDatas.email && userDatas.email === ath.email) {
                userDatas.doc(ath.uid).update({
                  email: null,
                  confirmedEmails: firebase.firestore.FieldValue.arrayUnion(
                    ath.email
                  ),
                  defaultEmail: userDatas.defaultEmail
                    ? userDatas.defaultEmail
                    : ath.email
                });
                u.email = null;
              }

              //delete u.defaultEmail;
              const user = {
                ...u,
                ...userDatas,
                userDatas: true
              };
              this.setState(
                {
                  user,
                  userDatas
                }
                //() => this.getEntities(meAuth)
              );
            } else
              console.log(
                `user: ${
                  this.state.user.username //+ " " + ath.uid
                }, has no hidden data`
              );
          },
          standardCatch
        );
      },
      logoutofapp = () => {
        var answer = window.confirm("Are you sure you want to log out?");
        if (!answer) {
          //this.ra.current.click();
          return this.gui.current.click();
        } //ra;//null;
        signOut(getAuth())
          .then(async () => {
            console.log("logged out");
            await setPersistence(getAuth(), browserSessionPersistence);
            this.setState({
              user: undefined,
              auth: undefined
            });
            this.ra.current.click();
          })
          .catch((err) => {
            console.log(err);
          });
      }; //linear-gradient(to right, #fb8b1e, #2b00f7)
    //console.log(meAuth);
    const meAuth =
      window.meAuth &&
      window.meAuth.constructor === Object &&
      Object.keys(window.meAuth).length > 0
        ? window.meAuth
        : undefined;
    return (
      <div>
        <PromptAuth
          ref={{
            current: {
              pa: this.pa,
              gui: this.gui,
              ra: this.ra
            }
          }}
          //storableAuth={this.state.storableAuth}
          //clearAuth={() => this.setState({ storableAuth: [] })}
          //pa={this.props.pa}
          //gui={this.props.gui}
          onPromptToLogin={() => {}} //this.props.history.push("/login")}
          verbose={true}
          onStart={() => window.alert("loading authentication...")}
          windowKey={"meAuth"} //meAuth
          hydrateUser={(me, reload, isStored) => {
            if (me && me.constructor === Object) {
              if (isStored) return console.log("isStored: ", me); //all but denied

              if (me.isAnonymous) return console.log("anonymous: ", me);

              if (!me.uid)
                return this.setState({
                  user: undefined,
                  auth: undefined
                });
              //console.log("me", me);
              //this.pa.current.click();
              onSnapshot(
                doc(firestore, "users", me.uid),
                (doc) =>
                  doc.exists() &&
                  this.setState(
                    {
                      user: { ...doc.data(), id: doc.id },
                      loaded: true
                    },
                    () => hiddenUserData(me)
                  )
              );
              return reload && window.location.reload();
            }
            console.log(me);
          }}
          onFinish={() => {}}
          //meAuth={meAuth === undefined ? null : meAuth}
        />
        <Customs
          meAuth={meAuth}
          getUserInfo={() => this.gui.current.click()}
          setAuth={(e) => this.setState(e, () => this.pa.current.click())}
          /*saveAuth={(x, hasPermission) => {
            this.setState({ storableAuth: [x, true, hasPermission] });
            this.pa.current.click();
          }}*/
          logoutofapp={logoutofapp} //rendered function
        />
        {/**inflation doesn't check from base of private investment by deficit but not currency //&& this.state.user.sausageadmin*/}

        {!sudo ? (
          <Sudo
            ref={{
              current: {
                FIREBASE_MULTI: this.FIREBASE_MULTI
              }
            }}
            phoneNumberCollection={"phoneNumbers"}
            multiCallback={() => {
              console.log("multi click");
              this.FIREBASE_MULTI.current.click();
            }}
            width={this.props.width}
            auth={meAuth}
            availableHeight={this.props.availableHeight}
            supportemail="nick@issue.scopes.cc"
            rooturi={"https://employee.scopes.cc/"} //comment out to use click
            homeuri={"https://scopes.cc"} // emulateRoot() onroot instead
            logoutofapp={logoutofapp}
            backgroundColor={"transparent"}
            //position={"absolute"} //default "fixed" yet assert (root to) alignItems by row
            welcomeName={"Scopebook contract management"}
            onroot={this.props.onroot}
            getUserInfo={() => this.gui.current.click()}
            setAuth={(auth) =>
              this.setState(auth, () => this.pa.current.click())
            }
            meAuth={meAuth}
            user={this.state.user} //root? or home as guest
            //setSudo={this.props.setSudo}
            pathname={this.props.pathname}
            useTopComment={null}
            /*useCan={() =>
              this.setState({
                tempRecentlyDeleted: !this.state.tempRecentlyDeleted
              })
            }*/
            useCanComment={null}
            useTitle={
              <span>
                <h1
                  style={{
                    color: "rgb(230, 230, 170)",
                    backgroundColor: "rgba(20,20,60,.2)"
                  }}
                >
                  Employee.scopes.cc
                </h1>
                <h2>timeclockunlock</h2>
                <h3>
                  social production, private capital.{" "}
                  {/*anarchy of production
                  depraved allow Allah, would have
                  ...and?? why correlation less homicides everyone smoke weed & car DUI
                  Would you prefer to force cesarians, mandatory pregnancy tests, and/or allow the abortion and then jail them?
                  */}
                </h3>
              </span>
            }
            root={(e) =>
              this.props.onroot && (
                <Employee
                  auth={meAuth}
                  tempRecentlyDeleted={this.state.tempRecentlyDeleted}
                  history={this.props.history}
                  pathname={this.props.pathname}
                />
              )
            }
            emulateRoot={this.props.emulateRoot}
            home={
              !this.props.onroot && (
                //!window.location.href.includes("https://employee.scopes.cc/") &&
                <Application
                  onroot={this.props.onroot}
                  companies={this.state.companies}
                  pathCompany={this.pathCompany}
                  viewCompany={this.state.viewCompany}
                  viewCompanyOk={this.state.viewCompanyOk}
                  setCompany={(e) => this.setState({ viewCompany: e })}
                  auth={meAuth}
                  history={this.props.history}
                  pathname={this.props.pathname}
                  setting={setting}
                />
              )
            }
          />
        ) : (
          <Main setSudo={this.props.setSudo} />
        )}
      </div>
    );
  }
}
