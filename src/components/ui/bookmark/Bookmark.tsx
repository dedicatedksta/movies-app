import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import styles from "./Bookmark.module.scss";

const Bookmark = () => {
	return (
		<div className={styles.bookmark_wrapper}>
			<BsFillBookmarkFill />
			<span>Add to watchlist</span>
		</div>
	);
};

export default Bookmark;
