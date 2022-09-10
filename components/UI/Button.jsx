import Image from 'next/image';
import PropTypes from 'prop-types';

export const Button = ({ onClick, image, imageSize, imageAlt, text, buttonClassName, textClassName }) => {
	return (
		<button className={buttonClassName} onClick={onClick}>
			{image && <Image src={image} alt={imageAlt} width={imageSize} height={imageSize} />}
			<span className={textClassName}>{text}</span>
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func,
	image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	imageSize: PropTypes.number,
	imageAlt: PropTypes.string,
	text: PropTypes.string,
	buttonClassName: PropTypes.string,
	textClassName: PropTypes.string,
};

Button.defaultProps = {
	imageSize: 36,
	buttonClassName: 'app-button',
	textClassName: 'app-button-tooltip',
};
