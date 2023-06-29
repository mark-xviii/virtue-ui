import type { RootState } from '../../state-management/stores/store'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
} from '../../state-management/slices/counter.slice'
import { useLoginMutation } from '../../state-management/api/auth.api'
import { setAuthData } from '../../state-management/slices/auth.slice'

export function Counter() {
  // const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  const [login] = useLoginMutation()

  async function handleLogin() {
    try {
      const res = await login({
        publicTag: 'user1',
        password: '1234',
      }).unwrap()

      dispatch(setAuthData({ accessToken: res.accessToken }))

      alert('YAY!')
    } catch (error: any) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleLogin()
          }}
        >
          {'Potaxie <3'}
        </button>
      </div>
    </div>
  )
}
