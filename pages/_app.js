import '../styles/app.scss';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Next.js template!</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
