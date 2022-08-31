import React, { FC, useEffect, useState } from "react";

interface RatingProps {
	rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
	const [textColor, setTextColor] = useState("text-white");

	useEffect(() => {
		if (rating >= 8) {
			setTextColor("text-green-400");
		} else if (rating < 8 && rating >= 5) {
			setTextColor("text-yellow-400");
		} else {
			setTextColor("text-red-400");
		}
	}, [rating]);

	return <div className={textColor}>{rating}</div>;
};

export default Rating;
