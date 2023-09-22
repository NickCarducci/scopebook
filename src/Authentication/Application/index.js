import React from "react";
import Company from ".././company";

class Page extends React.Component {
  render() {
    const { company } = this.props;
    return (
      <div>
        <div
          style={{
            padding: "6px 10px",

            display: "flex"
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              (window.location.href = window.location.hostname = "/")
            }
          >
            back
          </div>

          <div style={{ marginLeft: "15px" }}>{company.name}</div>
        </div>
        <Company
          company={company}
          auth={this.props.auth}
          history={this.props.history}
          pathname={this.props.pathname}
        />
      </div>
    );
  }
}
class Result extends React.Component {
  state = {};
  openTask = () => {};
  render() {
    const { e } = this.props;
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      //ello everybody
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    return (
      //!viewCompany ||
      //e.id === viewCompany &&
      <div
        style={{
          cursor: "pointer",
          alignItems: "center",
          display: "flex"
        }}
        key={e.name + e.id}
      >
        <div
          onClick={() => {
            this.openTask();
            window.location.href = window.location.href + e.name;
            /*this.setState({
              viewCompany: !viewCompany && e.id
            });*/ //corporate prmium 80% market cap bonds
            //new bonds, cancel corresponding bonds, or keep bonds
            //deflationary (lt) unemployment of short term employment
            //"stop maing education a business," save the rats
          }}
          id={e.name}
          onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
          onMouseLeave={() => this.setState({ hovering: "" })}
          style={{
            ...styleOption,
            border: `2px solid ${color(e.name)}`
          }}
        >
          {e.name}
        </div>
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingComments: null,
      viewCompanyname: ""
    };
  }

  componentWillUnmount = () => {
    clearInterval(this.int);
    clearTimeout(this.searchin);
  };
  render() {
    const { setting, viewCompany, viewCompanyOk } = this.props;
    const companies = this.props.companies.filter((x) => !x.deleted);
    const company = companies.find((e) => e.id === viewCompany);
    //console.log(viewCompanyOk);
    return (
      <div
        style={{
          transform: "translate(0px, 0px)",
          left: "0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {(!viewCompany || viewCompany !== "none") && !viewCompanyOk && (
          <h4
            {...setting(7, {
              marginBottom: "10px",
              width: "120px",
              cursor: "pointer"
            })}
          >
            What is the name of the company you would like to contract (i.e.
            "example")?
          </h4>
        )}
        {!viewCompany && !viewCompanyOk && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const answer = window.confirm(
                `Go to ${this.state.viewCompanyname}?`
              );
              if (answer)
                window.location.href =
                  window.location.href + this.state.viewCompanyname; //"not possible 'breakthrough'" we don't see generation but mutatioon.
              //why is generation not used to describe endocytosis insemination of amino carbon
            }}
          >
            <div style={{ position: "relative", left: "-10px" }}>
              {this.state.viewCompanyname !== "" &&
                this.state.fetchingComments !== null && (
                  <span>.{!this.state.fetchingComments && <span>.</span>}</span>
                )}
            </div>
            <input
              required={true}
              minLength={2}
              state={this.state.viewCompanyname}
              placeholder={
                viewCompany ? this.props.pathname.split("/")[1] : "name"
              }
              id="viewCompanyname"
              onChange={(e) =>
                this.setState(
                  {
                    [e.target.id]: e.target.value.toLowerCase(),
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
                      this.props.pathCompany(this.state.viewCompanyname);
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
        {companies.length < 1 ? (
          <div>{this.state.viewCompanyname}</div>
        ) : (
          //ohh certainly - ut for lawyer ones (german?)
          //Is inflation not best analyzed by a concurrentable value basis as the cash to debt ratio of consumption rather than year to year interest?
          companies.map(
            (e) =>
              this.state.viewCompanyname !== "" && (
                <div key={"result" + e.id}>
                  <Result e={e} history={this.props.history} />
                </div>
              )
          )
        )}

        {!viewCompany && !viewCompanyOk ? null : this.props.viewCompany !==
          "none" ? (
          <Page
            company={company ? company : viewCompanyOk}
            auth={this.props.auth}
            history={this.props.history}
            pathname={this.props.pathname}
          />
        ) : (
          <span>
            {"no companies in: " + window.location.host}
            {viewCompany === "none" && this.props.pathname}{" "}
            <span
              role="img"
              aria-label="back"
              onClick={() => {
                this.props.setCompany({ viewCompany: null });
                window.location.href = window.location.href = "/";
              }}
              style={{
                cursor: "pointer"
              }}
            >
              &#9198;
            </span>
          </span>
        )}
      </div>
    );
  }
}

export default Search;
