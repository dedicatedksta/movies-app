import Image from "next/image";
import { FC } from "react";
import { IMovie } from "../../types/movie";
import Button from "../ui/button/Button";
import TrailerButton from "../ui/trailer button/TrailerButton";
import styles from "./Backdrop.module.scss";

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
			</div>
			<div className={styles.text_wrapper}>
				<h1>{movie.title}</h1>
				<div className={styles.genre_wrapper}>
					{genres && <span>{genres}</span>}
					<span>{movie.vote_average}/10</span>
				</div>
				<div className={styles.description}>{movie.overview}</div>
				<div className={styles.button_wrapper}>
					<Button>Learn More</Button>
					<TrailerButton />
				</div>
			</div>
		</div>
	);
};

export default Backdrop;
