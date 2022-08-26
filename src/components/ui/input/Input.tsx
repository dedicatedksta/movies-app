import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Input.module.scss";

const Input = () => {
	const [value, setValue] = useState<string>("");
	return (
		<div className={styles.input_wrapper}>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Search movies, tv shows..."
				type="text"
			/>
			<BsSearch />
		</div>
	);
};

export default Input;
