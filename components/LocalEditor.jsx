import React, {useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
// import { TwitterTweetEmbed } from "react-twitter-embed";
// import BridgeManager from "../BridgeManager";
// import BridgeManager from "../src/lib/BridgeManager";
import RichMarkdownEditor from "flowstate-editor";
import theme from "../constants/theme";
import {useDidMount} from "../hooks/useDidMount";
import {TwitterTweetEmbed} from "react-twitter-embed";

// import BridgeManager from "../src/lib/BridgeManager";

class YoutubeEmbed extends React.Component {
    render() {
        const {attrs} = this.props;
        const videoId = attrs.matches[1];

        return <iframe title={`Youtube Embed ${videoId}`}
                       src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}/>;
    }
}

class TwitterEmbed extends React.Component {
    render() {
        const {attrs} = this.props;
        const statusId = attrs.matches[1];

        return <TwitterTweetEmbed tweetId={statusId} placeholder={"Loading tweet..."}/>;
    }
}

class ImageEmbed extends React.Component {
    render() {
        const {attrs} = this.props;
        const imageUrl = attrs.matches[1];

        return {imageUrl};
    }
}


export const LocalEditor = () => {
    const [defaultValue, setDefaultValue] = useState("");
    console.log("-> defaultValue", defaultValue);
    const didMount = useDidMount()

    useEffect(() => {
        setDefaultValue(localStorage.getItem("saved"))
        // const text = localStorage.getItem("saved")
        // setDefaultValue(setMarkdown(text))
    }, [])


    const setMarkdown = (text) => {
        let markdown = text.replace(/(\n{2})(\n+)(?!:::)(?!---)/g, (m, p, q) => p + q.replace(/(\n)/g, "\\$1"));
        if (markdown === "") {
            markdown = "\n";
        }
        return markdown;
    }

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
                    value={defaultValue}
                    onSearchLink={(searchTerm) => {
                        const results = this.editor.getHeadings();

                        return results
                            .map((result) => {
                                return {title: result.title, subtitle: `H${result.level}`, url: "#" + result.id};
                            })
                            .filter((result) => result.title.match(searchTerm));
                    }}
                    onClickLink={(href, event) => {
                        let url = new URL(href);
                        if (url.pathname == "/" && url.hash.length > 0) {
                            this.editor.scrollToAnchor(url.hash);
                        } else {
                            window.open(href, "_blank");
                        }
                    }}
                    embeds={[
                        {
                            title: "Twitter",
                            matcher: (url) => {
                                return url.match(/^https?:\/\/twitter.com\/[\d\w_-]+\/status\/(\d+)/);
                            },
                            component: TwitterEmbed,
                        },
                        {
                            title: "YouTube",
                            matcher: (url) => {
                                return url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i);
                            },
                            component: YoutubeEmbed,
                        },
                        {
                            title: "Image",
                            matcher: (url) => {
                                return url.match("^https?://.*\\.(?:png|jpg|jpeg|gif)$");
                            },
                            component: ImageEmbed,
                        },
                    ]}
                />
            </div>
        </div>
    )
}


