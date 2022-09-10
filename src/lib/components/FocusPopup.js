import React from 'react';
import './focus.scss';

export default class FocusPopup extends React.Component {
	render() {
		return (
			<div className="focus-popup-container">
				<div className="focus-popup-content-container">
					<div className="focus-popup-content">
						<h1>הכנס לפלואו</h1>
						<p>
							מצב זרימה (באנגלית: Flow state) מתרחש כאשר אתה שקוע במה שאתה עושה,
							המחשבות זורמות בקלות ונראה שהכל מתחבר יחד. כדי להגיע לשם, תצטרך להפטר
							מחסמים מנטליים וביקורתיות כלפי העבודה שלך. כדי לעזור לך, נגדיר פרק זמן
							של כמה דקות שבמהלכם תהיה מוכרח לכתוב — אחרת, אם תחדל ליותר מכמה שניות,
							כל מה שכתבת ימחק. זה מפחיד, מסוכן, אך גם הוכח כאפקטיבי בצורה יוצאת דופן.
						</p>
						<form>
							<div className="focus-popup-time-container">
								<button className="focus-popup-time-btn">+</button>
								<div className="focus-popup-time-input-container">
									<input
										type="number"
										min="1"
										max="120"
										className="focus-popup-time-input"
										value="5"
									/>
									<div className="focus-popup-time-minute-indicator">דקות</div>
								</div>
								<button className="focus-popup-time-btn">-</button>
							</div>
							<input type="submit" className="focus-popup-submit" value="כניסה" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}
