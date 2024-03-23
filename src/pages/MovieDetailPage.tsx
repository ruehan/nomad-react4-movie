import { useRecoilState } from "recoil";
import { movieState, localeState } from "../state/movieState";
import { useQuery } from "react-query";
import {
	makeBgPath,
	getTMDBMovie,
	getTMDBVideos,
	getTMDBCredits,
	makeImagePath,
} from "../api/api";
import { motion } from "framer-motion";
import styled from "styled-components";
import { MdOutlineWebAsset as WebSite } from "react-icons/md";
import YouTube from "react-youtube";

const Container = styled(motion.div)`
	width: 80%;
	height: 80%;
	z-index: 20;
	background-color: ${(props) => props.theme.backgroundColor};
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 15px;
	padding: 20px;
	font-size: 17px;
	color: ${(props) => props.theme.hoverBackgroundColor};
	border: 1px solid ${(props) => props.theme.hoverBackgroundColor};

	div {
		margin: 10px;
	}
`;

const Genres = styled.div`
	border: 2px solid ${(props) => props.theme.hoverBackgroundColor};
	max-width: 100%;
	width: fit-content;
	border-radius: 15px;
	padding: 15px;
	background-color: ${(props) => props.theme.backgroundColor};
	opacity: 0.5;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const BackImg = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: auto;
	z-index: -1;
	opacity: 0.5;
`;

const Credits = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
	height: 300px;
	flex-wrap: wrap;
	overflow: scroll;
	justify-content: center;
	text-align: center;
	/* background-color: ${(props) => props.theme.backgroundColor}; */
	border: 2px solid ${(props) => props.theme.hoverBackgroundColor};
	border-radius: 15px;
	/* opacity: 0.9; */
`;

const MovieDetailPage: React.FC = () => {
	const [movieId] = useRecoilState(movieState);
	const [locale] = useRecoilState(localeState);

	const { isLoading, data } = useQuery(
		["id", movieId, locale],
		({ queryKey }) => getTMDBMovie(queryKey[1], queryKey[2]),
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log(data);
				console.log("Movie Detail Page Load");
			},
		}
	);

	const { isLoading: videoIsLoading, data: videoData } = useQuery(
		["video_id", movieId, locale],
		({ queryKey }) => getTMDBVideos(queryKey[1], queryKey[2]),
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log(data);
				console.log("Movie Video Data Load");
			},
		}
	);

	const { isLoading: creditIsLoading, data: creditData } = useQuery(
		["credit_id", movieId, locale],
		({ queryKey }) => getTMDBCredits(queryKey[1], queryKey[2]),
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log(data);
				console.log("Movie Credit Data Load");
			},
		}
	);

	if (isLoading || videoIsLoading || creditIsLoading) return null;

	return (
		<>
			<Container
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{
					type: "spring",
					duration: 1,
				}}
			>
				<BackImg src={makeBgPath(data.backdrop_path)} />
				<div
					style={{ fontSize: "30px" }}
				>{`${data.title} ( ${data.original_title} ) [${data.original_language}]`}</div>
				<div>{`" ${data.tagline} "`}</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						src="/imdb.png"
						style={{ width: "40px", height: "40px" }}
						onClick={() =>
							window.open(`https://www.imdb.com/title/${data.imdb_id}`)
						}
					/>
					<WebSite
						style={{ fontSize: "30px" }}
						onClick={() => window.open(data.homepage)}
					/>
				</div>
				<div>
					{data.production_countries.map((country: any) => (
						<img
							style={{ width: "40px", height: "40px" }}
							src={`https://flagsapi.com/${country.iso_3166_1}/shiny/64.png`}
						/>
					))}
				</div>
				<div>{data.release_date}</div>
				<div>{data.overview}</div>
				<Genres>
					{data.genres.map((genre: any) => (
						<div style={{ width: "100px" }}>{genre.name}</div>
					))}
				</Genres>
				<div>{`Rating : ${data.vote_average} (${data.vote_count})`}</div>

				<div>{"Runtime : " + data.runtime + " min"}</div>
				<Credits>
					{creditData.cast.map(
						(credit: any, index: any) =>
							index < 5 && (
								<div style={{ width: "100px", height: "200px" }}>
									<img
										style={{ width: "100px" }}
										src={makeImagePath(credit.profile_path)}
									></img>
									<p style={{ marginTop: "10px" }}>{credit.name}</p>
									<p style={{ marginTop: "10px" }}>{credit.character}</p>
								</div>
							)
					)}
				</Credits>
				{videoData.results.length > 0 && (
					<YouTube
						style={{
							position: "absolute",
							bottom: "10px",
							right: "10px",
							width: "40%",
							height: "40%",
						}}
						videoId={videoData.results[0].key}
						opts={{
							width: "100%",
							height: "100%",
							playerVars: {
								autoplay: 0,
								rel: 0,
								modestbranding: 1,
							},
						}}
						onEnd={(e) => {
							e.target.stopVideo(0);
						}}
					></YouTube>
				)}
			</Container>
		</>
	);
};

export default MovieDetailPage;
