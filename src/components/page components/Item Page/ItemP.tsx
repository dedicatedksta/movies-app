import React, { FC, useEffect, useState } from "react";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovieDetails } from "../../../types/movie";
import { getFormattedTime } from "../../../utils/getFormattedTime";
import Rating from "../../rating/Rating";
import Loader from "../../ui/loader/Loader";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import TrailerButton from "../../ui/trailer button/TrailerButton";
import Bookmark from "../../ui/bookmark/Bookmark";
import styles from "./ItemP.module.scss";
import ItemInfo from "../../Item info/ItemInfo";
import Slider from "react-slick";
import { IPerson } from "../../../types/person";
import { IVideo } from "../../../types/video";
import Modal from "../../modal/Modal";
import Video from "../../modal/Video";

interface ItemPProps {
	itemId: string | string[] | undefined;
}

const ItemP: FC<ItemPProps> = ({ itemId }) => {
	const [loading, setLoading] = useState(false);
	const [item, setItem] = useState<IMovieDetails>();
	const [actors, setActors] = useState<IPerson[]>();
	const [modalVisible, setModalVisible] = useState(false);
	const [videos, setVideos] = useState<IVideo[]>([]);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: false,
	};

	useEffect(() => {
		if (itemId) {
			fetchItem();
		}
	}, [itemId]);

	const fetchItem = async () => {
		setLoading(true);
		const item = await TmbdApiService.getItem(itemId);
		const cast: IPerson[] = await TmbdApiService.getActors(itemId);
		const actors = cast.filter((c) => c.known_for_department === "Acting");
		const videos = await TmbdApiService.getVideo(item.id, "movie");
		setVideos(videos);
		setItem(item);
		setActors(actors);
		setLoading(false);
		console.log(item);
		console.log(actors);
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
						<Modal visible={modalVisible} setVisible={setModalVisible}>
							<Video
								id={videos[0].key}
								title={item.title || item.original_name}
							/>
						</Modal>
						<img
							className={styles.img}
							src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
							alt=""
						/>
						<div className={styles.info_wrapper}>
							<div>
								<h1>{item.title}</h1>
								<ItemInfo item={item} />
								<div className="text-gray-400 max-w-2xl">{item.overview}</div>
								<div className="flex gap-6 mt-8">
									<TrailerButton setModalVisible={setModalVisible} />
									<Bookmark />
								</div>
							</div>

							<div>
								<div className={styles.actors_wrapper}>
									<h3>Actors</h3>
									<div>
										{actors?.slice(0, 7).map((actor) => (
											<div className={styles.actor_wrapper}>
												<img
													src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
													alt=""
												/>
												<div>{actor.name}</div>
											</div>
										))}
										<div className={styles.view_all}>
											VIEW <br /> ALL
										</div>
									</div>
								</div>
								<div>
									<h3>Similar Movies</h3>
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
