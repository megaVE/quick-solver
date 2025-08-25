import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/home";
import { QuestionsPage } from "./pages/questions";
import { ResultsPage } from "./pages/results";

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
