import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { IPerson } from "../../../types/person";
import { ITvShow } from "../../../types/tv";
import Loader from "../loader/Loader";
import styles from "./Input.module.scss";
import SearchedItems from "./SearchedItems/SearchedItems";

const Input = () => {
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [searchedItems, setSearchedItems] = useState<
		(IMovie | ITvShow | IPerson)[]
	>([]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (e.target.value.length > 0) {
			optimizedFetch(e.target.value);
		}
	};

	async function fetchSearchedMovies(name: string) {
		setLoading(true);
		const items = await TmbdApiService.getSearchedItems(name);
		console.log(items);
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
							<SearchedItems
								searchedItems={searchedItems}
								setValue={setValue}
							/>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<input
				value={value}
				onFocus={() => setVisible(true)}
				onChange={inputChangeHandler}
				placeholder="Search movies, tv shows, actors..."
				type="text"
			/>
			<BsSearch className={styles.searchIcon} />
			<AnimatePresence>
				{value && (
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						exit={{ scaleX: 0 }}
						className={styles.closeIcon}
					>
						<VscClose onClick={() => setValue("")} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Input;
