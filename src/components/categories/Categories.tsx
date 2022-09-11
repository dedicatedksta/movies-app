import React, { FC } from "react";
import styles from "./Categories.module.scss";

interface CategoriesProps {
	activeTab: number;
	setActiveTab: React.Dispatch<React.SetStateAction<number>>;
	sidebarActive: string;
	setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

const Categories: FC<CategoriesProps> = ({
	activeTab,
	setActiveTab,
	sidebarActive,
	setCurrentSlide,
}) => {
	return (
		<div className={styles.category_wrapper}>
			<span
				onClick={() => {
					setActiveTab(1);
					setCurrentSlide(1);
				}}
				className={activeTab === 1 ? styles.active : ""}
			>
				Top Rated
			</span>
			<span
				onClick={() => {
					setActiveTab(2);
					setCurrentSlide(1);
				}}
				className={activeTab === 2 ? styles.active : ""}
			>
				Most Popular
			</span>
			{sidebarActive === "movie" && (
				<span
					onClick={() => {
						setActiveTab(3);
						setCurrentSlide(1);
					}}
					className={activeTab === 3 ? styles.active : ""}
				>
					Now streaming
				</span>
			)}
			<span
				onClick={() => {
					setActiveTab(4);
					setCurrentSlide(1);
				}}
				className={activeTab === 4 ? styles.active : ""}
			>
				{sidebarActive === "movie" ? `upcoming` : `on the air`}
			</span>
		</div>
	);
};

export default Categories;
