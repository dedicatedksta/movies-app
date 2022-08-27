import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { IGenre, IMovie } from "../../types/movie";
import Button from "../ui/button/Button";
import { getMovieGenres } from "../../utils/getGenreList";
import styles from "./Backdrop.module.scss";
import TrailerButton from "../ui/trailer button/TrailerButton";

interface BackdropProps {
	movie: IMovie;
	genres: string | undefined;
}

const Backdrop: FC<BackdropProps> = ({ movie, genres }) => {
	return (
		<div className={styles.backdrop_wrapper}>
			<div className={styles.image_wrapper}>
				{movie.backdrop_path && (
					<Image
						src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
						layout="fill"
					/>
				)}
				{/* {imageUrl && <img src={imageUrl} alt={movie.title} />} */}
			</div>
			<div className={styles.text_wrapper}>
				<h1 className="font-bold text-4xl mb-2">{movie.title}</h1>
				<div className="flex gap-4 font-bold mb-4 text-lg">
					{genres && <span>{genres}</span>}
					<span>{movie.vote_average}/10</span>
				</div>
				<div className="mb-6 text-[#a2a4a4]">{movie.overview}</div>
				<div className={styles.button_wrapper}>
					<Button>Learn More</Button>
					<TrailerButton />
				</div>
			</div>
		</div>
	);
};

export default Backdrop;
