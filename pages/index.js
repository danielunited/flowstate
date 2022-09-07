import {LocalEditor} from "../components/LocalEditor";
import {FlowButton} from "../components/FlowButton";
import {SaveButton} from "../components/SaveButton";

const HomePage = () => {
    return (
        <div className="App">
            <LocalEditor/>
            <div className="app-button-container">
                <FlowButton/>
                <SaveButton/>
            </div>
        </div>
    );
};

export default HomePage;
