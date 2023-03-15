import React from "react";
import save from "./save.PNG";

export default class SaveButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="app-button">
        <img src={save} alt="שמירה" loading="eager" />
        <span className="app-button-tooltip">שמירת פתק</span>
      </button>
    );
  }
}
