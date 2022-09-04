import React, { FC } from "react";
import { IPerson } from "../../../types/person";
import styles from "./ActorAvatar.module.scss";

const ActorAvatar: FC<{ actor: IPerson }> = ({ actor }) => {
	return (
		<div className={styles.actor_wrapper}>
			<img
				src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
				alt=""
			/>
			<div>{actor.name}</div>
			<span>{actor.character}</span>
		</div>
	);
};

export default ActorAvatar;
