import React, { FC } from "react";
import { BsFillBookmarkFill, BsCheck } from "react-icons/bs";
import styles from "./Bookmark.module.scss";

const Bookmark: FC<{ disabled: boolean }> = ({ disabled }) => {
	return (
		<div
			className={`${styles.bookmark_wrapper} ${
				!disabled ? styles.active : styles.disabled
			}`}
		>
			{disabled ? <BsCheck /> : <BsFillBookmarkFill />}
			<span>{disabled ? "Already in Watchlist" : "Add to watchlist"}</span>
		</div>
	);
};

export default Bookmark;
