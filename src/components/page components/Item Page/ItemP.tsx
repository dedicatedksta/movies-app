import { FC, useEffect, useState } from "react";
import { useResponsive } from "../../../hooks/useResponsive";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie, IMovieDetails } from "../../../types/movie";
import { IPerson } from "../../../types/person";
import { IVideo } from "../../../types/video";
import ActorsList from "../../Item Page components/actors list/ActorsList";
import LeftInfo from "../../Item Page components/left info/LeftInfo";
import SimilarItems from "../../Item Page components/similar movies/SimilarItems";
import Modal from "../../modal/Modal";
import Video from "../../modal/Video";
import ActorAvatar from "../../ui/actor avatar/ActorAvatar";
import Loader from "../../ui/loader/Loader";
import styles from "./ItemP.module.scss";

interface ItemPProps {
	itemType: string;
	itemId: string | string[] | undefined;
}

const ItemP: FC<ItemPProps> = ({ itemType, itemId }) => {
	const [loading, setLoading] = useState(false);
	const [item, setItem] = useState<IMovieDetails>();
	const [actors, setActors] = useState<IPerson[]>();
	const [videoModalVisible, setVideoModalVisible] = useState(false);
	const [videos, setVideos] = useState<IVideo[]>([]);
	const [actorModalVisible, setActorModalVisible] = useState(false);
	const [similar, setSimialar] = useState<IMovie[]>([]);
	const { similarShown } = useResponsive();
	useEffect(() => {
		if (itemId) {
			fetchItem();
		}
	}, [itemId, itemType]);
	console.log(similarShown);
	const fetchItem = async () => {
		setLoading(true);
		const item = await TmbdApiService.getItem(itemId, itemType);
		const cast: IPerson[] = await TmbdApiService.getActors(itemId, itemType);
		const filteredCast = cast.filter((c) => c.profile_path);
		const videos = await TmbdApiService.getVideo(item.id, itemType);
		const similar = await TmbdApiService.getSimilar(item.id, itemType);
		setItem(item);
		setVideos(videos);
		setActors(filteredCast);
		setSimialar(similar);
		setLoading(false);
	};
	const handleClick = () => {
		setActorModalVisible(true);
	};
	return (
		<div
			className={`h-screen  ${
				loading ? "flex items-center justify-center" : ""
			}`}
		>
			{loading ? (
				<Loader />
			) : (
				item && (
					<>
						{videos.length > 0 && (
							<Modal
								visible={videoModalVisible}
								setVisible={setVideoModalVisible}
							>
								<Video
									id={videos[0].key}
									title={item.title || item.original_name}
								/>
							</Modal>
						)}
						{actors && (
							<Modal
								visible={actorModalVisible}
								setVisible={setActorModalVisible}
							>
								<div
									className={styles.full_actor_list}
									onClick={(e) => e.stopPropagation()}
								>
									{actors?.map((actor) => (
										<ActorAvatar key={actor.original_name} actor={actor} />
									))}
								</div>
							</Modal>
						)}
						<div className="flex justify-center items-center md:bottom-0 h-full">
							<img
								className={styles.img}
								src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
								alt=""
							/>
							<div className={styles.info_wrapper}>
								<LeftInfo
									itemType={itemType}
									item={item}
									videos={videos}
									setVideoModalVisible={setVideoModalVisible}
								/>

								<div className={styles.right_side_info_wrapper}>
									<SimilarItems
										similarShown={similarShown}
										itemType={itemType}
										similar={similar}
									/>
									{actors && (
										<ActorsList
											similarShown={similarShown}
											actors={actors}
											handleClick={handleClick}
										/>
									)}
								</div>
							</div>
						</div>
					</>
				)
			)}
		</div>
	);
};

export default ItemP;
