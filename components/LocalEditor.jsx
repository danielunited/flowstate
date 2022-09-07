import React, {useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
// import { TwitterTweetEmbed } from "react-twitter-embed";
// import BridgeManager from "../BridgeManager";
// import BridgeManager from "../src/lib/BridgeManager";
import RichMarkdownEditor from "flowstate-editor";
import theme from "../constants/theme";
import {useDidMount} from "../hooks/useDidMount";

// import BridgeManager from "../src/lib/BridgeManager";

class YoutubeEmbed extends React.Component {
    render() {
        const {attrs} = this.props;
        const videoId = attrs.matches[1];

        return <iframe title={`Youtube Embed ${videoId}`}
                       src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}/>;
    }
}


export const LocalEditor = () => {
    const didMount = useDidMount()

    const onChange = debounce(value => {
        // access localStorage only after the component mounted
        if (!didMount) return;
        const text = value();
        localStorage.setItem("saved", text);
        // let note = this.state.note;
        // note.content.text = text;
        // setNote({note: note});
        // BridgeManager.get().save();
    }, 100);

    return (
        <div className="GyAeWb">
            <div className="s6JM6d">
                <RichMarkdownEditor
                    dir="rtl"
                    placeholder="ספר את הסיפור שלך..."
                    disableExtensions={["highlight", "container_notice", "table", "checkbox_list", "checkbox_item"]}
                    autoFocus
                    onChange={onChange}
                    theme={theme}
                    className="gKsMQS"
                />
            </div>
        </div>
    )
}


