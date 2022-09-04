import { FC, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";
import { IMovie } from "../../../types/movie";
import { ITvShow } from "../../../types/tv";
import SliderHandler from "../../../utils/handleSlides";
import SimilarItem from "../../ui/similar items/SimilarItem";
import styles from "./SimilarItems.module.scss";

interface SimilarItemsProps {
	similar: IMovie[] | ITvShow[];
	itemType: string;
}

const SimilarItems: FC<SimilarItemsProps> = ({ similar, itemType }) => {
	const sliderRef = useRef<Slider>(null);
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 7,
		arrows: false,
	};
	const sliderHandler = new SliderHandler(
		sliderRef,
		currentSlide,
		setCurrentSlide,
		similar.length,
		settings.slidesToScroll
	);

	return (
		<div className="pt-6">
			<h3>{itemType === "tv" ? "Similar Shows" : "Similar Movies"}</h3>
			{similar && (
				<Slider ref={sliderRef} {...settings}>
					{similar?.map((sim) => (
						<SimilarItem key={sim.id} itemType={itemType} item={sim} />
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
					onClick={() => sliderHandler.previousSlide()}
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
					onClick={() => sliderHandler.nextSlide()}
				/>
			</div>
		</div>
	);
};

export default SimilarItems;
