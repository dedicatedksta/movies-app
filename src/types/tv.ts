import { IGenre } from "./movie";

export interface ITvShow {
	media_type: string;
	original_name: string;
	id: number;
	backdrop_path: string | null;
	genre_ids: number[];
	overview: string;
	vote_average: number;
	title: undefined;
	poster_path: string | null;
	number_of_seasons: number;
	genres: IGenre[];
	runtime?: number;
	release_date?: string;
	first_air_date: string;
	type?: string;
}
