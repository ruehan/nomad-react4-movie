import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MoviePage from "../pages/MoviePage";
import NavBar from "../components/nav/NavBar";

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
		],
	},
]);

export default router;
