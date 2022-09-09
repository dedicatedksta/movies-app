import { movieGenres } from "./genre ids/movieGenres";
import { tvGenres } from "./genre ids/tvGenres";

export const getMovieGenres = (genre_ids: number[]) => {
	const genres: string[] = [];
	if (genre_ids) {
		genre_ids.map((id) => {
			movieGenres.map((genre) => {
				genre.id === id ? genres.push(genre.name) : null;
			});
		});

		return genres.join(", ");
	}
	return undefined;
};

export const getTvGenres = (genre_ids: number[]) => {
	console.log(genre_ids);
	const genres: string[] = [];
	if (genre_ids) {
		genre_ids.map((id) => {
			tvGenres.map((genre) => {
				genre.id === id ? genres.push(genre.name) : null;
			});
		});

		return genres.join(", ");
	}
	return undefined;
};
