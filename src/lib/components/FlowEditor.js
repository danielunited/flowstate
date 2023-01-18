import { useEffect, useState } from "react";
import FocusPopup from "./FocusPopup";
import LocalEditor from "./LocalEditor";
import { saveAs } from "file-saver";
import { Document, Paragraph, TextRun, Packer } from "docx";
import DownloadPopup from "./DownloadPopup";
import { useNavigate } from "react-router-dom";



const isDarkMode = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) {
		return true;
	} else {
		return false;
	}
}
const TEXT_COLOR = isDarkMode() ? '#E6E6E6' : "#454545";
const SECONDS_IN_MINUTE = 60;

const opacityToColor = opacity => {
	const opacityPart = parseInt(255 * opacity)
		.toString(16)
		.padStart(2, "0");
	return `${TEXT_COLOR}${opacityPart}`;
};

const downloadWordDoc = async note => {
	const doc = new Document({
		sections: [
			{
				properties: {},
				children: [
					new Paragraph({
						children: [new TextRun(note)],
					}),
				],
			},
		],
	});
	const blob = await Packer.toBlob(doc);

	saveAs(blob, `flowstate.docx`);
};

export default function FlowEditor() {
	const [isPopupOpen, setIsPopupOpen] = useState(true);
	const [minutes, setMinutes] = useState();
	const [secondsRemaining, setSecondsRemaining] = useState();
	const [secondsWithoutTyping, setSecondsWithoutTyping] = useState(0);
	const [note, setNote] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (secondsRemaining >= 0 && secondsWithoutTyping === 9) {
			setNote("");
			setSecondsRemaining(minutes * SECONDS_IN_MINUTE);
		}
	}, [secondsWithoutTyping]);

	useEffect(() => {
		if (isPopupOpen) return;
		const interval = setInterval(() => {
			setSecondsWithoutTyping(val => val + 1);
			setSecondsRemaining(val => val - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [isPopupOpen]);

	if (isPopupOpen) {
		return (
			<FocusPopup
				onClose={minutes => {
					setIsPopupOpen(false);
					setSecondsRemaining(minutes * SECONDS_IN_MINUTE);
					setMinutes(minutes);
				}}
			/>
		);
	}

	if (secondsRemaining <= 0 && note.length > 0) {
		return <DownloadPopup onDownload={() => downloadWordDoc(note).then(() => navigate("/"))} />;
	}

	return (
		<>
			<LocalEditor
				textColor={
					secondsWithoutTyping > 1
						? opacityToColor(1 - Math.min(secondsWithoutTyping + 2, 10) / 10)
						: TEXT_COLOR
				}
				defaultValue={note}
				onChange={note => {
					setNote(note);
					setSecondsWithoutTyping(0);
				}}
			/>
		</>
	);
}
