import { FC } from "react";
import { IMovie } from "../../../../types/movie";
import { IPerson } from "../../../../types/person";
import { ITvShow } from "../../../../types/tv";
import SearchItem from "../../../searchItem/SearchItem";
import styles from "./SearchedItems.module.scss";

interface SearchedItemsProps {
	searchedItems: (IMovie | ITvShow | IPerson)[];
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchedItems: FC<SearchedItemsProps> = ({ searchedItems, setValue }) => {
	return (
		<div className="w-full py-2">
			{searchedItems.length > 0 ? (
				<div className={styles.itemlist_wrapper}>
					{searchedItems.map(
						(item) =>
							(item.poster_path || item.profile_path) && (
								<SearchItem key={item.id} item={item} setValue={setValue} />
							)
					)}
				</div>
			) : (
				<div className={styles.error}>
					Unfortunately nothing was found, try another query...
				</div>
			)}
		</div>
	);
};

export default SearchedItems;
