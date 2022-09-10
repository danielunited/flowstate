import React from 'react';
import brain from './brain.PNG';

export default class FlowButton extends React.Component {
	render() {
		return (
			<button className="app-button">
				<img src={brain} alt="מצב זרימה" />
				<span className="app-button-tooltip">הכנס לפלואו</span>
			</button>
		);
	}
}
