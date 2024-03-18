import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.tsx";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RecoilRoot>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<App />
		</QueryClientProvider>
	</RecoilRoot>
);
