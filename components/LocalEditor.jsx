import {debounce} from "lodash";
import RichMarkdownEditor from "flowstate-editor";
import theme from "../constants/theme";
import {useLocalStorage} from "../hooks";
import {TwitterEmbed} from "./embeds/TwitterEmbed";
import {YoutubeEmbed} from "./embeds/YoutubeEmbed";
import {ImageEmbed} from "./embeds/ImageEmbed";

// TODO check with Daniel what setMarkDown function is for
// TODO check with Daniel why do we need onSearchLink and onClickLink

export const LocalEditor = () => {
    const hookedLocalStorage = useLocalStorage()

    // const setMarkdown = (text) => {
    //     let markdown = text.replace(/(\n{2})(\n+)(?!:::)(?!---)/g, (m, p, q) => p + q.replace(/(\n)/g, "\\$1"));
    //     if (markdown === "") {
    //         markdown = "\n";
    //     }
    //     return markdown;
    // }

    const onChange = debounce(value => {
        const text = value();
        hookedLocalStorage?.setItem("saved", text);
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
                    value={hookedLocalStorage?.getItem("saved")}
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


