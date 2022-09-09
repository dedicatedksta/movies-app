import { useEffect, useState } from "react";

export const useResponsive = (): {
	bottomItemsShown: number;
	similarShown: number;
	actorItemsShown: number;
} => {
	const [similarShown, setSimilarShown] = useState<number>(6);
	const [bottomItemsShown, setBottomItemsShown] = useState<number>(5);
	const [actorItemsShown, setActorItemsShown] = useState<number>(4);

	function getResponsiveValue() {
		if (typeof window !== "undefined") {
			if (window.innerWidth >= 1550) {
				setSimilarShown(6);
			} else if (window.innerWidth >= 1440 && window.innerWidth < 1550) {
				setSimilarShown(5);
				setBottomItemsShown(5);
				setActorItemsShown(4);
			} else if (window.innerWidth < 1440 && window.innerWidth > 1280) {
				setSimilarShown(5);
			} else if (window.innerWidth <= 1280 && window.innerWidth > 768) {
				setSimilarShown(4);
				setBottomItemsShown(3);
				setActorItemsShown(3);
			} else if (window.innerWidth <= 768 && window.innerWidth > 430) {
				setSimilarShown(3);
				setBottomItemsShown(2);
				setActorItemsShown(2);
			} else if (window.innerWidth <= 430) {
				setSimilarShown(3);
			}
		}
	}

	useEffect(() => {
		getResponsiveValue();
	}, []);
	if (typeof window !== "undefined") {
		window.addEventListener("resize", getResponsiveValue);
	}

	return { bottomItemsShown, similarShown, actorItemsShown };
};
