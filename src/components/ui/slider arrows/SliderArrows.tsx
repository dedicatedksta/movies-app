import { FC } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SliderHandler from "../../../utils/handleSlides";
import styles from "./SliderArrows.module.scss";

interface SliderArrowsProps {
	leftUsable: boolean;
	rightUsable: boolean;
	sliderHandler: SliderHandler;
}

const SliderArrows: FC<SliderArrowsProps> = ({
	leftUsable,
	rightUsable,
	sliderHandler,
}) => {
	return (
		<div className={styles.arrow_wrapper}>
			<FiChevronLeft
				id={styles.arrow}
				className={leftUsable ? styles.usable : ""}
				onClick={() => sliderHandler.previousSlide()}
			/>
			<FiChevronRight
				id={styles.arrow}
				className={rightUsable ? styles.usable : ""}
				onClick={() => sliderHandler.nextSlide()}
			/>
		</div>
	);
};

export default SliderArrows;
