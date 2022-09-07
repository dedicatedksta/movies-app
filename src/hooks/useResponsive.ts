import { useEffect, useState } from "react";

export const useResponsive = (width: number): { similarShown: number } => {
	// const [similarMoviesShown, setSimilarMoviesShown] = useState<number>(6);
	// const [actorsShown, setActorsShown] = useState<number>(6);
	const [similarShown, setSimilarShown] = useState<number>(6);
	useEffect(() => {
		if (width <= 1440 && width > 1280) {
			setSimilarShown(5);
		} else if (width <= 1280 && width > 768) {
			setSimilarShown(4);
		} else if (width <= 768 && width > 430) {
			setSimilarShown(3);
		} else if (width <= 430) {
			setSimilarShown(3);
		}
	}, []);

	return { similarShown };
};
