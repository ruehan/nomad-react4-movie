import { useRecoilState } from "recoil";
import { modalState, movieState } from "../state/movieState";
import { useQuery } from "react-query";
import { getMovie } from "../api/api";

const MovieDetailPage: React.FC = () => {
	const [movieId, setMovieId] = useRecoilState(movieState);
	// const [modal, setModal] = useRecoilState(modalState);

	const { isLoading, isError, data, error } = useQuery(
		["id", movieId],
		({ queryKey }) => getMovie(queryKey[1]),
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log(data);
				console.log("Movie Detail Page Load");
			},
			onError: (e) => {
				console.log(e.message);
			},
		}
	);

	if (isLoading) return null;

	return (
		<>
			<div
				style={{
					width: "80%",
					height: "80%",
					zIndex: "20",
					backgroundColor: "#1a1a1a",
					position: "fixed",
					top: "50%",
					left: "50%",
					translate: "-50% -50%",
				}}
			>
				<p>{data.title}</p>
				<p>{data.original_title}</p>
			</div>
		</>
	);
};

export default MovieDetailPage;
