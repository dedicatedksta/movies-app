import React from "react";
import cn from "./Loader.module.scss";

const Loader = () => {
	return (
		<div className="flex justify-center items-center gap-2">
			<span className={cn.dot_one}></span>
			<span className={cn.dot_two}></span>
			<span className={cn.dot_three}></span>
		</div>
	);
};

export default Loader;
