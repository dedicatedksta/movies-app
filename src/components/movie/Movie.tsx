import Image from "next/image";
import React, { FC } from "react";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import { getMovieGenres } from "../../utils/getGenreList";
import styles from "./Movie.module.scss";

interface MovieProps {
	movie: IMovie | ITvShow;
	sidebarActive: string;
}

const Movie: FC<MovieProps> = ({ movie, sidebarActive }) => {
	const genres = getMovieGenres(movie.genre_ids);
	return (
		<div className={styles.movie_wrapper}>
			{Object.keys(movie).length !== 0 && (
				<div className={styles.image_wrapper}>
					{/* <Image
						src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
						layout="fill"
						className="object-cover"
					/> */}
					<img
						src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
						className="object-cover"
						alt=""
					/>
				</div>
			)}
			<div className={styles.text_wrapper}>
				<h1 className={styles.movie_name}>{`${
					sidebarActive === "movie" ? movie.title : movie.original_name
				}`}</h1>
				<div>
					<span>{genres}</span>
					<span>{movie.vote_average}</span>
				</div>
			</div>
		</div>
	);
};

export default Movie;
