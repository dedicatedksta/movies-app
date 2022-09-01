import React, { FC } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { IMovieDetails } from "../../types/movie";
import { getFormattedTime } from "../../utils/getFormattedTime";
import Rating from "../rating/Rating";
import styles from "./ItemInfo.module.scss";

const ItemInfo: FC<{ item: IMovieDetails }> = ({ item }) => {
	const genres = item?.genres.map((genre) => genre.name);

	return (
		<div className={styles.iteminfo_wrapper}>
			<div className={styles.rating_wrapper}>
				<AiFillStar />
				<Rating rating={parseFloat(item.vote_average.toFixed(1))} />
			</div>
			<div className={styles.description_wrapper}>
				<div className="ml-2">
					{item.runtime && <span>{getFormattedTime(item.runtime)}</span>}
				</div>

				{genres && (
					<div>
						<BsDot className="mx-1 text-2xl" /> {genres.join(", ")}
					</div>
				)}
				{item.release_date && (
					<div>
						<BsDot className="mx-1 text-2xl" />
						<span>{item.release_date.split("-")[0]}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemInfo;