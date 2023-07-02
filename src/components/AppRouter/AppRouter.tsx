import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import Auth from '../../pages/AuthPage'
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'
import { useSelector } from 'react-redux'
import { RootState } from '../../state-management/stores/store'
import Index from '../../pages/IndexPage'
import UserPage from '../../pages/UserPage'
import SubscriptionPage from '../../pages/SubscriptionPage'
import FeedPage from '../../pages/FeedPage'

// TODO: error element

const AppRouter = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/users/:publicTag',
      element: <UserPage />,
    },
    {
      path: '/feed',
      element: <FeedPage />,
    },
    {
      path: '/subscribe',
      element: <SubscriptionPage />,
    },
  ]

  const publicRoutes: RouteObject[] = [{}]

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
    {
      path: '/',
      element: <Index />,
      children: [
        ...(accessToken
          ? routesForAuthenticatedOnly
          : routesForUnauthorizedOnly),
        ...publicRoutes,
      ],
    },
  ])

  return <RouterProvider router={assembledRouter} />
}

export default AppRouter
