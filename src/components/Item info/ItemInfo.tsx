import React, { FC, useMemo } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { IMovieDetails } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import { getFormattedTime } from "../../utils/getFormattedTime";
import Rating from "../rating/Rating";
import styles from "./ItemInfo.module.scss";

const ItemInfo: FC<{ item: IMovieDetails | ITvShow }> = ({ item }) => {
	const genres = useMemo(() => item?.genres.map((genre) => genre.name), [item]);

	return (
		<div className={styles.iteminfo_wrapper}>
			<div className={styles.rating_wrapper}>
				<AiFillStar />
				<Rating rating={parseFloat(item.vote_average.toFixed(1))} />
			</div>
			<div className={styles.description_wrapper}>
				<div className="ml-2">
					{(item.runtime || item.number_of_seasons) && (
						<span>
							{item.runtime
								? getFormattedTime(item.runtime)
								: `${item.number_of_seasons} Seasons`}
						</span>
					)}
				</div>
				{(item.release_date || item.first_air_date) && (
					<div>
						<BsDot className="lg:mx-1 md:text-lg lg:text-2xl" />
						<span>
							{item.release_date?.split("-")[0] ||
								item.first_air_date?.split("-")[0]}
						</span>
					</div>
				)}
				{genres && (
					<div className=" md:whitespace-normal xl:whitespace-nowrap">
						<BsDot className="lg:mx-1 md:text-lg lg:text-2xl" />{" "}
						{genres.join(", ")}
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemInfo;
