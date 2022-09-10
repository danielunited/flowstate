import {LocalEditor} from "../components/LocalEditor";
import {FlowButton} from "../components/FlowButton";
import {SaveButton} from "../components/SaveButton";
import {FocusPopup} from "../components/focusPopup/FocusPopup";
import {Timer} from "../components/Timer";

const HomePage = () => {
    return (
        <div className="App">
            <LocalEditor/>
            <div className="app-button-container">
                <FlowButton/>
                <SaveButton/>
                {/* TODO add future features below */}
                <FocusPopup/>
            </div>
            {/*<Timer />*/}
        </div>
    );
};

export default HomePage;
