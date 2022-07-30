import React from "react";
import save from "./save.PNG";

export default class FlowButton extends React.Component {
  render() {
    return (
      <button className="app-button">
        <img src={save} alt="שמירה" />
      </button>
    );
  }
}
