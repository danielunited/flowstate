//TODO find a solution for selector "p" is not pure error
// uncomment the line below after finishing with the css modules error

import styles from './focusPopup..module.scss'


//TODO check with Daniel if styles.focusPopupContent works here since there isn't standalone "focus-popup-content" class
// "focus-popup-content" is declared with h1 and p tags

export const FocusPopup = () => {
    return (
        <div className={styles.focusPopupContainer}>
            <div className={styles.focusPopupContentContainer}>
                <div className={styles.focusPopupContent}>
                    <h1>הכנס לפלואו</h1>
                    <p>
                        מצב זרימה (באנגלית: Flow state) מתרחש כאשר אתה שקוע במה שאתה עושה, המחשבות זורמות בקלות ונראה
                        שהכל מתחבר יחד. כדי להגיע לשם, תצטרך להפטר מחסמים מנטליים וביקורתיות כלפי העבודה שלך. כדי
                        לעזור לך, נגדיר פרק זמן של כמה דקות שבמהלכם תהיה מוכרח לכתוב — אחרת, אם תחדל ליותר מכמה שניות,
                        כל מה שכתבת ימחק. זה מפחיד, מסוכן, אך גם הוכח כאפקטיבי בצורה יוצאת דופן.
                    </p>
                    <form>
                        <div className={styles.focusPopupTimeContainer}>
                            <button className={styles.focusPopupTimeBtn}>+</button>
                            <div className={styles.focusPopupTimeInputContainer}>
                                <input type="number" min="1" max="120" className={styles.focusPopupTimeInput} value="5"/>
                                <div className={styles.focusPopupTimeMinuteIndicator}>דקות</div>
                            </div>
                            <button className={styles.focusPopupTimeBtn}>-</button>
                        </div>
                        <input type="submit" className={styles.focusPopupSubmit} value="כניסה"/>
                    </form>
                </div>
            </div>
        </div>
    );
}
