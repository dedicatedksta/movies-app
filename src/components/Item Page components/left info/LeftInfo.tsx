import { FC, SetStateAction, useEffect, useState } from "react";
import { IMovie, IMovieDetails } from "../../../types/movie";
import { ITvShow } from "../../../types/tv";
import { IVideo } from "../../../types/video";
import ItemInfo from "../../Item info/ItemInfo";
import Bookmark from "../../ui/bookmark/Bookmark";
import TrailerButton from "../../ui/trailer button/TrailerButton";

interface LeftInfoProps {
	item: IMovieDetails;
	videos: IVideo[];
	setVideoModalVisible: React.Dispatch<SetStateAction<boolean>>;
	itemType: string;
}

const LeftInfo: FC<LeftInfoProps> = ({
	item,
	videos,
	setVideoModalVisible,
	itemType,
}) => {
	const [bookmarkDisabled, setBookmarkDisabled] = useState(false);
	const [watchlistItems, setWatchlistItems] = useState<(IMovie | ITvShow)[]>(
		[]
	);

	useEffect(() => {
		if (localStorage.getItem("favourite")) {
			const items: IMovie[] | ITvShow[] = JSON.parse(
				localStorage.getItem("favourite")!
			);
			if (items.findIndex((i) => i.id === item.id) !== -1) {
				setBookmarkDisabled(true);
			}
			setWatchlistItems(items);
		}
	}, []);

	const handleFavourite = () => {
		if (bookmarkDisabled) {
			const newItems = watchlistItems.filter((i) => i.id !== item.id);
			setWatchlistItems(newItems);
			localStorage.setItem("favourite", JSON.stringify(newItems));
			setBookmarkDisabled(false);
		} else {
			if (watchlistItems?.length > 0) {
				const updatedItem = { ...item, type: itemType };
				const newItems = [...watchlistItems, updatedItem];
				setWatchlistItems(newItems);
				localStorage.setItem("favourite", JSON.stringify(newItems));
				setBookmarkDisabled(true);
			} else {
				const updatedItem = { ...item, type: itemType };
				localStorage.setItem("favourite", JSON.stringify([updatedItem]));
				setBookmarkDisabled(true);
			}
		}
	};

	return (
		<div className="flex flex-col justify-center flex-1 xl:max-w-2xl lg:max-w-md md:max-w-sm max-w-[356px] mb-16 md:mb-0 ">
			<h1>{itemType === "tv" ? item.original_name : item.title}</h1>
			<ItemInfo item={item} />
			<div className="text-gray-400 text-sm md:text-sm lg:text-base ">
				{item.overview}
			</div>
			<div className="flex gap-4 md:gap-6 mt-8">
				{videos.length > 0 && (
					<TrailerButton setModalVisible={setVideoModalVisible} />
				)}
				<button onClick={() => handleFavourite()}>
					<Bookmark disabled={bookmarkDisabled} />
				</button>
			</div>
		</div>
	);
};

export default LeftInfo;
