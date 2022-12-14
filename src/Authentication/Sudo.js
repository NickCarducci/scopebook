import React from "react";
import firebase from "./init-firebase.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import {
  signInWithPhoneNumber,
  getAuth,
  RecaptchaVerifier
} from "firebase/auth";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import PouchDB from "pouchdb";
import upsert from "pouchdb-upsert";
import "react-phone-number-input/style.css";

const firestore = getFirestore(firebase);
export const handleScollImgError = (e) => {
  if (e.message) {
    console.log(e.message);
    this.setState({ serviceCancelingImages: true, noyoutube: true });
  }
};
//cannot stop deranged from subsidy by industry specific visa exclusionary fixed free semiconductor existing business solar assuage "asiduously naive selfish calling for death of republicans more than democrats, irredeemable recention"
export const standardCatch = (err) => console.log(err.message);
export const arrayMessage = (message) =>
  message
    .toLowerCase()
    //capture or, excluding set, match 2 or more of the preceding token
    .replace(/((\r\n|\r|\n)+[^a-zA-Z#]+_+[ ]{2,})+/g, " ")
    .split(" ");
export const specialFormatting = (x, numbersOk) =>
  x
    .toLowerCase()
    //replace or regex a-z or A-Z includes space whitespace
    .replace(!numbersOk ? /[^a-zA-Z,']+/g : /[^a-zA-Z0-9,']+/g, " ")
    .split(" ")
    .map((word) => {
      var end = word.substring(1);
      if (word.includes("'")) {
        var withapos = word.lastIndexOf("'");
        var beginning = word.substring(1, withapos);
        if (beginning.length === 1) {
          end =
            beginning +
            "'" +
            word.charAt(withapos + 1).toUpperCase() +
            word.substring(withapos + 2);
        }
      }
      var resword = word.charAt(0).toUpperCase() + end;
      return ["Of", "And", "The"].includes(resword)
        ? resword.toLowerCase()
        : arrayMessage(resword).join(" ");
    })
    .join(" ");

//virtual key Bloomberg advertising
//options trading would cease with virtual key.. need volume on bid ask to trade non-preferencially
//$100k/subsidiary
const optsForPouchDB = {
  revs_limit: 1, //revision-history
  auto_compaction: true //zipped...
};
export class CDB {
  //Country caching for phone-input module-dependency
  constructor(name) {
    PouchDB.plugin(upsert);
    const title = "meCountry";
    this.db = new PouchDB(title, optsForPouchDB);
  }
  //deletion = (d) => this.db.remove(d).catch(standardCatch);
  deleteKeys = () => this.db.destroy();
  setCountry = async (c) => {
    //const cc = JSON.parse(JSON.stringify(c)); //https://github.com/pouchdb/pouchdb/issues/6411
    if (!c._id)
      return (
        window.alert(
          "pouchdb needs ._id key:value: JSON.parse= " + JSON.parse(c)
        ) &&
        (await this.db
          .destroy()
          .then(() => true)
          .catch(standardCatch))
      );
    return await new Promise((resolve) => {
      this.db //has upsert plugin from class constructor
        .upsert(c._id, (copy) => {
          copy = { ...c }; //pouch-db \(construct, protocol)\
          return copy;
        }); //upsert polyfill has no promise returned (...then)
      //console.log(c);
      resolve(JSON.stringify(c));
      //return a copy, don't displace immutable object fields
    }).catch(standardCatch);
  };
  readCountry = async (notes = {}) =>
    //let notes = {};
    await this.db
      .allDocs({ include_docs: true })
      .then(
        async (
          allNotes //new Promise cannot handle JSON objects, Promise.all() doesn't
        ) =>
          await Promise.all(
            allNotes.rows.map(
              async (n) =>
                await new Promise((r) => {
                  const which = n.doc.key;
                  r(JSON.stringify((notes[which] = n.doc)));
                })
            )
          )
        // && and .then() are functionally the same;
      )
      .catch(standardCatch);
}
//how can real velocity be utiity if such is consumption of hours and goods
//is utility the expense of physical or the leisure of not
//is there leisure to not spending
//"van morrison moonlight like pigs in a blanket smorgesboard" Sid Rosenberg
//Yeah I think these questions[??? answers] are mutually exclusive in every honest instance. I???m asking the questions.'

//mises maintain ordinary share information. conserse/profit - r. paul

//take a non-[de]flationary job and make (a plaintiff out of me). I mean non-deflationary, Im mad and
//marginal labor should deflate by mean proportions geomean
//Isn't marginal leisure (x) by hour (y)?

const loginInitial = {
  ctry: { _id: "country", country: "US" },
  bumpedFrom: "this page",
  uid: "",
  phone: "",
  lastAttemptedPhone: "",
  username: "",
  //name: "",
  id: "",
  under13: false,
  authError: "",
  textedCode: "",
  alertExistingUser: false,
  noUserPleaseSignUp: null,
  recaptchaGood: false,
  showrecaptcha: false,
  recaptchaResponse: "",
  warnCaptcha: null
};
class Sudo extends React.Component {
  constructor(props) {
    super(props);
    let cdb = new CDB();
    this.state = { ...loginInitial, cdb };
    this.recaptcha = React.createRef();
  }
  handleChange = (e) => {
    var type = e.target.id;
    var value = e.target.value.toLowerCase();
    if (type === "phone") {
      this.setState({
        [type]: "+1" + value
      });
    } else if (type === "username") {
      if (
        !value.includes(" ") &&
        !value.includes("_") &&
        value.match(/[a-z0-9]/g)
      ) {
        this.setState({
          [type]: value
        });
        if (e.which !== 32) {
          this.setState({ findingSimilarNames: true });
          clearTimeout(this.typingUsername);
          this.typingUsername = setTimeout(() => {
            this.setState({ findingSimilarNames: false }, () => {
              const individualTypes = [],
                newIndTypes = individualTypes.map((x) =>
                  x.replace(/[ ,-]/g, "")
                ),
                pagesNamesTaken = [],
                pagesNamesTaken1 = [...newIndTypes, ...pagesNamesTaken],
                curses = ["bitch", "cunt", "pussy", "pussies", "fuck", "shit"],
                hasCurse = curses.find((x) => value.toLowerCase().includes(x)),
                reserveWords = [];
              if (
                hasCurse ||
                reserveWords.includes(value.toLowerCase()) ||
                pagesNamesTaken1.includes(value.toLowerCase())
              )
                return this.setState({ newUserPlease: true }, () =>
                  window.alert(
                    "reserve word '" + value + "', please choose another"
                  )
                );
              this.setState({ newUserPlease: false }, () =>
                getDocs(
                  query(
                    collection(firestore, "users"),
                    where("username", "==", this.state.username)
                  )
                ).then((snapshot) =>
                  snapshot.docs.forEach((doc) =>
                    this.setState({ newUserPlease: doc.exists() })
                  )
                )
              );
            });
          }, 1000);
        }
      } else window.alert("no spaces");
    } /* else if (e.target.id === "parentEmail") {
      this.setState({
        parentEmail: e.target.value.toLowerCase()
      });
    }*/ else {
      this.setState({
        [e.target.id]: specialFormatting(e.target.value)
      });
    }
  };
  //reefer latches!
  likeUserforThis = (r, pn) => {
    //var { user } = result; //AuthImpl:UserImpl//DON'T DECONSTRUCT NOR UNSCOPED VAR?
    //auth = new a;//https://github.com/firebase/firebase-js-sdk/issues/5753#issuecomment-978339103
    //await updateProfile(result.user, {displayName: name});
    //https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
    console.log("auth?impl:setAuth ", r.user); //.auth
    const _auth = JSON.stringify(r.user.proactiveRefresh.user); //https://github.com/codesandbox/codesandbox-client/issues/1933#issuecomment-589710212
    _auth && console.log(_auth);
    /* eslint-disable-next-line*/
    this.props.setAuth(JSON.parse(_auth));
    //^^do this in SUDO (hibit.cc) or currentUser
    // setTimeout(() => this.props.pa.current.click(), 200)
    //this.props.getUserInfo(); //"one other quick thing" (future demand berose)
    getDoc(doc(firestore, "users", r.user.uid))
      .then((res) => {
        var exists = res.exists();
        var user = exists && { ...res.data(), id: res.id };
        window.alert(
          exists
            ? "user profile exists... welcome back!"
            : `Welcome to ${this.props.welcomeName}! Adding to firestore...`
        );
        var c = this.state.username.toLowerCase(),
          usernameAsArray = [];
        exists
          ? console.log("users[" + user.username + "]", r.user.uid)
          : console.log("users[" + c + "]", r.user.uid);
        if (exists) return null;
        for (let i = 1; i < c.length + 1; i++) {
          usernameAsArray.push(c.substring(0, i));
        }
        setDoc(doc(collection(firestore, "users"), r.user.uid), {
          under13: this.state.under13,
          usernameAsArray,
          //nameAsArray,
          createdAt: new Date(),
          username: this.state.username
          //name: this.state.name
        })
          .then(() =>
            setDoc(doc(collection(firestore, "phoneNumbers"), pn.number), {
              uid: r.user.uid
            }).catch(standardCatch)
          )
          .catch(standardCatch);
        //this.props.history.push("/");
        //this.props.unloadGreenBlue();
      })
      .catch(standardCatch);
    // prettier-ignore
    /*const stringAuthObj = (meAuth) => {
      var {
        uid, displayName,photoURL, email, emailVerified,phoneNumber, isAnonymous,  tenantId,
        providerData, apiKey, appName, authDomain, stsTokenManager,  refreshToken,  accessToken,
        expirationTime, redirectEventId, lastLoginAt,  createdAt, multiFactor
      } = meAuth;
      return { _id: uid,  uid, displayName,photoURL, email, emailVerified,  phoneNumber,
        isAnonymous,  tenantId, providerData, apiKey, appName, authDomain, stsTokenManager,
        refreshToken, accessToken, expirationTime,  redirectEventId,  lastLoginAt, createdAt,
        multiFactor: JSON.stringify(multiFactor)
      };
    };*/
  };
  //under 13 not for such a social hazard; -ism
  confirmCode = async (textcode, phone) => {
    const PHONE = parsePhoneNumber(phone);
    window.alert("checking numbers");
    window.confirmationResult
      .confirm(textcode)
      .then(async (result) => {
        this.likeUserforThis(result, PHONE);
        await this.setCountry(
          {
            _id: "country",
            country: PHONE ? PHONE.country : "US"
          },
          "setCountry"
        )
          .then(async (r) => await JSON.parse(r))
          .then((ctry) => {
            console.log(
              ctry.country + " set. Normal Finish " + result.user.uid
            );
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        this.state.appVerifier.clear();
        this.setState({
          authError: err.message,
          textcodable: false,
          showrecaptcha: false,
          recaptchaGood: false
        });
        console.log(err.message);
      });
  };
  componentWillUnmount = () => {
    clearTimeout(this.typingUsername);
  };
  setCountry = async (ctry, method) => {
    this.setState({
      country: ctry.country
    });
    return await this.state.cdb[method](ctry).catch(standardCatch);
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.location !== prevProps.location) {
      let bumpedFrom =
        this.props.location.state && this.props.location.state.bumpedFrom
          ? this.props.location.state.bumpedFrom
          : this.state.bumpedFrom;
      this.setState({ bumpedFrom });
    }
  };
  componentDidMount = () => {
    this.state.cdb
      .readCountry()
      .then(async (r) => await JSON.parse(r))
      .then(
        (r) =>
          r.length === 0 &&
          console.log(
            "no country stored [Right-Click>inspect>Application>IndexedDB]..."
          )
      )
      .catch((err) => console.log(err));
  };

  checkPhoneTaken = (phone) =>
    this.setState({ authError: "", loading: true, working: true }, () =>
      onSnapshot(doc(firestore, "phoneNumbers", phone), (doc) => {
        this.launchRecaptcha(phone);
        var exists = doc.exists();
        console.log(
          !exists
            ? "user exists, here's the recaptcha"
            : "no user exists, please sign in"
        );
        this.setState({
          showrecaptcha: true,
          loading: false,
          noUserPleaseSignUp: !exists
        });
      })
    );
  //bro, do you agree? cash:debt * annual income
  //access substitutive as complementary by fixed diminishing costs sunk
  //higher wages and employment. Should economists favor the phillips curve over the misery index?
  //https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0#send-a-verification-code-to-the-users-phone
  //https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0#send-a-verification-code-to-the-users-phone

  launchRecaptcha = (phone) => {
    window.recaptchaVerifier =
      this.recaptcha &&
      this.recaptcha.current &&
      new RecaptchaVerifier(
        this.recaptcha.current,
        {
          size: "normal",
          callback: (response) => {
            this.setState({
              lastAttemptedPhone: phone,
              recaptchaGood: true,
              showrecaptcha: false
            });
            this.requestTextCodeBox(phone);
            return response;
          },
          "expired-callback": (err) => {
            this.state.appVerifier.clear();
            this.setState({
              showrecaptcha: false,
              recaptchaGood: false,
              textcodable: false
            });
            console.log(err.message);
            return err;
          }
        },
        getAuth()
      );

    const appVerifier = window.recaptchaVerifier;
    appVerifier.render();
    this.setState({ appVerifier });
  };
  askCode = () => {
    const { lastAttemptedPhone: phone } = this.state;
    var textcode = window.prompt("what is the sms code sent to " + phone);
    if (textcode) this.confirmCode(textcode, phone);
    console.log("sms sent code to " + phone);
  };
  requestTextCodeBox = (phone) =>
    this.setState({ lastAttemptedPhone: phone, textcodable: true }, () => {
      console.log(this.state.textedCode, "ok");
      signInWithPhoneNumber(getAuth(), phone, this.state.appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.askCode();
        })
        .catch((err) =>
          this.setState(
            {
              textcodable: false,
              noUserPleaseSignUp: null,
              showrecaptcha: false,
              recaptchaGood: false,
              authError: err.message
            },
            () => console.log(err.message)
          )
        );
    });
  loginButtonPress = (phone, warnCaptcha, authError, newUserPlease) =>
    warnCaptcha === null
      ? this.setState({ warnCaptcha: true })
      : authError
      ? null
      : !newUserPlease
      ? this.checkPhoneTaken(phone)
      : window.alert(
          `${this.state.username} is taken. ` +
            `email nick@thumbprint.us to claim copyright`
        );

  addUserDatas = (ath, b) => {
    onSnapshot(
      doc(firestore, "userDatas", ath.uid),
      (doc) => {
        var userDatas = undefined;
        if (doc.exists()) {
          userDatas = doc.data();
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
            b.email = null;
          }

          if (this.state.userDatas !== userDatas) {
            delete b.defaultEmail;
            this.props.setAuth(
              {
                user: { ...b, ...userDatas },
                userDatas
              }
              //() => this.getEntities(meAuth)
            );
          }
        }
      },
      standardCatch
    );
  };
  render() {
    const {
      bumpedFrom,
      authError,
      showrecaptcha,
      phone,
      lastAttemptedPhone,
      warnCaptcha,
      newUserPlease,
      ctry
    } = this.state;
    const space = " ";
    //console.log(this.props.user);
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            overflow: !this.props.onroot ? "hidden" : "",
            fontSize: !this.props.onroot ? "0px" : "",
            position: this.props.position ? this.props.position : "fixed",
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : "rgba(20,20,60,.7)",
            transform: this.props.position
              ? `translate(${
                  this.props.onroot //|| this.props.pathname === "/service"
                    ? this.props.position && this.props.position === "fixed"
                      ? 0
                      : -50
                    : -100
                }%,-50%)`
              : `translate(${
                  this.props.onroot //|| this.props.pathname === "/service"
                    ? 0
                    : -100
                }%,0%)`,
            zIndex: "9999",
            transition: !this.props.onroot
              ? `${
                  this.props.position && this.props.position !== "fixed"
                    ? 0
                    : 0.5
                }s ease-in`
              : ".2s ease-out",
            opacity: this.props.onroot ? "1" : "0",
            display: "flex",
            /*display:
              this.props.position && this.props.position !== "fixed" //&&
                ? //!this.props.onroot
                  "none"
                : "flex",*/
            flexDirection: "column",
            justifyContent: this.props.onscroll ? "start" : "center",
            maxheight: "min-content",
            left: "0%",
            height:
              !this.props.onroot && !this.props.position
                ? "0px"
                : //(!this.props.position || this.props.position === "fixed") &&
                  "calc(100vh - 20px)",
            fontFamily: "sans-serif",
            textAlign: "center",
            alignItems: "center" //short term employment superfluos power competition
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <div
              ref={this.recaptcha}
              style={{
                display:
                  showrecaptcha &&
                  (this.state.username !== "" || !this.state.noUserPleaseSignUp)
                    ? "block"
                    : "none"
              }}
            />
            <div
              style={{ textAlign: "left", width: "80%", position: "relative" }}
            >
              {window.location.href === this.props.rooturi ? (
                <a
                  href={this.props.homeuri}
                  style={{
                    top: "-20px",
                    WebkitTextStroke: "1px white",
                    position: "absolute",
                    right: "0px",
                    cursor: "pointer",
                    color: "rgb(230, 230, 170)",
                    textDecoration: "none"
                  }}
                >
                  HOME
                </a>
              ) : (
                <div
                  style={{
                    top: "-20px",
                    WebkitTextStroke: ".5px white",
                    position: "absolute",
                    right: "0px",
                    cursor: "pointer"
                  }}
                  onClick={this.props.emulateRoot}
                >
                  HOME
                </div>
              )}
              <hr
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "white"
                }}
              />
              {this.props.useTopComment}
            </div>
            <div>
              {this.props.useTitle && this.props.useTitle}
              <br />
              <br />
              <div
                style={{
                  margin: "auto",
                  marginBottom: "4px",
                  width: "max-content",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                  padding: "16px 4px",
                  backgroundColor: !this.props.backgroundColor
                    ? "rgba(255,255,255,.6)"
                    : ""
                }}
              >
                <span style={{ textDecoration: "underline" }}>
                  {this.props.user && this.props.user.username}
                </span>
                {space}&nbsp;
                {this.props.user && ( //this.props.user.sausageadmin
                  <span
                    style={{
                      cursor: "pointer",
                      border: "1px solid",
                      borderRadius: "4px",
                      padding: "10px 4px"
                    }}
                    onClick={this.props.logoutofapp}
                  >
                    logout
                  </span>
                )}
              </div>
            </div>
            {this.props.root && this.props.user ? (
              this.props.root
            ) : (
              <form
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  padding: "10px 0px",
                  border: "2px solid",
                  width: "70%",
                  maxWidth: "400px"
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    width: "calc(100% - 20px)",
                    color: "rgb(220,230,240)",
                    backgroundColor: "rgba(0,0,0,.3)"
                  }}
                >
                  <h1>
                    <span onClick={() => this.props.getUserInfo()}>You</span>
                    {space}must log in to view {bumpedFrom}
                  </h1>
                  <br />
                  <h2>standard rates apply</h2>
                </div>
                {this.state.noUserPleaseSignUp !== true && (
                  <div>
                    {authError ? () => authError.toString() : null}
                    {this.state.noUserPleaseSignUp === null
                      ? null
                      : this.state.noUserPleaseSignUp
                      ? "no user exists, use recaptcha to get firebase.auth() text"
                      : "user exists, use recaptcha to get firebase.auth() text"}
                  </div>
                )}
                {/*this.state.noUserPleaseSignUp && !authError && (
                <div>
                  No&nbsp;{" "}
                  <input
                    onChange={() => this.setState({ under13: true })}
                    type="checkbox"
                    value="below"
                    checked={this.state.under13 === true}
                  />
                  &nbsp;are you 13 or older?
                  <br />
                  ???-?????(???_??? )&nbsp;{" "}
                  <input
                    onChange={() => this.setState({ under13: false })}
                    type="checkbox"
                    value="above"
                    checked={this.state.under13 === false}
                  />
                  &nbsp;Yes
                </div>
                )*/}
                <div
                  style={{
                    color: "white",
                    cursor: "pointer",
                    padding: "10px",
                    width: "calc(100% - 20px)",
                    backgroundColor: "rgba(0,0,0,.8)"
                  }}
                >
                  {ctry && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {ctry.country !== "US" && (
                        <div
                          style={{ padding: "10px", color: "white" }}
                          onClick={() => {
                            var ctry = { country: "US", _id: "country" };
                            this.setCountry(ctry, "setCountry");
                          }}
                        >
                          &times;
                        </div>
                      )}
                      <div style={{ display: "flex" }}>
                        <PhoneInput
                          //PhoneInputCountryFlag-height={50}
                          defaultCountry={ctry.country}
                          required
                          options={{ extract: true }}
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(phone) => {
                            if (phone) {
                              this.setState({
                                phone
                              });
                            } /*else {
                              window.alert("only numbers");
                            }*/
                          }}
                          onSubmit={(e) => {
                            e.preventDefault();
                            //we will have to stop the FDA and KYC virtual ID platform
                            //nothing is free. porn cookies

                            ///business of government false advertising general defense
                            /*if (phone !== "+17322331085")
                                return window.alert("pub use in dev");*/
                            this.loginButtonPress(
                              phone,
                              warnCaptcha,
                              authError,
                              newUserPlease
                            );
                          }}
                        />
                        {this.state.textcodable && (
                          <div
                            style={{
                              width: "max-content",
                              padding: "4px",
                              marginLeft: "4px",
                              fontSize: "14px"
                            }}
                            onClick={() => this.askCode()}
                          >
                            GOT IT
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div onClick={() => this.setState(loginInitial)}>&#8634;</div>
                  {this.state.noUserPleaseSignUp && !authError ? (
                    <div>
                      {/*this.state.under13 === true ? (
                  <input
                    required
                    className="input-field"
                    type="email"
                    id="parentEmail"
                    placeholder="parentEmail"
                    value={this.state.parentEmail}
                    onChange={this.handleChange}
                    minLength="3"
                    maxLength="60"
                  />
                 ) : null*/}
                      {newUserPlease ? (
                        <div>
                          {newUserPlease !== true ? newUserPlease : "Username"}{" "}
                          taken
                        </div>
                      ) : (
                        this.state.username !== "" && (
                          <div style={{ fontSize: "14px", color: "grey" }}>
                            SUBJECT TO COPYRIGHT
                          </div>
                        )
                      )}
                      <input
                        required
                        type="username"
                        id="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        minLength="3"
                        maxLength="30"
                      />
                      {/*<input required className="input-field" type="name" id="name" placeholder="name"
                  value={this.state.name} onChange={this.handleChange} minLength="3" maxLength="30"/>*/}
                    </div>
                  ) : null}
                  {this.state.loading ? (
                    <img
                      src="https://www.dropbox.com/s/le41i6li4svaz0q/802%20%282%29.gif?raw=1"
                      alt="error"
                    />
                  ) : !showrecaptcha &&
                    !authError &&
                    phone !== lastAttemptedPhone ? (
                    <div
                      onClick={() =>
                        this.loginButtonPress(
                          phone,
                          warnCaptcha,
                          authError,
                          newUserPlease
                        )
                      }
                    >
                      {this.state.noUserPleaseSignUp ? "Sign Up" : "Log in"}
                    </div>
                  ) : null}
                </div>
              </form>
            )}
            {this.props.useCan && (
              <div style={{ textAlign: "left", width: "80%" }}>
                <span
                  onClick={this.props.useCan}
                  style={{
                    maxWidth: "calc(100% - 160px)",
                    color: "rgb(230, 230, 170)",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  ????{space}
                  {this.props.useCanComment}
                </span>
                <hr
                  style={{
                    left: "10%",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "white"
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {this.props.home && this.props.home}
      </div>
    );
  }
}
//Doesn't a community lift itself by leisure?
export default Sudo;

/*export default React.forwardRef((props, ref) => {
  //const destruct = (obj, ...keys) =>
  //keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});
  /*console.log(
    <RefFacility
      gui={ref.current["gui"]}
      pa={ref.current["pa"]}
      ra={ref.current["ra"]}
    /> //._owner.ref
  );*/
//new
/*const Base = React.createElement(Sudo, {
    gui: ref.current["gui"],
    pa: ref.current["pa"],
    ra: ref.current["ra"]
  });* / //.state
  return (
    <Sudo
      ref={{
        current: {
          gui: (
            <RefFacility
              //app={Sudo}
              ref={{ current: { gui: ref.current["gui"] } }}
            />
          ),
          pa: (
            <RefFacility
              //app={Sudo}
              ref={{ current: { gui: ref.current["pa"] } }}
            />
          ),
          ra: (
            <RefFacility
              //app={Sudo}
              ref={{ current: { gui: ref.current["ra"] } }}
            />
          )
        }
      }}
      {...props}
    />
);*/ //{...new Sudo().state} {...props} />;
//return RefFacility.render.apply(ref.current, [Sudo]);
/**
   * 
   * Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        Check the render method of `RefFacility`.
   */
//<Sudo
/*ref={{
        current: destruct(ref.current, "gui", "pa", "ra")
      }}*/
/*gui={ref.current["gui"]}
      pa={ref.current["pa"]}
      ra={ref.current["ra"]}*/
//{...(<RefFacility />)}
//ref={{ ...(<RefFacility />) }}
//ref={RefFacility.apply(ref.current, [])}
/*ref={{
        //Unexpected ref object provided for Sudo. Use either a ref-setter function or React.createRef().
        current: (
          <RefFacility
            gui={ref.current["gui"]}
            pa={ref.current["pa"]}
            ra={ref.current["ra"]}
          />
        )
      }}*/
//{...props}/>
//});
