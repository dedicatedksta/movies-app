import axios from "axios";
import { IMovie } from "../types/movie";

export class TmbdApiService {
	private static API_KEY = process.env.NEXT_PUBLIC_API_KEY;
	private static API_URL = "https://api.themoviedb.org/3";

	static async getPopular(type?: string): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/popular?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}

	static async getTopRated(type?: string): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/top_rated?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}

	static async getStreaming(type?: string): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/now_playing?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}

	static async getUpcoming(type?: string): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/upcoming?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}

	static async getOnTheAir(type?: string): Promise<IMovie[]> {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/on_the_air?api_key=${TmbdApiService.API_KEY}&language=en-US&page=1`
		);
		const data = await response.data;
		return data.results;
	}

	static async getVideo(id: number, type?: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/${type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
		);
		const data = response.data;
		const filteredVideos = data.results
			.filter((r: any) => r.type === "Trailer")
			.filter((r: any) => r.official);

		return filteredVideos;
	}

	static async getSearchedItems(query: string) {
		const response = await axios.get(
			`${TmbdApiService.API_URL}/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
		);
		const data = await response.data;
		return data.results;
	}
}
