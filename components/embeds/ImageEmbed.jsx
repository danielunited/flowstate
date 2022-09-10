export const ImageEmbed = ({ attrs }) => {
	const imageUrl = attrs.matches[1];

	return { imageUrl };
};
