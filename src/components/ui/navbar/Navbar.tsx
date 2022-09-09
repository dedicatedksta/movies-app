import Link from "next/link";
import { FC } from "react";
import Input from "../input/Input";
import styles from "./Navbar.module.scss";

const Navbar: FC<{ transparent: boolean }> = ({ transparent }) => {
	return (
		<nav
			className={styles.navbar_wrapper}
			style={{ backgroundColor: "transparent" }}
		>
			<div className={styles.navbar_left}>
				<Link href={`/`}>
					<h1>IMDb</h1>
				</Link>
				<Input />
			</div>
		</nav>
	);
};

export default Navbar;
