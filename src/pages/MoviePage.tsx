import { useQuery } from "react-query";
import {
	getTMDBNowPlaying,
	getTMDBPopular,
	makeImagePath,
	getTMDBComingSoon,
} from "../api/api";
import { useRecoilState } from "recoil";
import { tabState } from "../state/tabState";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { FaStar as Star } from "react-icons/fa6";
import {
	localeState,
	modalState,
	movieState,
	pageState,
	scrollState,
} from "../state/movieState";
import MovieDetailPage from "./MovieDetailPage";
import { useEffect, useState } from "react";

const MovieContainer = styled(motion.div)`
	display: flex;
	margin-top: 50px;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	color: ${(props) => props.theme.fontColor};
`;

const Movie = styled(motion.div)`
	display: flex;
	flex-direction: column;
	min-width: 200px;
	max-width: 200px;
	min-height: 300px;
	margin: 20px;
	text-align: center;
	position: relative;
	justify-content: center;
	align-items: center;
`;

const Info = styled.div`
	min-width: 100%;
	height: 100%;
	opacity: 0;
	background-color: ${(props) => props.theme.backgroundColor};
	position: absolute;
	border-radius: 15px;
	display: flex;
	text-align: center;
	flex-direction: column;
	z-index: 3;
	pointer-events: none;
	color: ${(props) => props.theme.fontColor};
`;

const InfoTitle = styled.p`
	color: ${(props) => props.theme.titleColor};
	font-size: 20px;
	margin-top: 20px;
`;

const Img = styled(motion.img)`
	width: 100%;
	height: auto;
	border-radius: 15px;
	z-index: 2;
`;

const ImgHover = styled(Img)`
	&:hover ~ ${Info} {
		opacity: 0.8;
		transition: 0.5s;
		scale: 1.1;
		height: 300px;
		top: -50px;
	}
`;

const Text = styled.p`
	margin-top: 20px;
`;

const MoviePage: React.FC = () => {
	const [tab] = useRecoilState(tabState);
	const [, setMovie] = useRecoilState(movieState);
	const [modal, setModal] = useRecoilState(modalState);
	const [scroll, setScroll] = useRecoilState(scrollState);
	const [locale] = useRecoilState(localeState);
	const [page, setPage] = useRecoilState(pageState);
	const [cardsPerRow, setCardsPerRow] = useState<number>(0);
	const [movies, setMovies] = useState<any[]>([]);

	useEffect(() => {
		const updateCardsPerRow = () => {
			const cardWidth = 200;
			setCardsPerRow(Math.floor(window.innerWidth / cardWidth) - 1);
		};

		window.addEventListener("resize", updateCardsPerRow);
		updateCardsPerRow();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		setMovies([]);
		refetch();
	}, [tab, locale]);

	const preventScroll = () => {
		const currentScrollY = window.scrollY;
		document.body.style.position = "fixed";
		document.body.style.width = "100%";
		document.body.style.top = `-${currentScrollY}px`;
		document.body.style.overflowY = "scroll";
		setScroll(currentScrollY);
	};

	const allowScroll = (prevScrollY: number) => {
		document.body.style.position = "";
		document.body.style.width = "";
		document.body.style.top = "";
		document.body.style.overflowY = "";
		window.scrollTo(0, prevScrollY);
	};

	const { isLoading, refetch } = useQuery(
		tab === "POPULAR"
			? ["popular", locale, page]
			: tab === "COMING SOON"
			? ["coming-soon", locale, page]
			: ["now-playing", locale, page],
		tab === "POPULAR"
			? ({ queryKey }) => getTMDBPopular(queryKey[1], queryKey[2])
			: tab === "COMING SOON"
			? ({ queryKey }) => getTMDBComingSoon(queryKey[1], queryKey[2])
			: ({ queryKey }) => getTMDBNowPlaying(queryKey[1], queryKey[2]),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			retry: 0,
			onSuccess: (newData) => {
				setMovies((prevMovies) => {
					const updatedMovies = [...prevMovies];
					newData.results.forEach((newMovie: any) => {
						if (!prevMovies.some((movie) => movie.id === newMovie.id)) {
							updatedMovies.push(newMovie);
						}
					});
					return updatedMovies;
				});
			},
		}
	);

	useEffect(() => {
		if (modal) {
			preventScroll();
		} else {
			allowScroll(scroll);
		}
	}, [modal, setModal]);

	useEffect(() => {
		const loadMoreMovies = () => {
			const { scrollTop, clientHeight, scrollHeight } =
				document.documentElement;

			if (scrollTop + clientHeight >= scrollHeight - 5) {
				setPage((prevPage) => prevPage + 1);
			}
		};

		window.addEventListener("scroll", loadMoreMovies);
		return () => window.removeEventListener("scroll", loadMoreMovies);
	}, []);

	function OpenModal(id: any) {
		setMovie(id);
		setModal(true);
	}

	function CloseModal() {
		if (modal) {
			setModal(false);
		}
	}

	const img = {
		whileHover: {
			scale: 1.1,
			y: -50,
		},
	};

	if (isLoading) return null;

	return (
		<>
			<MovieContainer onClick={CloseModal}>
				{movies.map((movie: any, index: number) => (
					<Movie
						key={movie.id}
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: Math.max(0, Math.floor(index / cardsPerRow) * 0.6),
						}}
					>
						<ImgHover
							src={makeImagePath(movie.poster_path)}
							variants={img}
							whileHover="whileHover"
							onClick={() => OpenModal(movie.id)}
						></ImgHover>
						<Text>{movie.title}</Text>
						<Info>
							<InfoTitle>{movie.title}</InfoTitle>
							<p style={{ marginTop: "20px" }}>{movie.release_date}</p>
							<p
								style={{
									marginTop: "20px",
									fontSize: "14px",
									lineHeight: "150%",
								}}
							>
								{movie.overview.slice(0, 100) + "..."}
							</p>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
									position: "absolute",
									bottom: "20px",
									width: "100%",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: " center",
										alignItems: "center",
									}}
								>
									<Star style={{ marginRight: "5px", color: "orange" }} />
									<p>{movie.vote_average}</p>
								</div>
								<p>{`(${movie.vote_count})`}</p>
							</div>
						</Info>
					</Movie>
				))}
			</MovieContainer>
			{modal && <MovieDetailPage />}
		</>
	);
};

export default MoviePage;
