import { FC, useEffect, useState } from "react";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { getMovieGenres } from "../../../utils/getGenreList";
import Backdrop from "../../backdropImage/Backdrop";
import BottomItems from "../../bottomItems/BottomItems";
import Loader from "../../ui/loader/Loader";
import Navbar from "../../ui/navbar/Navbar";
import Sidebar from "../../ui/sidebar/Sidebar";

interface HomeProps {
	sidebar_active?: string;
}

const Home: FC<HomeProps> = () => {
	const [items, setItems] = useState<IMovie[]>([]);
	const [renderedItem, setRenderedItem] = useState<IMovie>(items[0] || {});
	const [renderedItemGenres, setRenderedItemGenres] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<number>(2);
	const [sidebarActive, setSidebarActive] = useState("movie");

	useEffect(() => {
		switch (activeTab) {
			case 1:
				fetchItems(TmbdApiService.getTopRated);
				break;
			case 2:
				fetchItems(TmbdApiService.getPopular);
				break;
			case 3:
				fetchItems(TmbdApiService.getStreaming);
				break;
			case 4:
				if (sidebarActive === "movie") {
					fetchItems(TmbdApiService.getUpcoming);
				} else {
					fetchItems(TmbdApiService.getOnTheAir);
				}
				break;
		}
	}, [activeTab, sidebarActive]);

	async function fetchItems(service: (type: string) => Promise<IMovie[]>) {
		setLoading(true);
		const Items = await service(sidebarActive);
		setItems(Items);
		setRenderedItem(Items[0]);
		setRenderedItemGenres(getMovieGenres(Items[0].genre_ids));
		setLoading(false);
	}
	return (
		<>
			<Navbar />
			<Sidebar
				sidebarActive={sidebarActive}
				setSidebarActive={setSidebarActive}
			/>
			<main className="ml-28 max-w-[75vw] h-[100vh] relative">
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
			</main>
		</>
	);
};

export default Home;
