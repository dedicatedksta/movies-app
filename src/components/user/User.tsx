import React from "react";
import { BsChevronDown } from "react-icons/bs";
import Avatar from "../ui/avatar/Avatar";
import styles from "./User.module.scss";

const User = () => {
	return (
		<div className={styles.user_wrapper}>
			<Avatar />
			<span>Ethan Carter</span>
			<BsChevronDown />
		</div>
	);
};

export default User;
