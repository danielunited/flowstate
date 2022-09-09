import {TwitterTweetEmbed} from "react-twitter-embed";

export const TwitterEmbed = ({attrs}) => {
    const statusId = attrs.matches[1];

    return <TwitterTweetEmbed tweetId={statusId} placeholder={"Loading tweet..."}/>;
}
