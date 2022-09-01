import Link from "next/link";
import { FC } from "react";
import User from "../../user/User";
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
					<h1 className="cursor-pointer hover:text-cyan-400 transition-all ease-in-out duration-300">
						IMDb
					</h1>
				</Link>
				<Input />
			</div>
			<User />
		</nav>
	);
};

export default Navbar;
