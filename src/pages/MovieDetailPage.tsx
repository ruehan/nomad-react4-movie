import { useRecoilState } from "recoil";
import { movieState, localeState } from "../state/movieState";
import { useQuery } from "react-query";
import { makeBgPath, getTMDBMovie, getTMDBVideos } from "../api/api";
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
	padding: 15px;
	font-size: 17px;
	color: ${(props) => props.theme.fontColor};

	div {
		margin: 10px;
	}
`;

const Genres = styled.div`
	border: 2px solid ${(props) => props.theme.hoverBackgroundColor};
	width: 300px;
	border-radius: 15px;
	padding: 15px;
	background-color: ${(props) => props.theme.backgroundColor};
	opacity: 0.5;
`;

const BackImg = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: 0.5;
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
				// console.log(data);
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

	if (isLoading || videoIsLoading) return null;
	// genres / homepage / imdb_id / production_countries / revenue / runtime / spoken_langages / status

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
						<div>{genre.name}</div>
					))}
				</Genres>
				<div>{`Rating : ${data.vote_average} (${data.vote_count})`}</div>

				<div>{"Runtime : " + data.runtime + " min"}</div>
				{videoData.results.length > 0 && (
					<YouTube
						style={{ position: "absolute", bottom: "10px", right: "10px" }}
						videoId={videoData.results[0].key}
						opts={{
							width: "560",
							height: "315",
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
