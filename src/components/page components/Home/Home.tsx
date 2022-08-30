import { FC, useEffect, useState } from "react";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { getMovieGenres } from "../../../utils/getGenreList";
import Backdrop from "../../backdropImage/Backdrop";
import BottomMovies from "../../bottomMovies/BottomMovies";
import Loader from "../../ui/loader/Loader";
import Navbar from "../../ui/navbar/Navbar";
import Sidebar from "../../ui/sidebar/Sidebar";

interface HomeProps {
	sidebar_active?: string;
}

const Home: FC<HomeProps> = () => {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [renderedMovie, setRenderedMovie] = useState<IMovie>(movies[0] || {});
	const [renderedMovieGenres, setRenderedMovieGenres] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<number>(2);
	const [sidebarActive, setSidebarActive] = useState("movie");

	useEffect(() => {
		switch (activeTab) {
			case 1:
				fetchMovies(TmbdApiService.getTopRatedMovies);
				break;
			case 2:
				fetchMovies(TmbdApiService.getPopularMovies);
				break;
			case 3:
				fetchMovies(TmbdApiService.getStreamingMovies);
				break;
			case 4:
				fetchMovies(TmbdApiService.getUpcomingMovies);
				break;
		}
	}, [activeTab, sidebarActive]);

	async function fetchMovies(service: (type: string) => Promise<IMovie[]>) {
		setLoading(true);
		const movies = await service(sidebarActive);
		setMovies(movies);
		setRenderedMovie(movies[0]);
		setRenderedMovieGenres(getMovieGenres(movies[0].genre_ids));
		setLoading(false);
	}
	return (
		<>
			<Navbar />
			<Sidebar
				sidebarActive={sidebarActive}
				setSidebarActive={setSidebarActive}
			/>
			{!loading ? (
				<main className="ml-28 max-w-[75vw] h-[100vh] relative">
					<Backdrop
						movie={renderedMovie}
						genres={renderedMovieGenres}
						sidebarActive={sidebarActive}
					/>
					<BottomMovies
						movies={movies}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						sidebarActive={sidebarActive}
					/>
				</main>
			) : (
				<div className="h-screen flex items-center justify-center bg-[#0A0A0A]">
					<Loader />
				</div>
			)}
		</>
	);
};

export default Home;
