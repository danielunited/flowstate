import React from "react";
import "./app.scss";
import LocalEditor from "./lib/components/LocalEditor";
import FlowButton from "./lib/components/FlowButton";
import SaveButton from "./lib/components/SaveButton";
import FocusPopup from "./lib/components/FocusPopup";
import Timer from "./lib/components/Timer";

function App() {
  return (
    <div className="App">
      <LocalEditor />
      <div className="app-button-container">
        <FlowButton />
        <SaveButton />
        {/* <Timer /> */}
      </div>
      {/* <FocusPopup /> */}
    </div>
  );
}

export default App;
