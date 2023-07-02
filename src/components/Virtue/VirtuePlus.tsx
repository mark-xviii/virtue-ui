import { AddRounded } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { useCreateVirtueMutation } from '../../state-management/api/virtue.api'
import { useNavigate } from 'react-router'

const VirtuePlus = () => {
  const [active, setActive] = useState<boolean>(false)

  const textRef = useRef<HTMLInputElement | null>(null)

  const [createVirtue] = useCreateVirtueMutation()

  const navigate = useNavigate()

  function handleCreation() {
    if (textRef?.current?.value) {
      createVirtue(textRef.current.value)
        .unwrap()
        .then((res) => {
          // it's too late for state management! front-end takes too much time!
          navigate(0)
        })
        .catch((e) => {
          //TODO
        })
    }
  }

  return (
    <div>
      {active ? (
        <div className="virtue-mini-form">
          <input ref={textRef} />
          <button onClick={handleCreation}>Post Virtue</button>
          <button
            onClick={() => {
              setActive(false)
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <AddRounded
          className="auth-icon"
          onClick={() => {
            setActive(true)
          }}
        />
      )}
    </div>
  )
}

export default VirtuePlus
