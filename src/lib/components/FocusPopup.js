import React from "react";
import "./focus.scss";

const minuteOptions = [5, 15, 30];

export default function FocusPopup({ onClose }) {
	const [minutes, setMinutes] = React.useState(5);

	const incrementMinutes = () => {
		setMinutes(minuteOptions[minuteOptions.indexOf(minutes) + 1] || minutes);
		console.log("incrementMinutes", minutes);
	};

	const decrementMinutes = () => {
		setMinutes(minuteOptions[minuteOptions.indexOf(minutes) - 1] || minutes);
	};

	return (
		<div className="focus-popup-container">
			<div className="focus-popup-content-container">
				<div className="focus-popup-content">
				<h1>הכנס לפלואו</h1>
				<p>
				מצב זרימה (באנגלית: Flow state) מתרחש כאשר אתה שקוע במה שאתה עושה, המחשבות זורמות בקלות ונראה שהכל מתחבר יחד. כדי להגיע לשם, תצטרך להפטר מחסמים מנטליים וביקורתיות כלפי העבודה שלך. כדי
				לעזור לך, נגדיר פרק זמן של כמה דקות שבמהלכם תהיה מוכרח לכתוב — אחרת, אם תחדל ליותר מכמה שניות, כל מה שכתבת ימחק. זה מפחיד, מסוכן, אך גם הוכח כאפקטיבי בצורה יוצאת דופן.
				</p>
					<form>
						<div className="focus-popup-time-container">
							<button
								type="button"
								onClick={incrementMinutes}
								className="focus-popup-time-btn"
							>
								+
							</button>
							<div className="focus-popup-time-input-container">
								<span className="focus-popup-time-span">{minutes}</span>

								<div className="focus-popup-time-minute-indicator">דקות</div>
							</div>
							<button
								type="button"
								onClick={decrementMinutes}
								className="focus-popup-time-btn"
							>
								-
							</button>
						</div>
						<input
							onClick={() => onClose(minutes)}
							type="submit"
							className="focus-popup-submit"
							value="כניסה"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
