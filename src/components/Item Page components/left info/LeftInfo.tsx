import { Dispatch, FC, SetStateAction } from "react";
import { IMovieDetails } from "../../../types/movie";
import { IVideo } from "../../../types/video";
import ItemInfo from "../../Item info/ItemInfo";
import Bookmark from "../../ui/bookmark/Bookmark";
import TrailerButton from "../../ui/trailer button/TrailerButton";
import styles from "./LeftInfo.module.scss";

interface LeftInfoProps {
	item: IMovieDetails;
	videos: IVideo[];
	setVideoModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

const LeftInfo: FC<LeftInfoProps> = ({
	item,
	videos,
	setVideoModalVisible,
}) => {
	return (
		<div className="flex flex-col justify-center ">
			<h1>{item.title}</h1>
			<ItemInfo item={item} />
			<div className="text-gray-400 max-w-2xl">{item.overview}</div>
			<div className="flex gap-6 mt-8">
				{videos.length > 0 && (
					<TrailerButton setModalVisible={setVideoModalVisible} />
				)}
				<Bookmark />
			</div>
		</div>
	);
};

export default LeftInfo;
