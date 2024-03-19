import { useRecoilState } from "recoil";
import { movieState } from "../state/movieState";
import { useQuery } from "react-query";
import { getMovie, makeBgPath } from "../api/api";
import { motion } from "framer-motion";
import styled from "styled-components";
import { MdOutlineWebAsset as WebSite } from "react-icons/md";
// import translateText from "../api/deepl";

const Container = styled(motion.div)`
	width: 80%;
	height: 80%;
	z-index: 20;
	background-color: black;
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 15px;
	padding: 15px;

	div {
		margin: 10px;
	}
`;

const BackImg = styled.img`
	/* width: auto;
	height: 100%; */
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* object-fit: cover; */
	z-index: -1;
	opacity: 0.4;
`;

const MovieDetailPage: React.FC = () => {
	const [movieId] = useRecoilState(movieState);

	const { isLoading, data } = useQuery(
		["id", movieId],
		({ queryKey }) => getMovie(queryKey[1]),
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log(data);
				console.log("Movie Detail Page Load");
			},
		}
	);

	if (isLoading) return null;

	// translateText(data.overview);

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
				<div>{`${data.title} ( ${data.original_title} ) [${data.original_language}]`}</div>
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
				<div>
					{data.genres.map((genre: any) => (
						<div>{genre.name}</div>
					))}
				</div>
				<div>{`${data.vote_average} (${data.vote_count})`}</div>

				<div>{data.runtime + "min"}</div>
			</Container>
		</>
	);
};

export default MovieDetailPage;
