import { FC } from "react";
import styles from "./FormattedData.module.scss";

interface FormattedDataProps {
	title: string;
	body: string;
}

const FormattedData: FC<FormattedDataProps> = ({ title, body }) => {
	return (
		<div className={styles.data_wrapper}>
			<div className={styles.title}>{title}</div>
			<div className={styles.body}>{body}</div>
		</div>
	);
};

export default FormattedData;
