export interface IPerson {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	profile_path: string;
	character: string;
	poster_path?: string;
	media_type?: string;
	title?: null;
	vote_average?: null;
	genre_ids: number[];
	biography?: string;
	place_of_birth: string;
	birthday: string;
}
