import { createBrowserRouter } from 'react-router-dom'
import Index from '../../pages'
import Auth from '../Auth/Auth'
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'
import { Counter } from '../Counter/Counter'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/users',
    element: <h1>Users catalogue</h1>,
  },
  {
    path: '/users/:publicToken',
    element: <h1>User page</h1>,
  },
  {
    path: '/virtues',
    element: <h1>see all my virtues</h1>,
  },
  {
    path: '/virtues/:virtueId/:action',
    element: <h1>actions on virtue</h1>,
  },
  {
    path: '/redux-test',
    element: <Counter />,
  },
])

export default AppRouter
