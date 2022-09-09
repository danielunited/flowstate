import {LocalEditor} from "../components/LocalEditor";
import {FlowButton} from "../components/FlowButton";
import {SaveButton} from "../components/SaveButton";
import {FocusPopup} from "../components/focusPopup/FocusPopup";

const HomePage = () => {
    return (
        <div className="App">
            <LocalEditor/>
            <div className="app-button-container">
                <FlowButton/>
                <SaveButton/>
                {/*<FocusPopup />*/}
            </div>
        </div>
    );
};

export default HomePage;
