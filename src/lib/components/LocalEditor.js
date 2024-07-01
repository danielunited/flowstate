import RichMarkdownEditor from 'flowstate-editor';
import { debounce } from 'lodash';
import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import BridgeManager from '../BridgeManager';
import { dark, light } from '../theme';

class TwitterEmbed extends React.Component {
  render() {
    const { attrs } = this.props;
    const statusId = attrs.matches[1];

    return <TwitterTweetEmbed tweetId={statusId} placeholder={'Loading tweet...'} />;
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
    const { attrs } = this.props;
    const imageUrl = attrs.matches[0];

    return <img src={imageUrl} />;
  }
}

export default class LocalEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: this.getTheme(), dir: 'rtl' };
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

  componentDidUpdate(prevProps) {
    const newTextColor = this.props.textColor;
    const oldTextColor = prevProps.textColor;

    if (newTextColor !== oldTextColor) {
      if (newTextColor == null) {
        this.setState({ theme: this.getTheme() });
      } else {
        this.setState({ theme: { ...this.getTheme(), text: newTextColor } });
      }
    }

    if (prevProps.defaultValue !== '' && this.props.defaultValue === '') {
      // Reset editor
      this.setState({
        key: Math.floor(Math.random() * 999999999),
      });
    }
  }

  updateMarkdown() {
    let markdown = this.state.note.content.text.replace(/(\n{2})(\n+)(?!:::)(?!---)/g, (m, p, q) => p + q.replace(/(\n)/g, '\\$1'));

    if (markdown === '') {
      markdown = '\n';
    }

    this.setState({ markdown });
  }

  onChange = debounce((value) => {
    const text = value();
    if (this.props.useLocalStorage) {
      localStorage.setItem('saved', text);
    }
    let note = this.state.note;
    this.setState({ note: note });
    this.props.onChange && this.props.onChange(text);
    BridgeManager.get().save();

    if (text.trim().length === 0) {
      this.setState({ dir: 'rtl' });
      return;
    }

    const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    const ltrPattern = /[A-Za-z]/;
    let isRtl = false;
    let isLtr = false;

    for (let i = 0; i < text.length; i++) {
      if (rtlPattern.test(text[i])) {
        isRtl = true;
      }
      if (ltrPattern.test(text[i])) {
        isLtr = true;
      }
      if (isRtl && isLtr) {
        break;
      }
    }

    if (isRtl && !isLtr) {
      this.setState({ dir: 'rtl' });
    } else if (isLtr && !isRtl) {
      this.setState({ dir: 'ltr' });
    } else {
      this.setState({ dir: 'rtl' });
    }
  });

  getNoteContents() {
    if (this.state.note) {
      return this.state.note.content.text;
    }
    return '';
  }

  getTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) {
      return dark;
    } else {
      return light;
    }
  }

  render() {
    return (
      <div className="GyAeWb">
        <div className="s6JM6d">
          <RichMarkdownEditor
            key={this.state.key}
            readOnly={this.props.readOnly}
            dir={this.state.dir}
            placeholder="ספר את הסיפור שלך..."
            disableExtensions={['highlight', 'container_notice', 'table', 'checkbox_list', 'checkbox_item']}
            ref={this.setEditorRef}
            defaultValue={this.props.useLocalStorage ? localStorage.getItem('saved') || undefined : this.props.defaultValue}
            // value={this.state.markdown}
            autoFocus
            onChange={this.onChange.bind(this)}
            theme={this.state.theme}
            className="gKsMQS"
            onSearchLink={(searchTerm) => {
              const results = this.editor.getHeadings();

              return results
                .map((result) => {
                  return { title: result.title, subtitle: `H${result.level}`, url: '#' + result.id };
                })
                .filter((result) => result.title.match(searchTerm));
            }}
            onClickLink={(href, event) => {
              let url = new URL(href);
              if (url.pathname == '/' && url.hash.length > 0) {
                this.editor.scrollToAnchor(url.hash);
              } else {
                window.open(href, '_blank');
              }
            }}
            embeds={[
              {
                title: 'Twitter',
                matcher: (url) => {
                  return url.match(/^https?:\/\/twitter.com\/[\d\w_-]+\/status\/(\d+)/);
                },
                component: TwitterEmbed,
              },
              {
                title: 'YouTube',
                matcher: (url) => {
                  return url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i);
                },
                component: YoutubeEmbed,
              },
              {
                title: 'Image',
                matcher: (url) => {
                  return url.match('^https?://.*\\.(?:png|jpg|jpeg|gif)$');
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
