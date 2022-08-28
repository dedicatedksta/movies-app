import { FC, useEffect, useState } from "react";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { getMovieGenres } from "../../../utils/getGenreList";
import Backdrop from "../../backdropImage/Backdrop";
import BottomMovies from "../../bottomMovies/BottomMovies";
import Navbar from "../../ui/navbar/Navbar";
import Sidebar from "../../ui/sidebar/Sidebar";

interface HomeProps {
	sidebar_active: string;
}

const Home: FC<HomeProps> = ({ sidebar_active }) => {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [renderedMovie, setRenderedMovie] = useState<IMovie>(movies[0] || {});
	const [renderedMovieGenres, setRenderedMovieGenres] = useState<string>();
	console.log(movies);

	useEffect(() => {
		fetchMovies();
	}, []);

	async function fetchMovies() {
		const movies = await TmbdApiService.getPopularMovies();
		setMovies(movies);
		setRenderedMovie(movies[0]);
		setRenderedMovieGenres(getMovieGenres(movies[0].genre_ids));
	}

	return (
		<>
			<Navbar />
			<Sidebar sidebar_active={sidebar_active} />
			<main className="ml-28 max-w-[75vw] h-[100vh] relative">
				<Backdrop movie={renderedMovie} genres={renderedMovieGenres} />
				<BottomMovies movie={renderedMovie} />
			</main>
		</>
	);
};

export default Home;
