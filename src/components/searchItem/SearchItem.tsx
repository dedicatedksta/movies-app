import Link from "next/link";
import React, { FC, SetStateAction } from "react";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import { getMovieGenres, getTvGenres } from "../../utils/getGenreList";
import Rating from "../rating/Rating";
import styles from "./SearchItem.module.scss";

const SearchItem: FC<{
	item: ITvShow | IMovie;
	setValue: React.Dispatch<SetStateAction<string>>;
}> = ({ item, setValue }) => {
	return (
		<Link href={`/${item.id}`}>
			<div className={styles.searchitem_wrapper} onClick={() => setValue("")}>
				<img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
				<div className={styles.info_wrapper}>
					<div className={styles.topinfo_wrapper}>
						<div className={styles.item_title}>
							{item.original_name || item.title}
						</div>
						{item.vote_average > 0 && <Rating rating={item.vote_average} />}
					</div>
					<div className={styles.bottominfo_wrapper}>
						{getMovieGenres(item.genre_ids) || getTvGenres(item.genre_ids)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SearchItem;
