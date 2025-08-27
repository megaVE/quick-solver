import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home/index";
import { QuestionsPage } from "./pages/questions/index";
import { ResultsPage } from "./pages/results/index";

export function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/questions/:operation",
			element: <QuestionsPage />,
		},
		{
			path: "/results",
			element: <ResultsPage />,
		},
	]);

	return <RouterProvider router={router} />;
}
