import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NotFoundErrorPage from './components/errors/NotFoundErrorPage';
import reportWebVitals from './reportWebVitals';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SearchContainer from './components/header/SearchContainer';
import MovieDetails from './components/header/MovieDetails';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundErrorPage />,
    children: [
      {
        path: "/",
        element: <SearchContainer />,
      },
      {
        path: "/:movieId",
        element: <MovieDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

