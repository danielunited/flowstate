export const ImageEmbed = () => {
    const {attrs} = this.props;
    const imageUrl = attrs.matches[1];

    return {imageUrl};
}
