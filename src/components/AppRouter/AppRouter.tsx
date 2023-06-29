import { createBrowserRouter } from 'react-router-dom'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <h1>main</h1>,
  },
  {
    path: '/2',
    element: <h1>main 2</h1>,
  },
])

export default AppRouter
