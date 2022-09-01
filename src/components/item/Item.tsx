import Image from "next/image";
import Link from "next/link";
import React, { FC, SetStateAction } from "react";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import { getMovieGenres, getTvGenres } from "../../utils/getGenreList";
import styles from "./Item.module.scss";

interface ItemProps {
	item: IMovie | ITvShow;
	sidebarActive: string;
}

const Item: FC<ItemProps> = ({ item, sidebarActive }) => {
	const genres = getMovieGenres(item.genre_ids) || getTvGenres(item.genre_ids);
	return (
		<div className={styles.item_wrapper}>
			{Object.keys(item).length !== 0 && (
				<div className={styles.image_wrapper}>
					{/* <Image
						src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
						layout="fill"
						className="object-cover"
					/> */}
					<Link href={`/${item.id}`}>
						<img
							src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
							className="object-cover"
							alt=""
						/>
					</Link>
				</div>
			)}
			<div className={styles.text_wrapper}>
				<Link href={`/${item.id}`}>
					<h1 className={styles.item_name}>{`${
						sidebarActive === "movie" ? item.title : item.original_name
					}`}</h1>
				</Link>
				<div>
					<span>{genres}</span>
					<span>{item.vote_average}</span>
				</div>
			</div>
		</div>
	);
};

export default Item;
