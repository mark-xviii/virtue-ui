import AppRouter from '../AppRouter/AppRouter'
import { store } from '../../state-management/stores/store'
import { Provider } from 'react-redux'
import '../../styles/App.sass'

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
