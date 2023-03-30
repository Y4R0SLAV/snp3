import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {store} from './redux/store'
import {Provider} from 'react-redux'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		// children: [
		//   {
		//     path: "items/:id",
		//     element: <Team />,
		//     loader: teamLoader,
		//   },
		// ],
	},
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
)
