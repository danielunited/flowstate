import React from "react";
import { Link } from "react-router-dom";
import brain from "./brain.PNG";

export default class FlowButton extends React.Component {
	render() {
		return (
			<Link to="/flow">
				<button className="app-button">
					<img src={brain} alt="מצב זרימה" />
					<span className="app-button-tooltip">הכנס לפלואו</span>
				</button>
			</Link>
		);
	}
}
