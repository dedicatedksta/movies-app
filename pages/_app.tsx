import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextProgress from "next-progress";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>IMDb</title>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NextProgress color="#0891b2" height={4} />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
