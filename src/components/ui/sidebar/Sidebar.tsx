import React, { FC, SetStateAction } from "react";
import { CgClapperBoard } from "react-icons/cg";
import { GiTv } from "react-icons/gi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
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
				className={`mb-[3px] ${sidebarActive === "tv" ? styles.active : ""}`}
			/>
			<MdOutlineFavoriteBorder
				onClick={() => {
					setSidebarActive("favourite");
				}}
				className={sidebarActive === "favourite" ? styles.active : ""}
			/>
		</aside>
	);
};

export default Sidebar;
