import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { ITvShow } from "../../../types/tv";
import { getMovieGenres, getTvGenres } from "../../../utils/getGenreList";
import Item from "../../item/Item";
import Rating from "../../rating/Rating";
import SearchItem from "../../searchItem/SearchItem";
import Loader from "../loader/Loader";
import styles from "./Input.module.scss";
import { VscClose } from "react-icons/vsc";

const Input = () => {
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [searchedItems, setSearchedItems] = useState<IMovie[] | ITvShow[]>([]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (e.target.value.length > 0) {
			optimizedFetch(e.target.value);
		}
	};

	async function fetchSearchedMovies(name: string) {
		setLoading(true);
		const items = await TmbdApiService.getSearchedItems(name);
		setSearchedItems(items);
		setLoading(false);
	}

	function debounce(func: (name: string) => Promise<void>) {
		let timer: any;
		return (...args: any) => {
			//@ts-ignore
			const context = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func.apply(context, args);
			}, 500);
		};
	}

	const optimizedFetch = useCallback(debounce(fetchSearchedMovies), []);
	return (
		<div className={styles.input_wrapper}>
			<AnimatePresence>
				{visible && value && (
					<motion.div
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						exit={{ scaleY: 0 }}
						className={styles.autocomplete_wrapper}
					>
						{loading ? (
							<Loader />
						) : (
							<div className="w-full py-2">
								{searchedItems.length > 0 ? (
									<div className={styles.itemlist_wrapper}>
										{searchedItems.map(
											(item) =>
												item.poster_path && (
													<SearchItem key={item.id} item={item} />
												)
										)}
									</div>
								) : (
									<div className={styles.error}>
										Unfortunately nothing was found, try another query...
									</div>
								)}
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<input
				value={value}
				onFocus={() => setVisible(true)}
				onChange={inputChangeHandler}
				placeholder="Search movies, tv shows..."
				type="text"
			/>
			{!value ? (
				<BsSearch className={styles.searchIcon} />
			) : (
				<VscClose className={styles.closeIcon} onClick={() => setValue("")} />
			)}
		</div>
	);
};

export default Input;
