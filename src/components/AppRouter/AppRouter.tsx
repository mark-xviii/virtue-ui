import {
  BrowserRouter,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import Auth from '../Auth/Auth'
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'
import { useSelector } from 'react-redux'
import { RootState } from '../../state-management/stores/store'
import Index from '../../pages/Index'

// TODO: error element

const AppRouter = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const routesForAuthenticatedOnly: RouteObject[] = [
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
  ]

  const publicRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Index />,
    },
  ]

  const routesForUnauthorizedOnly: RouteObject[] = [
    {
      path: '/auth',
      element: <Auth />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
  ]

  const assembledRouter = createBrowserRouter([
    ...publicRoutes,
    ...(!accessToken ? routesForUnauthorizedOnly : []),
    ...(accessToken ? routesForAuthenticatedOnly : []),
  ])

  return <RouterProvider router={assembledRouter} />
}

export default AppRouter
