import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";
import { IMovie } from "../../types/movie";
import Item from "../item/Item";
import Loader from "../ui/loader/Loader";
import styles from "./BottomItems.module.scss";

interface BottomItemsProps {
	items: IMovie[];
	activeTab: number;
	setActiveTab: React.Dispatch<SetStateAction<number>>;
	sidebarActive: string;
	loading: boolean;
}

const BottomItems: FC<BottomItemsProps> = ({
	items,
	activeTab,
	setActiveTab,
	sidebarActive,
	loading,
}) => {
	const sliderRef = useRef<Slider>(null);
	const [currentSlide, setCurrentSlide] = useState<number>(1);

	useEffect(() => {
		setCurrentSlide(1);
	}, [items]);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: false,
	};
	const previousSlide = () => {
		if (currentSlide > 1) {
			sliderRef.current!.slickPrev();
			setCurrentSlide(currentSlide - 1);
		}
	};

	const nextSlide = () => {
		if (currentSlide !== items.length / settings.slidesToScroll) {
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
				{sidebarActive === "movie" && (
					<span
						onClick={() => setActiveTab(3)}
						className={activeTab === 3 ? styles.active : ""}
					>
						Now streaming
					</span>
				)}
				<span
					onClick={() => setActiveTab(4)}
					className={activeTab === 4 ? styles.active : ""}
				>
					{sidebarActive === "movie" ? `upcoming` : `on the air`}
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
											currentSlide === items.length / settings.slidesToScroll
												? "text-neutral-500 "
												: "text-white-500 hover:text-cyan-500 "
										}
                      transition-all ease-in-out duration-300`}
							onClick={nextSlide}
						/>
					</div>
				</div>
				{loading ? (
					<div className="flex justify-center items-center h-[25vh]">
						<Loader />
					</div>
				) : (
					<Slider ref={sliderRef} {...settings}>
						{items.map((item) => (
							<Item key={item.id} item={item} sidebarActive={sidebarActive} />
						))}
					</Slider>
				)}
			</div>
		</div>
	);
};

export default BottomItems;
