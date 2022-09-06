import { FC, useEffect, useState } from "react";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { ITvShow } from "../../../types/tv";
import { getMovieGenres } from "../../../utils/getGenreList";
import Backdrop from "../../backdropImage/Backdrop";
import BottomItems from "../../bottomItems/BottomItems";
import Navbar from "../../ui/navbar/Navbar";
import Sidebar from "../../ui/sidebar/Sidebar";
import Watchlist from "../../watchlist/Watchlist";

interface HomeProps {
	sidebar_active?: string;
}

const Home: FC<HomeProps> = () => {
	const [items, setItems] = useState<IMovie[] | ITvShow[]>([]);
	const [renderedItem, setRenderedItem] = useState<IMovie | ITvShow>(
		items[0] || {}
	);
	const [renderedItemGenres, setRenderedItemGenres] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<number>(2);
	const [sidebarActive, setSidebarActive] = useState("movie");

	useEffect(() => {
		if (sidebarActive !== "favourite") {
			switch (activeTab) {
				case 1:
					fetchItems(TmbdApiService.getItems, "top_rated");
					break;
				case 2:
					fetchItems(TmbdApiService.getItems, "popular");
					break;
				case 3:
					fetchItems(TmbdApiService.getItems, "now_playing");
					break;
				case 4:
					if (sidebarActive === "movie") {
						fetchItems(TmbdApiService.getItems, "upcoming");
					} else {
						fetchItems(TmbdApiService.getItems, "on_the_air");
					}
					break;
			}
		}
	}, [activeTab, sidebarActive]);

	async function fetchItems(
		service: (type: string, category: string) => Promise<IMovie[]>,
		category: string
	) {
		setLoading(true);
		const Items = await service(sidebarActive, category);
		setItems(Items);
		setRenderedItem(Items[0]);
		setRenderedItemGenres(getMovieGenres(Items[0].genre_ids));
		setLoading(false);
	}
	return (
		<>
			<Navbar transparent={false} />
			<Sidebar
				sidebarActive={sidebarActive}
				setSidebarActive={setSidebarActive}
				setActiveTab={setActiveTab}
			/>
			<main className="ml-28 max-w-full h-[100vh] relative overflow-y-hidden">
				{sidebarActive === "favourite" ? (
					<Watchlist />
				) : (
					<>
						<Backdrop
							loading={loading}
							item={renderedItem}
							genres={renderedItemGenres}
							sidebarActive={sidebarActive}
						/>
						<BottomItems
							loading={loading}
							items={items}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							sidebarActive={sidebarActive}
						/>
					</>
				)}
			</main>
		</>
	);
};

export default Home;
