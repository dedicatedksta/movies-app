import { useEffect, useState } from "react";

export const useResponsive = (): {
	bottomItemsShown: number;
	similarShown: number;
	actorItemsShown: number;
	mobile: boolean;
} => {
	const [similarShown, setSimilarShown] = useState<number>(6);
	const [bottomItemsShown, setBottomItemsShown] = useState<number>(5);
	const [actorItemsShown, setActorItemsShown] = useState<number>(4);
	const [mobile, setMobile] = useState<boolean>(false);

	function getResponsiveValue() {
		if (typeof window !== "undefined") {
			if (window.innerWidth >= 1550) {
				setSimilarShown(6);
				setMobile(false);
			} else if (window.innerWidth >= 1440 && window.innerWidth < 1550) {
				setSimilarShown(5);
				setBottomItemsShown(5);
				setActorItemsShown(4);
				setMobile(false);
			} else if (window.innerWidth < 1440 && window.innerWidth > 1280) {
				setSimilarShown(5);
				setMobile(false);
			} else if (window.innerWidth <= 1280 && window.innerWidth > 768) {
				setSimilarShown(4);
				setBottomItemsShown(3);
				setActorItemsShown(3);
				setMobile(false);
			} else if (window.innerWidth <= 768 && window.innerWidth > 430) {
				setSimilarShown(3);
				setBottomItemsShown(2);
				setActorItemsShown(2);
				setMobile(true);
			} else if (window.innerWidth <= 430) {
				setSimilarShown(3);
				setMobile(true);
			}
		}
	}

	useEffect(() => {
		getResponsiveValue();
	}, []);
	if (typeof window !== "undefined") {
		window.addEventListener("resize", getResponsiveValue);
	}

	return { bottomItemsShown, similarShown, actorItemsShown, mobile };
};
