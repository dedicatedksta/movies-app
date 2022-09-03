import Link from "next/link";
import React, { FC } from "react";
import { IMovie } from "../../../types/movie";
import styles from "./SimilarMovie.module.scss";

const SimilarMovie: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<Link href={`/${movie.id}`}>
			<div className={styles.similarMovie_wrapper}>
				<div>
					<img
						src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
						alt=""
					/>
				</div>
				<div className={styles.title}>{movie.title}</div>
			</div>
		</Link>
	);
};

export default SimilarMovie;
