import Image from "next/image";
import React, { FC } from "react";
import { IMovie } from "../../types/movie";
import { getMovieGenres } from "../../utils/getGenreList";
import styles from "./Movie.module.scss";

const Movie: FC<{ movie: IMovie }> = ({ movie }) => {
	const genres = getMovieGenres(movie.genre_ids);

	return (
		<div className={styles.movie_wrapper}>
			<div className={styles.image_wrapper}>
				<Image
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					layout="fill"
					className="object-cover"
				/>
			</div>
			<div className={styles.text_wrapper}>
				<h1>{movie.title}</h1>
				<div>
					<span>{genres}</span>
					<span>{movie.vote_average}</span>
				</div>
			</div>
		</div>
	);
};

export default Movie;
