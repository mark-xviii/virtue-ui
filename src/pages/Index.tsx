import { Link } from 'react-router-dom'
import { RootState } from '../state-management/stores/store'
import { useSelector } from 'react-redux'

const Index = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  return (
    <div className="page-container">
      <Link to="/auth/login">Auth</Link>
      {accessToken && <p>Logout!</p>}
      {!accessToken && [
        <Link to="/auth/login">Login</Link>,
        <Link to="/auth/register">Register</Link>,
      ]}
    </div>
  )
}

export default Index
