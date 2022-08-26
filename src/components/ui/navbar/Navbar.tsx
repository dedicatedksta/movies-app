import { FC } from "react";
import User from "../../user/User";
import Input from "../input/Input";
import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
	return (
		<nav className={styles.navbar_wrapper}>
			<div className={styles.navbar_left}>
				<h1>IMDb</h1>
				<Input />
			</div>
			<User />
		</nav>
	);
};

export default Navbar;
