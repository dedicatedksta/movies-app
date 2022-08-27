import React, { FC, useState } from "react";
import styles from "./Sidebar.module.scss";
import { CgClapperBoard } from "react-icons/cg";
import { GiTv } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";

interface SidebarProps {
	sidebar_active: string;
}

const Sidebar: FC<SidebarProps> = ({ sidebar_active }) => {
	return (
		<aside className={styles.sidebar_wrapper}>
			<CgClapperBoard className={sidebar_active === "movies" ? "acitve" : ""} />
			<GiTv className={sidebar_active === "shows" ? "acitve" : ""} />
			<BiGroup className={sidebar_active === "actors" ? "acitve" : ""} />
		</aside>
	);
};

export default Sidebar;
