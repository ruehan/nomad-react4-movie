import { useQuery } from "react-query";
import {
	getComingSoon,
	getNowPlaying,
	getPopular,
	makeImagePath,
} from "../api/api";
import { useRecoilState } from "recoil";
import { tabState } from "../state/tabState";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { FaStar as Star } from "react-icons/fa6";

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
	const [tab, setTab] = useRecoilState(tabState);

	const { isLoading, isError, data, error } = useQuery(
		tab === "POPULAR"
			? "popular"
			: tab === "COMING SOON"
			? "coming-soon"
			: "now-playing",
		tab === "POPULAR"
			? getPopular
			: tab === "COMING SOON"
			? getComingSoon
			: getNowPlaying,
		{
			refetchOnWindowFocus: false,
			retry: 0,
			onSuccess: (data) => {
				console.log(data.results);
			},
			onError: (e) => {
				// console.log(e.message);
			},
		}
	);

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
		<MovieContainer
			key={tab}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{data.results.map((movie: any) => (
				<Movie key={movie.id} variants={item}>
					<ImgHover
						src={makeImagePath(movie.poster_path)}
						variants={img}
						whileHover="whileHover"
					></ImgHover>
					<Text>{movie.title}</Text>
					<Info>
						<p style={{ color: "yellow", fontSize: "20px", marginTop: "20px" }}>
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
						{/* <div>{movie.adult.toString()}</div> */}
					</Info>
				</Movie>
			))}
		</MovieContainer>
	);
};

export default MoviePage;
