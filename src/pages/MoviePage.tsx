import { useQuery } from "react-query";
import {
	getComingSoon,
	getNowPlaying,
	getPopular,
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
	scrollState,
} from "../state/movieState";
import MovieDetailPage from "./MovieDetailPage";
import { useEffect } from "react";

const MovieContainer = styled(motion.div)`
	display: flex;
	margin-top: 50px;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
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
	background-color: black;
	position: absolute;
	border-radius: 15px;
	display: flex;
	text-align: center;
	flex-direction: column;
	z-index: 3;
	pointer-events: none;
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

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const MoviePage: React.FC = () => {
	const [tab] = useRecoilState(tabState);
	const [, setMovie] = useRecoilState(movieState);
	const [modal, setModal] = useRecoilState(modalState);
	const [scroll, setScroll] = useRecoilState(scrollState);
	const [locale] = useRecoilState(localeState);

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

	const { isLoading, data, refetch } = useQuery(
		tab === "POPULAR"
			? ["popular", locale]
			: tab === "COMING SOON"
			? ["coming-soon", locale]
			: ["now-playing", locale],
		tab === "POPULAR"
			? ({ queryKey }) => getTMDBPopular(queryKey[1])
			: tab === "COMING SOON"
			? ({ queryKey }) => getTMDBComingSoon(queryKey[1])
			: ({ queryKey }) => getTMDBNowPlaying(queryKey[1]),
		{
			refetchOnWindowFocus: false,
			retry: 0,
			onSuccess: (data) => {
				console.log(data.results);
			},
		}
	);

	useEffect(() => {
		refetch();
	}, [locale]);

	useEffect(() => {
		if (modal) {
			preventScroll();
		} else {
			allowScroll(scroll);
		}
	}, [modal, setModal]);

	function OpenModal(id: any) {
		setMovie(id);
		setModal(true);
		console.log(id);
		console.log(modal);
	}

	function CloseModal() {
		if (modal) {
			setModal(false);
		}
	}

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	const img = {
		whileHover: {
			scale: 1.1,
			y: -50,
		},
	};

	if (isLoading) return null;

	return (
		<>
			<MovieContainer
				key={tab}
				variants={container}
				initial="hidden"
				animate="visible"
				onClick={CloseModal}
			>
				{data.results.map((movie: any) => (
					<Movie key={movie.id} variants={item}>
						<ImgHover
							src={makeImagePath(movie.poster_path)}
							variants={img}
							whileHover="whileHover"
							onClick={() => OpenModal(movie.id)}
						></ImgHover>
						<Text>{movie.title}</Text>
						<Info>
							<p
								style={{ color: "yellow", fontSize: "20px", marginTop: "20px" }}
							>
								{movie.title}
							</p>
							<p style={{ marginTop: "20px" }}>{movie.release_date}</p>
							<p style={{ marginTop: "20px", fontSize: "14px" }}>
								{movie.overview.slice(0, 100) + "..."}
							</p>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
									position: "absolute",
									bottom: "10px",
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
									<Star style={{ marginRight: "5px", color: "yellow" }} />
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
