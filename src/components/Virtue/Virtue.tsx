import { UserType } from '../../types/user.type'
import '../../styles/Virtue.sass'
import { useNavigate } from 'react-router'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import { useRef, useState } from 'react'
import {
  useDeleteVirtueMutation,
  useUpdateVirtueMutation,
} from '../../state-management/api/virtue.api'

export interface VirtuePropsInterface {
  user: UserType
  virtueId: string
  text: string
  isMine?: boolean
}

const Virtue = ({ user, text, virtueId, isMine }: VirtuePropsInterface) => {
  const navigate = useNavigate()

  const [isInEditMode, setIsInEditMode] = useState<boolean>(false)

  const textRef = useRef<HTMLInputElement | null>(null)

  const [updateVirtue] = useUpdateVirtueMutation()
  const [deleteVirtue] = useDeleteVirtueMutation()

  function handleUpdate() {
    if (textRef?.current?.value) {
      updateVirtue({ text: textRef.current.value, virtueId })
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
    <div className="virtue-container">
      <h1 className="virtue-display-name">{user.displayName}</h1>
      <h2
        className="virtue-public-tag"
        onClick={() => {
          navigate(`/users/${user.publicTag}`)
        }}
      >
        @{user.publicTag}
      </h2>
      {isInEditMode
        ? [
            <div className="virtue-mini-form">
              <input defaultValue={text} ref={textRef} />
              <button onClick={handleUpdate}>Save Changes</button>
              <button
                onClick={() => {
                  setIsInEditMode(false)
                }}
              >
                Cancel
              </button>
            </div>,
          ]
        : [
            <p
              className="virtue-text"
              dangerouslySetInnerHTML={{ __html: text }}
            />,
            isMine
              ? [
                  <EditRounded
                    className="auth-form-icon"
                    onClick={() => {
                      setIsInEditMode(true)
                    }}
                  />,
                  <DeleteRounded
                    className="auth-form-icon"
                    onClick={() => {
                      const toDelete = confirm('Delete the virtue?')
                      if (toDelete) {
                        deleteVirtue(virtueId)
                          .unwrap()
                          .then((res) => {
                            navigate(0)
                          })
                          .catch((e) => {
                            //TODO
                          })
                      }
                    }}
                  />,
                ]
              : [],
          ]}
    </div>
  )
}

export default Virtue
