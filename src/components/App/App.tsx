import { RouterProvider } from 'react-router'
import AppRouter from '../AppRouter/AppRouter'
import { store } from '../../state-management/stores/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  )
}

export default App
