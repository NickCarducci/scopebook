import React from "react";
import { ExportJsonCsv } from "react-export-json-csv";

import "react-datepicker/dist/react-datepicker.css";

import firebase from "../.././init-firebase.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore, //G-d is not the Father, rather the father is a real douche
  startAt, //gigilos will settle it
  getDoc,
  doc
} from "firebase/firestore";
import Proposalese from "./proposals.js";
import ClientSearch from "./clientSearch.js";
export const monthsnamlist = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const firestore = getFirestore(firebase);
export default class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      proposalsAccount: [],
      proposalsClient: [],
      nav: "List", //defaults (as if) !this.props.isAdmin && nav==="List"
      viewAccount: props.company.chartOfAccounts[0], //miscellaneous
      viewAuthor: "",
      authors: [],
      authorProfiles: []
    };
  }
  componentWillUnmount = () => {
    clearInterval(this.int);
  };
  openTask = () => {};

  componentDidMount = () => {
    this.page();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.company !== this.props.company) this.page();
    if (this.state.authors !== this.state.lastauthors) {
      this.setState({ lastauthors: this.state.authors }, async () => {
        /*this.setState({
          endBfr: this.state.proposals[0],
          startAfr: this.state.proposals[this.state.proposals.length - 1]
        });*/
        var authorss = [];
        if (this.state.authors.length > 0)
          authorss = await Promise.all(
            this.state.authors.map(
              async (e) =>
                await new Promise(async (resolve, reject) => {
                  const d = await getDoc(doc(firestore, "users", e))
                    .then((user) => {
                      if (user.exists())
                        return (user = { ...user.data(), id: user.id });
                    })
                    .catch((e) => reject(JSON.stringify(e)));
                  resolve(JSON.stringify(d));
                })
            )
          );
        this.setState(
          {
            authorProfiles: authorss.map((e) => JSON.parse(e))
          },
          () =>
            this.setState({
              viewAuthor: this.state.authorProfiles[0]
                ? this.state.authorProfiles[0].id
                : this.state.viewAuthor
            })
        );
      });
    }
  };
  page = (pageinate) => {
    var compound = null;

    const maybeguest = !this.props.isAdmin
      ? this.props.auth !== undefined
        ? this.props.auth.uid
        : "0Qq6amOgDwOkt7D14Wb5" //"mcgillicuddy"
      : this.state.viewAuthor;
    const base = [
      collection(firestore, "proposals"),
      where(
        "companyId",
        "==",
        this.props.auth === undefined
          ? this.props.company.name === "example"
            ? this.props.company.id
            : "BYcnPRGNNV3cHxJdDeao"
          : this.props.company.id
      ),
      ...(this.props.auth === undefined
        ? []
        : !this.props.isAdmin || this.state.nav === "Client"
        ? [where("authorId", "==", maybeguest)] //signed-in guest
        : []),
      ...(this.state.nav === "Account"
        ? [where("account", "==", this.state.viewAccount)]
        : [])
    ];
    const { nav: navbar } = this.state;
    const endBfr = "last" + (navbar !== "List" ? navbar : ""),
      startAfr = "undo" + (navbar !== "List" ? navbar : ""),
      collective = "proposals" + (navbar !== "List" ? navbar : "");
    //console.log(pageinate);
    if (pageinate === "last") {
      if (!this.state[endBfr]) return window.alert("no more");
      compound = query(
        ...base,
        orderBy("willCall", "desc"),
        endBefore(this.state[endBfr]),
        limit(25)
      );
    } else if (pageinate) {
      if (!this.state[startAfr]) return window.alert("nothing new");
      compound = query(
        ...base,
        orderBy("willCall", "desc"),
        startAfter(this.state[startAfr]),
        limit(25)
      ); //"the people are dying every day trying to get int because of Bidens open border.
      //they never carded about the children, JUST PAWNS to get at doald trump" tick tock
      //"If you include a filter with a range comparison (<, <=, >, >=),
      //your first ordering must be on the same field:"
      //https://cloud.google.com/firestore/docs/query-data/queries#not_equal_
      //https://console.firebase.google.com/project/scopebook-_/firestore/indexes
      //Firestore (9.9.3): Uncaught Error in snapshot listener:
      //{"code":"failed-precondition","name":"FirebaseError"}
    } else {
      compound = query(
        ...base,
        orderBy("willCall", "desc"),
        //startAt(new Date().getTime() / 1000 - 86400 * 30),
        limit(25)
      );
    }
    onSnapshot(compound, (snapshot) =>
      this.setState(
        {
          [endBfr]: snapshot.docs[0],
          [startAfr]: snapshot.docs[snapshot.docs.length - 1]
        },
        async () => {
          snapshot.docChanges().forEach(
            (change) =>
              change.type === "modified" &&
              this.setState({ mountedmodificationid: change.doc.id }, () => {
                clearTimeout(this.modificationtimeout);
                this.modificationtimeout = setTimeout(
                  () => this.setState({ mountedmodificationid: null }),
                  2000
                );
              })
          );
          const { docs } = snapshot; //DO NOT TRY TO SAVE TO LOCAL VARIABLE ONSNAPSHOT(still???)
          /*const obma = await Promise.all(
            (docs.length < 2 ? [docs] : docs).map(
              async (doc) =>
                await new Promise((resolve, reject) => {
                  if (doc.exists) {
                    var foo = doc.data();
                    if (foo.name) {
                      foo.id = doc.id;
                      resolve(JSON.stringify(foo));
                      /*this.setState({
                  [collective]: [
                    ...this.state[collective], //.filter((x) => x.id !== foo.id),
                    foo
                  ],
                });* /
                    } else reject("{}");
                  } else reject("{}");
                }),
              (e) => console.log(e)
            )
          );*/
          //console.log(docs);
          if (pageinate && snapshot.docs.length < 1)
            return window.alert(
              pageinate === "last" ? "no more" : "nothing new"
            );

          this.setState(
            {
              [collective]: docs.map((e) => {
                return { ...e.data(), id: e.id };
              })
              /*.map((e) => {
                  if (this.props.auth === undefined) {
                    return {
                      ...e,
                      constituted: new Date().getTime() / 1000 - 86400 * 5,
                      willCall: new Date().getTime() / 1000 + 86400 * 3
                    };
                  } else return e;
                })*/ //.map((e) => JSON.parse(e))
            },
            () =>
              this.setState({
                authors:
                  this.props.isAdmin && this.state.nav === "List"
                    ? [
                        ...new Set(
                          this.state[collective].map((e) => e.authorId)
                        )
                      ]
                    : this.state.authors
              })
          );
        }
      )
    );
  };
  render() {
    const { page, state } = this;
    const { nav: navbar } = state;

    const endBfr = "last" + (navbar !== "List" ? navbar : ""),
      startAfr = "undo" + (navbar !== "List" ? navbar : ""),
      collective = "proposals" + (navbar !== "List" ? navbar : "");
    const nav = (e) => {
      return {
        //display: "flex",
        //alignItems: "center",
        textDecoration: this.state.nav === e && "underline",
        padding: "0px 6px"
      };
    };
    const navtext = (e) =>
      this.setState({ nav: e.target.textContent }, () => {
        if (!this.state.initAccount && this.state.nav === "Account")
          this.setState({ initAccount: true }, () => page());
        if (!this.state.initClient && this.state.nav === "Client")
          this.setState({ initClient: true }, () => page());
      });
    var allcalls = [];
    const srtby = (e) => (e.willCall !== 0 ? e.willCall : e.constituted);

    const proposals = this.state[collective]
      .map((e) => {
        allcalls.push(srtby(e));
        return e;
      })
      .sort((a, b) => srtby(a) - srtby(b));
    const start = Math.min(...allcalls);
    const end = Math.max(...allcalls);

    const headers = [
      {
        key: "id",
        name: "Index"
      },
      {
        key: "date",
        name: "Will Call"
      },
      {
        key: "account",
        name: "Account"
      },
      {
        key: "amount",
        name: "Cost"
      }
    ];
    const middle = new Date(((start + end) / 2) * 1000),
      makeFancy = (d, sh = "/") => {
        //console.log(d);
        return isNaN(d)
          ? ""
          : d.getMonth() + 1 + `${sh + d.getDate() + sh + d.getFullYear()}`;
      },
      //middleFancy = makeFancy(middle, "/");
      middleFancy = middle.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    const data = proposals.map((e, i) => {
      return {
        id: i,
        date: e.willCall ? e.willCall : e.constituted,
        account: e.account,
        amount: e.cost
      };
    }); //key name(value)
    //const sh = "-"; //"%2F";
    const startDate = new Date(start * 1000),
      startFancy = makeFancy(startDate, "-");
    const endDate = new Date(end * 1000),
      endFancy = makeFancy(endDate, "-"),
      fileTitle = `${this.state.nav}_${this.props.company.name}_${startFancy}_${endFancy}.csv`;
    const pag = {
      padding: "0px 3px"
    };
    const selectClient = this.state.authorProfiles.find(
      (e, i) => e.id === this.state.viewAuthor //|| i === 0
    );
    return this.props.hideProposals ? null : (
      <div
        style={{
          position: "relative",
          width: "100%",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {proposals.length > 0 && (
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              padding: "4px 0px",
              position: "relative",
              width: "100%",
              maxWidth: "max-content"
            }}
          >
            <div
              onClick={() => page("last")}
              style={{
                ...pag,
                fontSize: "10px",
                color: !this.state[endBfr] && "rgb(50,50,50)"
              }}
            >
              {
                /*makeFancy(startDate, "/")*/ monthsnamlist[
                  startDate.getMonth()
                ]
              }
              {"  <"}
            </div>
            <div
              onClick={() => {}}
              style={{ ...pag, fontSize: "15px" /*, marginTop: "7px"*/ }}
            >
              {/*<span
                style={{
                  left: "50%",
                  transform: "translate(-50%,-12px)",
                  color: "rgb(60,70,80)",
                  fontSize: "12px",
                  position: "absolute"
                }}
              >
                {makeFancy(new Date(), "/")}
              </span>*/}
              {middleFancy}
            </div>
            <div
              onClick={() => page("undo")}
              style={{
                ...pag,
                fontSize: "10px",
                color: !this.state[startAfr] && "rgb(50,50,50)"
              }}
            >
              {"> "}
              {/*makeFancy(endDate, "/")}*/ monthsnamlist[endDate.getMonth()]}
            </div>
          </div>
        )}
        {this.props.isAdmin && (
          <div style={{ position: "relative", width: "100%" }}>
            <div
              style={{
                left: "50%",
                transform: "translateX(-50%)",

                position: "absolute",
                display: "flex",
                padding: "6px 0px"
              }}
            >
              <span
                title={fileTitle}
                style={{
                  transform: "translateY(-6px)"
                }}
              >
                <ExportJsonCsv
                  headers={headers}
                  items={data}
                  fileTitle={fileTitle}
                >
                  <span role="img" aria-label="printer">
                    🖨
                  </span>
                </ExportJsonCsv>
              </span>
              <div
                style={{
                  ...nav(""),
                  //display:"flex",alignItems:"center"
                  transform: "translateY(-6px)",
                  fontSize: "12px"
                }}
              >
                Sort By:
              </div>
              <div style={nav("List")} onClick={navtext}>
                List
              </div>
              <div style={nav("Account")} onClick={navtext}>
                Account
              </div>
              <div style={nav("Client")} onClick={navtext}>
                Client
              </div>
            </div>
            <br />
            <br />
            {this.state.nav === "Client" && this.state.viewAuthor === "search" && (
              <ClientSearch
                auth={this.props.auth}
                history={this.props.history}
                pathname={this.props.pathname}
                setting={this.props.setting}
                clientFilter={(id) =>
                  this.setState({ viewAuthor: id }, () => {
                    //console.log(id);
                    page();
                  })
                }
                selectinstead={(id) =>
                  this.setState({
                    viewAuthor:
                      "select_client" /*this.state.authorProfiles[0]
                      ? this.state.authorProfiles[0].id
                      : this.state.viewAuthor*/
                  })
                }
                //"", ...this.state.authorProfiles //socialize production
                //as it happens one's own capital from social guild
                //honest and direct doppleganger fraud and non-compete agreement duress
                //productivity and capital are mutually exclusive because markets are necessarily77777 social
              />
            )}
            {this.state.nav === "Account" &&
              this.props.company.chartOfAccounts &&
              this.props.company.chartOfAccounts.length > 0 && (
                <select
                  value={this.state.viewAccount}
                  style={{ width: "100%" }}
                  //onBlur={() => this.setState({ changeAccount: false })}
                  onChange={(w) => {
                    w.preventDefault();
                    const select = w.target;
                    const id = select.children[select.selectedIndex].id;
                    this.setState({ viewAccount: id }, () => page());
                    //this.setState({ changeAccount: false });
                  }}
                >
                  {this.props.company.chartOfAccounts.map((e) => (
                    <option id={e} key={"account" + e}>
                      {e}
                    </option>
                  ))}
                </select>
              )}
            {this.state.nav === "Client" && this.state.viewAuthor !== "search" && (
              <select
                value={
                  selectClient ? selectClient.username : this.state.viewAuthor
                } //""
                style={{ width: "100%" }}
                //onBlur={() => this.setState({ changeAccount: false })}
                onChange={(w) => {
                  w.preventDefault();
                  const select = w.target;
                  const id = select.children[select.selectedIndex].id;
                  this.setState(
                    {
                      viewAuthor: id //+ "/" + this.props.company.id
                    },
                    () => page()
                  );
                  //this.setState({ changeAccount: false });
                }}
              >
                {[
                  { id: "null", username: "select_client" },
                  { id: "search", username: "search" },
                  ...this.state.authorProfiles
                ].map((e, i) => (
                  <option
                    id={e.id}
                    key={"client" + e.id}
                    style={{ color: i === 0 ? "grey" : "black" }}
                  >
                    {e.username}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <Proposalese
          company={this.props.company}
          auth={this.props.auth}
          isAdmin={this.props.isAdmin}
          proposals={proposals}
        />
        <br />
        {/*
        <span style={{ fontSize: "12px" }}>
          {!this.props.isAdmin &&
            "tip: break your spend into multiple proposals"}
          {!this.props.isAdmin && <br />}
          note: escrow or partial product should be returnable
          </span>*/}
      </div>
    );
  }
}
