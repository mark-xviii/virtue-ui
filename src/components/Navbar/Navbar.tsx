import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../state-management/stores/store'
import '../../styles/Navbar.sass'
import { logOut } from '../../state-management/slices/auth.slice'
import { useWhoAmIMutation } from '../../state-management/api/user.api'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const location = useLocation()

  const [authorizedPublicTag, setAuthorizedPublicTag] = useState<string | null>(
    null
  )

  const [guessWhoAmI] = useWhoAmIMutation()

  function handleLogOut() {
    dispatch(logOut())
    navigate('/')
  }

  async function handleWhoAmI() {
    guessWhoAmI(null)
  }

  useEffect(() => {
    if (accessToken) {
      guessWhoAmI(null)
        .unwrap()
        .then((res) => {
          setAuthorizedPublicTag(res.publicTag)
        })
        .catch((e) => {
          //TODO
        })
    }
  }, [location])

  return (
    <div className="navbar">
      {!accessToken
        ? [
            <Link to={'/auth/login'} className="navbar-link">
              Login
            </Link>,
            <Link to={'/auth/register'} className="navbar-link">
              Register
            </Link>,
          ]
        : [
            authorizedPublicTag ? (
              <Link
                to={`/users/${authorizedPublicTag}`}
                className="navbar-link"
              >
                Me: @{authorizedPublicTag}
              </Link>
            ) : (
              []
            ),
            <Link to={'/feed'} className="navbar-link">
              Explore Feed
            </Link>,
            <Link to={'/subscribe'} className="navbar-link">
              Subscribe
            </Link>,
            <p
              className="navbar-link"
              onClick={() => {
                handleLogOut()
              }}
            >
              Log out
            </p>,
          ]}
    </div>
  )
}

export default Navbar
