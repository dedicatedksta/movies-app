import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useResponsive } from "../../hooks/useResponsive";
import { IMovie } from "../../types/movie";
import { ITvShow } from "../../types/tv";
import SliderHandler from "../../utils/handleSlides";
import Categories from "../categories/Categories";
import Item from "../item/Item";
import Loader from "../ui/loader/Loader";
import SliderArrows from "../ui/slider arrows/SliderArrows";
import styles from "./BottomItems.module.scss";

interface BottomItemsProps {
	items: IMovie[] | ITvShow[];
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
	const { bottomItemsShown } = useResponsive();

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: bottomItemsShown,
		slidesToScroll: bottomItemsShown,
		arrows: false,
	};
	const sliderHandler = new SliderHandler(
		sliderRef,
		currentSlide,
		setCurrentSlide,
		items.length,
		settings.slidesToShow
	);

	return (
		<div className={styles.b_movies_wrapper}>
			<Categories
				setCurrentSlide={setCurrentSlide}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				sidebarActive={sidebarActive}
			/>
			<div className={styles.carousel_wrapper}>
				<div className={styles.carousel_info_wrapper}>
					<h6>{`${sidebarActive === "movie" ? "Movies" : "TV Shows"}`}</h6>

					<SliderArrows
						leftUsable={currentSlide !== 1}
						rightUsable={
							currentSlide !== Math.ceil(items.length / settings.slidesToScroll)
						}
						sliderHandler={sliderHandler}
					/>
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
