import { createBrowserRouter } from "react-router-dom";
import MoviePage from "../pages/MoviePage";
import NavBar from "../components/nav/NavBar";
import MovieDetailPage from "../pages/MovieDetailPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <NavBar />,
		children: [
			{
				path: "",
				element: <MoviePage />,
			},
			{
				path: "/coming-soon",
				element: <MoviePage />,
			},
			{
				path: "/now-playing",
				element: <MoviePage />,
			},
			{
				path: "movie/:id",
				element: <MovieDetailPage />,
			},
		],
	},
]);

export default router;
