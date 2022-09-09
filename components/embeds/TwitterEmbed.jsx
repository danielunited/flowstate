import {TwitterTweetEmbed} from "react-twitter-embed";

export const TwitterEmbed = () => {
    const {attrs} = this.props;
    const statusId = attrs.matches[1];

    return <TwitterTweetEmbed tweetId={statusId} placeholder={"Loading tweet..."}/>;
}
