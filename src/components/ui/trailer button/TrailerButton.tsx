import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import styles from "./TrailerButton.module.scss";

const TrailerButton = () => {
	return (
		<div className={styles.trailer_buttons_wrapper}>
			<BsPlayCircle />
			<span>Play Trailer</span>
		</div>
	);
};

export default TrailerButton;
