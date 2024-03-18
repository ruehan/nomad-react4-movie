import { useQuery } from "react-query";
import { getComingSoon, getNowPlaying, getPopular } from "../api/api";
import { useRecoilState } from "recoil";
import { tabState } from "../state/tabState";

const MoviePage: React.FC = () => {
	const [tab, setTab] = useRecoilState(tabState);

	const { isLoading, isError, data, error } = useQuery(
		tab === "POPULAR"
			? "popular"
			: tab === "COMMING SOON"
			? "comming-soon"
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
				// console.log(data.results);
			},
			onError: (e) => {
				console.log("error");
			},
		}
	);

	if (isLoading) return null;

	return (
		<div>
			{data.results.map((movie: any) => (
				<p key={movie.id}>{movie.title}</p>
			))}
		</div>
	);
};

export default MoviePage;
