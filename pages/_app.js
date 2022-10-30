import '../public/styles/app.scss';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Flowstate</title>
			</Head>
			<div className="App">
				<Component {...pageProps} />
			</div>
		</>
	);
};

export default MyApp;
