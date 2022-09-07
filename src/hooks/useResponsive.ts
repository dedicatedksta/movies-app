import { useEffect, useState } from "react";

export const useResponsive = (): {
	bottomItemsShown: number;
	similarShown: number;
	actorItemsShown: number;
} => {
	// const [similarMoviesShown, setSimilarMoviesShown] = useState<number>(6);
	// const [actorsShown, setActorsShown] = useState<number>(6);
	const [similarShown, setSimilarShown] = useState<number>(6);
	const [bottomItemsShown, setBottomItemsShown] = useState<number>(5);
	const [actorItemsShown, setActorItemsShown] = useState<number>(4);
	if (typeof window !== "undefined") {
		const width = window.innerWidth;
		useEffect(() => {
			if (width <= 1440 && width > 1280) {
				setSimilarShown(5);
			} else if (width <= 1280 && width > 768) {
				setSimilarShown(4);
				setBottomItemsShown(3);
				setActorItemsShown(3);
			} else if (width <= 768 && width > 430) {
				setSimilarShown(3);
				setBottomItemsShown(2);
				setActorItemsShown(2);
			} else if (width <= 430) {
				setSimilarShown(3);
			}
		}, []);
	}
	return { bottomItemsShown, similarShown, actorItemsShown };
};
