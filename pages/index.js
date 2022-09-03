// import LocalEditor from "../src/lib/components/LocalEditor";
// import FlowButton from "../src/lib/components/FlowButton";
// import SaveButton from "../src/lib/components/SaveButton";

import {LocalEditor} from "../components/LocalEditor";
import {FlowButton} from "../components/FlowButton";

const HomePage = () => {
    return (
        <div className="App">
            <LocalEditor/>
            {/*<div className="app-button-container">*/}
            <FlowButton/>
            {/*    <SaveButton/>*/}
            {/*</div>*/}
        </div>
    );
}

export default HomePage;
