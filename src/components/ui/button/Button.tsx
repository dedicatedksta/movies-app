import React, { FC } from "react";
import styles from "./Button.module.scss";

const Button: FC<React.PropsWithChildren> = ({ children }) => {
	return <button className={styles.button}>{children}</button>;
};

export default Button;
