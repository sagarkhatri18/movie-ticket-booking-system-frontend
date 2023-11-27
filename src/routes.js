import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Movie = React.lazy(() => import('./views/movie/Movie'))
const MovieCreate = React.lazy(() => import('./views/movie/Create'))
const Booking = React.lazy(() => import('./views/booking/Booking'))
const Theater = React.lazy(() => import('./views/theater/Theater'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/movie', name: 'Movie', element: Movie },
  { path: '/movie/create', name: 'Create', element: MovieCreate },
  { path: '/booking', name: 'Booking', element: Booking },
  { path: '/theater', name: 'Theater', element: Theater },
]

export default routes
