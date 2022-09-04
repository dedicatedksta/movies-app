import { FC } from "react";
import { IPerson } from "../../../types/person";
import ActorAvatar from "../../ui/actor avatar/ActorAvatar";
import styles from "./ActorsList.module.scss";

interface ActorsListProps {
	actors: IPerson[];
	handleClick: () => void;
}
const ActorsList: FC<ActorsListProps> = ({ actors, handleClick }) => {
	console.log(actors);
	return (
		<div className={styles.actors_wrapper}>
			<h3>Cast</h3>

			<div>
				{actors?.slice(0, 6).map((actor) => (
					<ActorAvatar key={actor.id} actor={actor} />
				))}
				<button onClick={handleClick} className={styles.view_all}>
					VIEW <br /> ALL
				</button>
			</div>
		</div>
	);
};

export default ActorsList;
