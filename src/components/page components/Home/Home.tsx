import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IMovie } from "../../../types/movie";
import { getMovieGenres } from "../../../utils/getGenreList";
import Backdrop from "../../backdropImage/Backdrop";
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
		const fetchMovies = async () => {
			const response = await axios.get(
				"https://api.themoviedb.org/3/movie/popular?api_key=76795463ec11be91c78f86d62e7a0815&language=en-US&page=1"
			);
			const data = response.data;
			setMovies(data.results);
			setRenderedMovie(data.results[0]);
			setRenderedMovieGenres(getMovieGenres(data.results[0].genre_ids));
		};
		fetchMovies();
	}, []);

	return (
		<>
			<Navbar />
			<Sidebar sidebar_active={sidebar_active} />
			<Backdrop movie={renderedMovie} genres={renderedMovieGenres} />
		</>
	);
};

export default Home;
