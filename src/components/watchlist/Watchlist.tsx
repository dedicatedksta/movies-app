import { FC, useEffect, useState } from "react";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import Item from "../item/Item";
import styles from "./Watchlist.module.scss";
import { BsFillBookmarkFill } from "react-icons/bs";

interface WatchlistProps {}

const Watchlist: FC<WatchlistProps> = () => {
	const [watchlist, setWatchlist] = useState<IMovie[] | ITvShow[]>([]);

	useEffect(() => {
		if (localStorage.getItem("favourite")) {
			const i = JSON.parse(localStorage.getItem("favourite")!);
			setWatchlist(i);
		}
	}, []);

	return (
		<div className="mt-2 mr-4">
			{watchlist.length === 0 ? (
				<div className={styles.empty_wrapper}>
					<div>
						<BsFillBookmarkFill />
						<h6>Watchlist is empty</h6>
					</div>
				</div>
			) : (
				<div className={styles.watchlist_wrapper}>
					{watchlist.map((item) => (
						<div key={item.id}>
							<Item item={item} sidebarActive={item.type} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Watchlist;
