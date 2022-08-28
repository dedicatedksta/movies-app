import { FC, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IMovie } from "../../types/movie";
import Movie from "../movie/Movie";
import styles from "./BottomMovies.module.scss";

const BottomMovies: FC<{ movie: IMovie }> = ({ movie }) => {
	const [activeTab, setActiveTab] = useState(1);

	return (
		<div className={styles.b_movies_wrapper}>
			<div className={styles.category_wrapper}>
				<span
					onClick={() => setActiveTab(1)}
					className={activeTab === 1 ? styles.active : ""}
				>
					Top Rated (100)
				</span>
				<span
					onClick={() => setActiveTab(2)}
					className={activeTab === 2 ? styles.active : ""}
				>
					Most Popular
				</span>
				<span
					onClick={() => setActiveTab(3)}
					className={activeTab === 3 ? styles.active : ""}
				>
					Recomended
				</span>
				<span
					onClick={() => setActiveTab(4)}
					className={activeTab === 4 ? styles.active : ""}
				>
					Upcoming
				</span>
			</div>
			<div className={styles.carousel_wrapper}>
				<div className={styles.carousel_info_wrapper}>
					<h6>Movies</h6>
					<div className={styles.arrow_wrapper}>
						<FiChevronLeft />
						<FiChevronRight />
					</div>
				</div>
				<div>
					<Movie movie={movie} />
				</div>
			</div>
		</div>
	);
};

export default BottomMovies;
