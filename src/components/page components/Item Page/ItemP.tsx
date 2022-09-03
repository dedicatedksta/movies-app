import { FC, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie, IMovieDetails } from "../../../types/movie";
import { IPerson } from "../../../types/person";
import { IVideo } from "../../../types/video";
import ItemInfo from "../../Item info/ItemInfo";
import Modal from "../../modal/Modal";
import Video from "../../modal/Video";
import ActorAvatar from "../../ui/actor avatar/ActorAvatar";
import Bookmark from "../../ui/bookmark/Bookmark";
import Loader from "../../ui/loader/Loader";
import SimilarMovie from "../../ui/similar movie/SimilarMovie";
import TrailerButton from "../../ui/trailer button/TrailerButton";
import styles from "./ItemP.module.scss";

interface ItemPProps {
	itemId: string | string[] | undefined;
}

const ItemP: FC<ItemPProps> = ({ itemId }) => {
	const [loading, setLoading] = useState(false);
	const [item, setItem] = useState<IMovieDetails>();
	const [actors, setActors] = useState<IPerson[]>();
	const [videoModalVisible, setVideoModalVisible] = useState(false);
	const [videos, setVideos] = useState<IVideo[]>([]);
	const [actorModalVisible, setActorModalVisible] = useState(false);
	const [similar, setSimialar] = useState<IMovie[]>([]);
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	const sliderRef = useRef<Slider>(null);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 6,
		arrows: false,
	};

	useEffect(() => {
		if (itemId) {
			fetchItem();
		}
		setCurrentSlide(1);
	}, [itemId]);

	const fetchItem = async () => {
		setLoading(true);
		const item = await TmbdApiService.getItem(itemId);
		const cast: IPerson[] = await TmbdApiService.getActors(itemId);
		const actors = cast.filter(
			(c) => c.known_for_department === "Acting" && c.profile_path
		);
		const videos = await TmbdApiService.getVideo(item.id, "movie");
		const similar = await TmbdApiService.getSimilar(item.id);
		setItem(item);
		setVideos(videos);
		setActors(actors);
		setSimialar(similar);
		setLoading(false);
	};
	const handleClick = () => {
		setActorModalVisible(true);
	};

	const previousSlide = () => {
		if (currentSlide > 1) {
			sliderRef.current!.slickPrev();
			setCurrentSlide(currentSlide - 1);
		}
	};

	const nextSlide = () => {
		if (currentSlide !== Math.ceil(similar.length / settings.slidesToScroll)) {
			sliderRef.current!.slickNext();
			setCurrentSlide(currentSlide + 1);
		}
	};
	console.log(similar);
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
						<img
							className={styles.img}
							src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
							alt=""
						/>
						<div className={styles.info_wrapper}>
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

							<div className={styles.right_side_info_wrapper}>
								<div className="pt-6">
									<h3>Similar Movies</h3>
									{similar && (
										<Slider ref={sliderRef} {...settings}>
											{similar?.map((sim) => (
												<SimilarMovie key={sim.id} movie={sim} />
											))}
										</Slider>
									)}
									<div className={styles.arrow_wrapper}>
										<FiChevronLeft
											className={`
										${
											currentSlide === 1
												? "text-neutral-500 "
												: "text-white-500 hover:text-cyan-500 "
										}
                    transition-all ease-in-out duration-300`}
											onClick={previousSlide}
										/>
										<FiChevronRight
											className={`
										${
											currentSlide ===
											Math.ceil(similar.length / settings.slidesToScroll)
												? "text-neutral-500 "
												: "text-white-500 hover:text-cyan-500 "
										}
                      transition-all ease-in-out duration-300`}
											onClick={nextSlide}
										/>
									</div>
								</div>
								<div className={styles.actors_wrapper}>
									<h3>Actors</h3>
									{actors && (
										<div>
											{actors?.slice(0, 8).map((actor) => (
												<ActorAvatar key={actor.id} actor={actor} />
											))}
											<button onClick={handleClick} className={styles.view_all}>
												VIEW <br /> ALL
											</button>
										</div>
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
