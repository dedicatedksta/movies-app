import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { CgClapperBoard } from "react-icons/cg";
import { GiTv } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";
import { nanoid } from "nanoid";

type TypeIcon = {
	id: string;
	icon: React.ReactElement<any, any>;
	active: boolean;
};

const Sidebar = () => {
	const [icons, setIcons] = useState<TypeIcon[]>([
		{ id: nanoid(), icon: <CgClapperBoard />, active: true },
		{ id: nanoid(), icon: <GiTv />, active: false },
		{ id: nanoid(), icon: <BiGroup />, active: false },
	]);

	const handleClick = (id: string) => {
		const newIcons = icons.map((icon) =>
			icon.id === id ? { ...icon, active: true } : { ...icon, active: false }
		);
		setIcons(newIcons);
	};

	return (
		<aside className={styles.sidebar_wrapper}>
			{icons.map((icon) => (
				<div
					key={icon.id}
					onClick={() => handleClick(icon.id)}
					className={icon.active ? styles.active : ""}
				>
					{icon.icon}
				</div>
			))}
		</aside>
	);
};

export default Sidebar;
