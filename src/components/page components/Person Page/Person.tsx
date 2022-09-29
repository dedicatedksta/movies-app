import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useResponsive } from "../../../hooks/useResponsive";
import { TmbdApiService } from "../../../services/TmbdApiService";
import { IMovie } from "../../../types/movie";
import { IPerson } from "../../../types/person";
import { ITvShow } from "../../../types/tv";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import SliderHandler from "../../../utils/handleSlides";
import Item from "../../item/Item";
import FormattedData from "../../Person Page components/FormattedData";
import Loader from "../../ui/loader/Loader";
import Navbar from "../../ui/navbar/Navbar";
import SliderArrows from "../../ui/slider arrows/SliderArrows";
import styles from "./Person.module.scss";

interface PersonProps {
	id: string | string[] | undefined;
}

const Person: FC<PersonProps> = ({ id }) => {
	const [personInfo, setPersonInfo] = useState<IPerson>();
	const [famousFor, setFamousFor] = useState<(IMovie | ITvShow)[]>([]);
	const sliderRef = useRef<Slider>(null);
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [shown, setShown] = useState(false);
	const birthday = getFormattedDate(personInfo?.birthday);
	const { actorItemsShown } = useResponsive();
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: actorItemsShown,
		slidesToScroll: actorItemsShown,
		arrows: false,
	};

	const sliderHandler = new SliderHandler(
		sliderRef,
		currentSlide,
		setCurrentSlide,
		famousFor.length,
		settings.slidesToShow
	);

	useEffect(() => {
		getPersonInfo();
	}, [id]);

	const getPersonInfo = async () => {
		setLoading(true);
		const person = await TmbdApiService.getPersonInfo(id);
		const famousFor = await TmbdApiService.getPersonCredits(id);
		const sorted = famousFor.sort(
			(a: any, b: any) => b.vote_count - a.vote_count
		);
		setFamousFor(sorted.slice(0, 12));
		setPersonInfo(person);
		setLoading(false);
	};

	return (
		<>
			<Head>
				<title>{personInfo?.name}</title>
			</Head>
			<Navbar transparent={false} />
			{loading ? (
				<div className="h-screen flex items-center justify-center">
					<Loader />
				</div>
			) : (
				<div className={styles.person_wrapper}>
					<h1 className="md:hidden text-3xl font-bold">{personInfo?.name}</h1>

					<div className="flex md:flex-col">
						<img
							className=" h-56 md:h-auto"
							src={`https://image.tmdb.org/t/p/w300${personInfo?.profile_path}`}
							alt=""
						/>
						<div className="flex flex-col ml-8 md:ml-0">
							{personInfo?.known_for_department && (
								<FormattedData
									title="Famous for"
									body={personInfo?.known_for_department}
								/>
							)}
							{personInfo?.gender && (
								<FormattedData
									title="Gender"
									body={personInfo?.gender === 2 ? "Male" : "Female"}
								/>
							)}
							{birthday && (
								<FormattedData title="Date of birth" body={birthday} />
							)}
							{personInfo?.place_of_birth && (
								<FormattedData
									title="Place of birth"
									body={personInfo?.place_of_birth}
								/>
							)}
						</div>
					</div>
					<div className={styles.info_wrapper}>
						<div>
							<h1 className="hidden md:block text-3xl font-bold">
								{personInfo?.name}
							</h1>
							<div className="my-8">
								<div className="md:text-lg font-bold mb-2"> Biography</div>
								<div className="text-sm xl:text-base lg:text-sm md:text-sm">
									{shown
										? personInfo?.biography
										: personInfo?.biography?.slice(0, 1750)}
									{personInfo?.biography &&
										personInfo?.biography?.length > 1750 && (
											<>
												{!shown && <span>...</span>}
												<span
													onClick={() => setShown(!shown)}
													className="ml-2 text-cyan-400 hover:text-cyan-500 cursor-pointer"
												>
													{!shown ? "read more" : "read less"}
												</span>
											</>
										)}
								</div>
							</div>
						</div>
						<div>
							<div className={styles.arrow_wrapper}>
								<SliderArrows
									leftUsable={currentSlide !== 1}
									rightUsable={
										currentSlide !==
										Math.ceil(famousFor.length / settings.slidesToScroll)
									}
									sliderHandler={sliderHandler}
								/>
							</div>
							<div className="py-2">
								<Slider ref={sliderRef} {...settings}>
									{famousFor.map((item) => (
										<Item
											key={item.id}
											item={item}
											sidebarActive={item.media_type}
										/>
									))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Person;
