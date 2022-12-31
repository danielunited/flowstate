import React from "react";
import "./focus.scss";

export default function DownloadPopup({ onDownload }) {
	return (
		<div className="focus-popup-container">
			<div className="focus-popup-content-container">
				<div className="focus-popup-content">
					<h1>Header here</h1>
					<p>Flow over, text here</p>
					<button onClick={onDownload} type="button" className="focus-popup-submit">
						Download
					</button>
				</div>
			</div>
		</div>
	);
}
