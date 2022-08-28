import axios from "axios";
import { IMovie } from "../types/movie";

export class TmbdApiService {
	private static API_KEY = process.env.NEXT_PUBLIC_API_KEY;
	private static API_URL = "https://api.themoviedb.org/3";

	static async getPopularMovies(): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/movie/popular?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}
}
