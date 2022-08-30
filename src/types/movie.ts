export interface IGenre {
	id: number;
	name: string;
}

interface ICollection {
	backdrop_path: string | null;
	id: number;
	name: string;
	poster_path: string | null;
}

export interface IMovie {
	original_name: undefined;
	poster_path: string | null;
	genre_ids: number[];
	adult: boolean;
	overview: string;
	release_date: string;
	id: number;
	orginal_title: string;
	original_language: string;
	title: string;
	backdrop_path: string | null;
	vote_average: number;
}

export interface IMovieDetails extends IMovie {
	belongs_to_collection: null | ICollection;
	budget: number;
	genres: IGenre[];
	revenue: number;
	runtime: number | null;
	status:
		| "Rumored"
		| "Planned"
		| "In Production"
		| "Post Production"
		| "Released"
		| "Canceled";
}
