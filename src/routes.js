import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Movie = React.lazy(() => import("./views/movie/Movie"));
const MovieCreate = React.lazy(() => import("./views/movie/Create"));
const MovieUpdate = React.lazy(() => import("./views/movie/Update"));
const Booking = React.lazy(() => import("./views/booking/Booking"));
const Theatre = React.lazy(() => import("./views/theatre/Theatre"));
const TheatreCreate = React.lazy(() => import("./views/theatre/Create"));
const TheatreUpdate = React.lazy(() => import("./views/theatre/Update"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/movie", name: "Movie", element: Movie },
  { path: "/movie/create", name: "Create", element: MovieCreate },
  { path: "/movie/update/:id", name: "Update", element: MovieUpdate },
  { path: "/booking", name: "Movie Booking", element: Booking },
  { path: "/theatre", name: "Theatre", element: Theatre },
  { path: "/theatre/create", name: "Theatre Create", element: TheatreCreate },
  {
    path: "/theatre/update/:id",
    name: "Theatre Update",
    element: TheatreUpdate,
  },
];

export default routes;
