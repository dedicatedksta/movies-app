import axios from "axios";
import Image from "next/image";
import { FC, useEffect } from "react";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import Button from "../ui/button/Button";
import Loader from "../ui/loader/Loader";
import TrailerButton from "../ui/trailer button/TrailerButton";
import styles from "./Backdrop.module.scss";

interface BackdropProps {
	movie: IMovie | ITvShow;
	genres: string | undefined;
	sidebarActive: string;
}

const Backdrop: FC<BackdropProps> = ({ movie, genres, sidebarActive }) => {
	useEffect(() => {
		const getVideo = async () => {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
			);
			const data = response.data;
			console.log(data);
		};
		if (movie.id) {
			getVideo();
		}
	}, []);
	return (
		<div className={styles.backdrop_wrapper}>
			<div className={styles.image_wrapper}>
				{Object.keys(movie).length !== 0 && (
					// <Image
					// 	src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
					// 	layout="fill"
					// />
					<img
						src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
						className="object-cover"
					/>
				)}
			</div>
			<div className={styles.text_wrapper}>
				<h1>{`${
					sidebarActive === "movie" ? movie.title : movie.original_name
				}`}</h1>
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
