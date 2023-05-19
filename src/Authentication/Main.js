import React from "react";
export default class Main extends React.Component {
  render() {
    return (
      <div>
        <span onClick={this.props.setSudo}>FAQ</span>:
        <br />
      </div>
    );
  }
}
