import type { NextPage } from "next";
import Home from "../src/components/page components/Home/Home";

const HomePage: NextPage = () => {
	return <Home sidebar_active="movies" />;
};

export default HomePage;
