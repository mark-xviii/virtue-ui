import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useSubscribeMutation } from '../state-management/api/user.api'

const SubscriptionPage = () => {
  const textRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()

  const [subscribe] = useSubscribeMutation()

  function handleSubscribe() {
    if (textRef?.current?.value) {
      subscribe(textRef?.current?.value)
        .unwrap()
        .then((res) => {
          navigate('/feed')
        })
        .catch((e) => {
          // TODO
        })
    }
  }

  return (
    <div className="page-container">
      <h1 className="generic-h1">Public Tag of Someone to Subscribe:</h1>
      <input ref={textRef} />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}

export default SubscriptionPage
