import axios from "axios";
import { IMovie } from "../types/movie";

export class TmbdApiService {
	private static API_KEY = process.env.NEXT_PUBLIC_API_KEY;
	private static API_URL = "https://api.themoviedb.org/3";

	static async getItems(type?: string, category?: string): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/${category}?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}

	static async getVideo(id: number, type?: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/${id}/videos?api_key=${TmbdApiService.API_KEY}&language=en-US`
		);
		const data = response.data;
		const filteredVideos = data.results
			.filter((r: any) => r.type === "Trailer")
			.filter((r: any) => r.official);

		return filteredVideos;
	}

	static async getSearchedItems(query: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/search/multi?api_key=${TmbdApiService.API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
		);
		const data = await response.data;
		return data.results;
	}

	static async getItem(id: string | string[] | undefined, type: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/${id}?api_key=${TmbdApiService.API_KEY}&language=en-US`
		);
		const data = await response.data;
		return data;
	}

	static async getActors(id: string | string[] | undefined, type: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/${id}/credits?api_key=${TmbdApiService.API_KEY}&language=en-US`
		);
		const data = await response.data;
		console.log(data);
		return data.cast.length > 0 ? data.cast : data.crew;
	}

	static async getSimilar(id: string | string[] | undefined, type: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/${id}/similar?api_key=${TmbdApiService.API_KEY}&language=en-US`
		);
		const data = await response.data;
		return data.results;
	}
}
