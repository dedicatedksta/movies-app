import React, { FC, SetStateAction, useState } from "react";
import styles from "./Sidebar.module.scss";
import { CgClapperBoard } from "react-icons/cg";
import { GiTv } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";

interface SidebarProps {
	sidebarActive: string;
	setSidebarActive: React.Dispatch<SetStateAction<string>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
	console.log(sidebarActive);
	return (
		<aside className={styles.sidebar_wrapper}>
			<CgClapperBoard
				onClick={() => setSidebarActive("movie")}
				className={
					sidebarActive === "movie" ? "fill-white" : "fill-neutral-500"
				}
			/>
			<GiTv
				onClick={() => setSidebarActive("tv")}
				className={sidebarActive === "tv" ? "fill-white" : "fill-neutral-500"}
			/>
			<BiGroup
				className={
					sidebarActive === "actors" ? "fill-white" : "fill-neutral-500"
				}
			/>
		</aside>
	);
};

export default Sidebar;
