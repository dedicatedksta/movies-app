import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextProgress from "next-progress";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextProgress color="#0891b2" height={4} />
			<Component {...pageProps} />;
		</>
	);
}

export default MyApp;
