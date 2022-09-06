import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { TmbdApiService } from "../../services/TmbdApiService";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import { IVideo } from "../../types/video";
import Modal from "../modal/Modal";
import Video from "../modal/Video";
import Loader from "../ui/loader/Loader";
import TrailerButton from "../ui/trailer button/TrailerButton";
import styles from "./Backdrop.module.scss";

interface BackdropProps {
	item: IMovie | ITvShow;
	genres: string | undefined;
	sidebarActive: string;
	loading: boolean;
}

const Backdrop: FC<BackdropProps> = ({
	item,
	genres,
	sidebarActive,
	loading,
}) => {
	const [videos, setVideos] = useState<IVideo[]>([]);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	useEffect(() => {
		if (item.id) {
			getVideos();
		}
	}, [item]);

	async function getVideos() {
		const videos = await TmbdApiService.getVideo(item.id, sidebarActive);
		setVideos(videos);
	}
	return loading ? (
		<div className="h-[50vh] flex justify-center items-center bg-[#0A0A0A]">
			<Loader />
		</div>
	) : (
		<div className={styles.backdrop_wrapper}>
			{modalVisible && (
				<Modal visible={modalVisible} setVisible={setModalVisible}>
					<Video id={videos[0].key} title={item.title || item.original_name} />
				</Modal>
			)}
			<div className={styles.image_wrapper}>
				{Object.keys(item).length !== 0 && (
					// <Image
					// 	src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
					// 	layout="fill"
					// />
					<img
						src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
						className="object-cover"
					/>
				)}
			</div>
			<div className={styles.text_wrapper}>
				<h1>{item.title || item.original_name}</h1>
				<div className={styles.genre_wrapper}>
					{(genres || item.genres) && (
						<span>
							{genres || item?.genres.map((genre) => genre.name).join(", ")}
						</span>
					)}
					<span>{Number(item.vote_average?.toFixed(1))}/10</span>
				</div>
				<div className={styles.description}>{item.overview}</div>
				<div className={styles.button_wrapper}>
					<Link href={`/${sidebarActive}/${item.id}`}>
						<a>Learn More</a>
					</Link>
					<TrailerButton setModalVisible={setModalVisible} />
				</div>
			</div>
		</div>
	);
};

export default Backdrop;
