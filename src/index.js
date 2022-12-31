import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import FlowEditor from "./lib/components/FlowEditor";
import SavedNote from "./lib/components/SavedNote";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/flow",
		element: <FlowEditor />,
	},
	{
		path: "/note/:id",
		element: <SavedNote />,
	},
]);

ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
