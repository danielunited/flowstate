import React from "react";
import "./app.scss";
import LocalEditor from "./lib/components/LocalEditor";
import FlowButton from "./lib/components/FlowButton";
import SaveButton from "./lib/components/SaveButton";
import FocusPopup from "./lib/components/FocusPopup";
import Timer from "./lib/components/Timer";
import { createNote } from "./lib/api";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	return (
		<div className="App">
			<LocalEditor useLocalStorage />
			<div className="app-button-container">
				<FlowButton />
				<SaveButton
					onClick={async () => {
						const { id, editKey } = await createNote(localStorage.getItem("saved"));

						localStorage.setItem("saved", "");
						localStorage.setItem(`note_${id}_edit_key`, editKey);
						navigate(`/note/${id}`);
					}}
				/>
				{/* <Timer /> */}
			</div>
			{/* <FocusPopup /> */}
		</div>
	);
}

export default App;
