import React, { FC, SetStateAction } from "react";
import { BiGroup } from "react-icons/bi";
import { CgClapperBoard } from "react-icons/cg";
import { GiTv } from "react-icons/gi";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
	sidebarActive: string;
	setSidebarActive: React.Dispatch<SetStateAction<string>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
	return (
		<aside className={styles.sidebar_wrapper}>
			<CgClapperBoard
				onClick={() => setSidebarActive("movie")}
				className={sidebarActive==='movie'?styles.active:""}
			/>
			<GiTv
				onClick={() => setSidebarActive("tv")}
				className={sidebarActive==='tv'?styles.active:""}
			/>
			<BiGroup

			/>
		</aside>
	);
};

export default Sidebar;
