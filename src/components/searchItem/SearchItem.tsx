import Link from "next/link";
import React, { FC, SetStateAction } from "react";
import { IMovie } from "../../types/movie";
import { IPerson } from "../../types/person";
import { ITvShow } from "../../types/tv";
import { getMovieGenres, getTvGenres } from "../../utils/getGenreList";
import Rating from "../rating/Rating";
import styles from "./SearchItem.module.scss";

const SearchItem: FC<{
	item: ITvShow | IMovie | IPerson;
	setValue: React.Dispatch<SetStateAction<string>>;
}> = ({ item, setValue }) => {
	return (
		<Link
			href={
				item.media_type !== "person"
					? `/${item.media_type}/${item.id}`
					: `/person/${item.id}`
			}
		>
			<div className={styles.searchitem_wrapper} onClick={() => setValue("")}>
				<img
					src={
						item.media_type !== "person"
							? `https://image.tmdb.org/t/p/w300${item.poster_path}`
							: `https://image.tmdb.org/t/p/w300${item.profile_path}`
					}
				/>
				<div className={styles.info_wrapper}>
					<div className={styles.topinfo_wrapper}>
						<div className={styles.item_title}>
							{item.original_name || item.title || item.name}
						</div>
						{item.vote_average && item.vote_average > 0 && (
							<Rating rating={item.vote_average} />
						)}
					</div>
					<div className={styles.bottominfo_wrapper}>
						{getMovieGenres(item.genre_ids) ||
							getTvGenres(item.genre_ids) ||
							item.known_for_department}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SearchItem;
