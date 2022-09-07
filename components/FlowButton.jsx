import Image from "next/image";
import brainImg from '/public/images/brain.png'

export const FlowButton = () => {
    return (
        <button className="app-button">
            <Image src={brainImg} alt="מצב זרימה" width="36" height="36"/>
            <span className="app-button-tooltip">הכנס לפלואו</span>
        </button>
    );
}
