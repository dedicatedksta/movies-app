import React, { FC, SetStateAction } from "react";
import { BiGroup } from "react-icons/bi";
import { CgClapperBoard } from "react-icons/cg";
import { GiTv } from "react-icons/gi";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
	sidebarActive: string;
	setSidebarActive: React.Dispatch<SetStateAction<string>>;
	setActiveTab: React.Dispatch<SetStateAction<number>>;
}

const Sidebar: FC<SidebarProps> = ({
	sidebarActive,
	setSidebarActive,
	setActiveTab,
}) => {
	return (
		<aside className={styles.sidebar_wrapper}>
			<CgClapperBoard
				onClick={() => {
					setSidebarActive("movie");
					setActiveTab(2);
				}}
				className={sidebarActive === "movie" ? styles.active : ""}
			/>
			<GiTv
				onClick={() => {
					setSidebarActive("tv");
					setActiveTab(2);
				}}
				className={sidebarActive === "tv" ? styles.active : ""}
			/>
			<BiGroup />
		</aside>
	);
};

export default Sidebar;
