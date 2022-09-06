import Link from "next/link";
import { FC } from "react";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import { getMovieGenres, getTvGenres } from "../../utils/getGenreList";
import styles from "./Item.module.scss";

interface ItemProps {
	item: IMovie | ITvShow;
	sidebarActive?: string;
}

const Item: FC<ItemProps> = ({ item, sidebarActive }) => {
	const genres = getGenres();
	function getGenres() {
		switch (sidebarActive) {
			case "movie":
				return (
					getMovieGenres(item.genre_ids) ||
					item?.genres?.map((genre) => genre.name).join(", ")
				);
			case "tv":
				return (
					getTvGenres(item.genre_ids) ||
					item?.genres?.map((genre) => genre.name).join(", ")
				);
		}
	}
	return (
		<div className={styles.item_wrapper}>
			{Object.keys(item).length !== 0 && (
				<div className={styles.image_wrapper}>
					{/* <Image
						src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
						layout="fill"
						className="object-cover"
					/> */}
					<Link href={`/${sidebarActive}/${item.id}`}>
						<img
							src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
							className="object-cover"
							alt=""
						/>
					</Link>
				</div>
			)}
			<div className={styles.text_wrapper}>
				<Link href={`/${sidebarActive}/${item.id}`}>
					<h1 className={styles.item_name}>
						{item.title || item.original_name}
					</h1>
				</Link>
				<div>
					<span>{genres}</span>
					<span>{Number(item.vote_average.toFixed(1))}</span>
				</div>
			</div>
		</div>
	);
};

export default Item;
