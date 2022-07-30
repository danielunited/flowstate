import React from "react";
import { debounce } from "lodash";
import RichMarkdownEditor from "flowstate-editor-temp-2";
import { TwitterTweetEmbed } from "react-twitter-embed";
import BridgeManager from "../BridgeManager";
import theme from "../theme";

class TwitterEmbed extends React.Component {
  render() {
    const { attrs } = this.props;
    const statusId = attrs.matches[1];

    return <TwitterTweetEmbed tweetId={statusId} placeholder={"Loading tweet..."} />;
  }
}

class YoutubeEmbed extends React.Component {
  render() {
    const { attrs } = this.props;
    const videoId = attrs.matches[1];

    return <iframe title={`Youtube Embed ${videoId}`} src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`} />;
  }
}

class ImageEmbed extends React.Component {
  render() {
    return <img src="https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png" />;
  }
}

export default class LocalEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editor = null;

    this.setEditorRef = (el) => {
      this.editor = el;
    };
  }

  componentDidMount() {
    BridgeManager.get().addUpdateObserver(() => {
      const note = BridgeManager.get().getNote();
      const refresh = !this.state.note || (this.state.note && this.state.note.uuid !== note.uuid);
      this.setState({
        note: BridgeManager.get().getNote(),
      });
      if (refresh) {
        this.updateMarkdown();
      }
    });
  }

  updateMarkdown() {
    let markdown = this.state.note.content.text.replace(/(\n{2})(\n+)(?!:::)(?!---)/g, (m, p, q) => p + q.replace(/(\n)/g, "\\$1"));
    if (markdown === "") {
      markdown = "\n";
    }
    this.setState({ markdown });
  }

  onChange = debounce((value) => {
    const text = value();
    let note = this.state.note;
    // note.content.text = text;
    this.setState({ note: note });
    BridgeManager.get().save();
  });

  getNoteContents() {
    if (this.state.note) {
      return this.state.note.content.text;
    }
    return "";
  }

  render() {
    return (
      <div className="GyAeWb">
        <div className="s6JM6d">
          <RichMarkdownEditor
            dir="rtl"
            placeholder="ספר את הסיפור שלך..."
            disableExtensions={["highlight", "container_notice"]}
            ref={this.setEditorRef}
            value={this.state.markdown}
            autoFocus
            onChange={this.onChange.bind(this)}
            theme={theme}
            className="gKsMQS"
            onSearchLink={(searchTerm) => {
              const results = this.editor.getHeadings();

              return results
                .map((result) => {
                  return { title: result.title, subtitle: `H${result.level}`, url: "#" + result.id };
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
    );
  }
}
