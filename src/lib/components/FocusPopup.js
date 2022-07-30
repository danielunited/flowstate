import React from "react";
import "./focus.scss";

export default class FocusPopup extends React.Component {
  render() {
    return (
      <div className="focus-popup-container">
        <div className="focus-popup-content-container">
          <div className="focus-popup-content">
            <h1>הכנס לפלואו</h1>
            <p>
              מצב זרימה (באנגלית: Flow) הוא מה שקורה כשאתה שקוע במה שאתה עושה. המחשבות זורמות ממך בקלות והכל מתחבר יחד. כדי לעזור לך להגיע לשם, נגדיר פרק זמן שבו תהיה מוכרח לכתוב -- אחרת, כל מה שכתבת
              יעלם כאילו ולא היה. זה מפחיד, מסוכן, אבל גם אפקטיבי בצורה יוצאת דופן.
            </p>
            <form>
              <div className="focus-popup-time-container">
                <button className="focus-popup-time-btn">+</button>
                <input type="number" min="1" max="120" className="focus-popup-time-input" value="5" />
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
