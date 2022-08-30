import { FC, SetStateAction, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IMovie } from "../../types/movie";
import Movie from "../movie/Movie";
import styles from "./BottomMovies.module.scss";
import Slider from "react-slick";

interface BottomMoviesProps {
	movies: IMovie[];
	activeTab: number;
	setActiveTab: React.Dispatch<SetStateAction<number>>;
	sidebarActive: string;
}

const BottomMovies: FC<BottomMoviesProps> = ({
	movies,
	activeTab,
	setActiveTab,
	sidebarActive,
}) => {
	const sliderRef = useRef<Slider>(null);
	const [currentSlide, setCurrentSlide] = useState<number>(1);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
	};
	console.log(currentSlide);
	const previousSlide = () => {
		if (currentSlide > 1) {
			sliderRef.current!.slickPrev();
			setCurrentSlide(currentSlide - 1);
		}
	};

	const nextSlide = () => {
		if (currentSlide !== movies.length / 4) {
			sliderRef.current!.slickNext();
			setCurrentSlide(currentSlide + 1);
		}
	};

	return (
		<div className={styles.b_movies_wrapper}>
			<div className={styles.category_wrapper}>
				<span
					onClick={() => setActiveTab(1)}
					className={activeTab === 1 ? styles.active : ""}
				>
					Top Rated
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
					Now Playing
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
					<h6>{`${sidebarActive === "movie" ? "Movies" : "TV Shows"}`}</h6>
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
											currentSlide === movies.length / 4
												? "text-neutral-500 "
												: "text-white-500 hover:text-cyan-500 "
										}
                      transition-all ease-in-out duration-300`}
							onClick={nextSlide}
						/>
					</div>
				</div>
				<Slider ref={sliderRef} {...settings}>
					{movies.map((movie) => (
						<Movie key={movie.id} movie={movie} sidebarActive={sidebarActive} />
					))}
				</Slider>
			</div>
		</div>
	);
};

export default BottomMovies;
