import React, { FC, SetStateAction } from "react";
import { BsPlayCircle } from "react-icons/bs";
import styles from "./TrailerButton.module.scss";

const TrailerButton: FC<{
	setModalVisible: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setModalVisible }) => {
	return (
		<div
			className={styles.trailer_buttons_wrapper}
			onClick={() => setModalVisible(true)}
		>
			<BsPlayCircle />
			<span>Play Trailer</span>
		</div>
	);
};

export default TrailerButton;
