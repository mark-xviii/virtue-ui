import AppRouter from '../AppRouter/AppRouter'
import { store } from '../../state-management/stores/store'
import { Provider } from 'react-redux'
import '../../styles/App.sass'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <Provider store={store}>
      <div className="page-container">
        <AppRouter />
      </div>
    </Provider>
  )
}

export default App
