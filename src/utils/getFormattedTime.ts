export const getFormattedTime = (time: number) => {
	return `${Math.floor(time / 60)}h ${time % 60}m`;
};
