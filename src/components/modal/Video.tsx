import React, { FC } from "react";

interface VideoProps {
	id: string;
	title: string | undefined;
}

const Video: FC<VideoProps> = ({ id, title }) => {
	return (
		<iframe
			onClick={(e) => e.stopPropagation()}
			className=" aspect-video w-3/4 "
			src={`https://www.youtube.com/embed/${id}?rel=0&autoplay=1`}
			title={title}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	);
};

export default Video;
