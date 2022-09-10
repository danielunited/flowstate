export const YoutubeEmbed = ({ attrs }) => {
	const videoId = attrs.matches[1];

	return (
		<iframe
			title={`Youtube Embed ${videoId}`}
			src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
		/>
	);
};
