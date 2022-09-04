import Link from "next/link";
import React, { FC } from "react";
import { IMovie } from "../../../types/movie";
import { ITvShow } from "../../../types/tv";
import styles from "./SimilarItem.module.scss";

const SimilarItem: FC<{ item: IMovie | ITvShow; itemType: string }> = ({
	item,
	itemType,
}) => {
	return (
		<Link href={`/${itemType}/${item.id}`}>
			<div className={styles.similarMovie_wrapper}>
				<div>
					<img
						src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
						alt=""
					/>
				</div>
				<div className={styles.title}>
					{itemType === "tv" ? item.original_name : item.title}
				</div>
			</div>
		</Link>
	);
};

export default SimilarItem;
