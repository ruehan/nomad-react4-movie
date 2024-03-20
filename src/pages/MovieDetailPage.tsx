import { useRecoilState } from "recoil";
import {
	movieState,
	translateState,
	translateTextState,
} from "../state/movieState";
import { useQuery } from "react-query";
import { getMovie, makeBgPath } from "../api/api";
import { motion } from "framer-motion";
import styled from "styled-components";
import { MdOutlineWebAsset as WebSite } from "react-icons/md";
import axios from "axios";

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
	const [isTranslate] = useRecoilState(translateState);
	const [translatedText, setTranslatedText] =
		useRecoilState(translateTextState);

	const translateText = async (text: any) => {
		const AUTH_KEY = process.env.REACT_APP_DEEPL_AUTH_KEY;

		const url = `https://api-free.deepl.com/v2/translate?auth_key=${AUTH_KEY}&text=${text}&source_lang=EN&target_lang=KO`;

		axios.get(url).then((response) => {
			setTranslatedText(response.data.translations[0].text);
		});
	};

	const { isLoading, data } = useQuery(
		["id", movieId],
		({ queryKey }) => getMovie(queryKey[1]),
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log(data);
				console.log("Movie Detail Page Load");
				if (isTranslate) {
					translateText(data.overview);
				}
			},
		}
	);

	if (isLoading) return null;
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
				{isTranslate ? <div>{translatedText}</div> : <div>{data.overview}</div>}
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
