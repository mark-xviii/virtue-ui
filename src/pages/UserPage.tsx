import { useParams } from 'react-router'
import { UserType } from '../types/user.type'
import { useEffect, useState } from 'react'
import { useFindByPublicTagMutation } from '../state-management/api/user.api'
import { VirtueType } from '../types/virtue.type'
import { useFindVirtuesByPublicTagMutation } from '../state-management/api/virtue.api'
import { useSelector } from 'react-redux'
import { RootState } from '../state-management/stores/store'
import Virtue from '../components/Virtue/Virtue'
import '../styles/UserVirtues.sass'
import VirtuePlus from '../components/Virtue/VirtuePlus'

const UserPage = () => {
  const { publicTag } = useParams() as { publicTag: string }

  const authenticatedUserId = useSelector((state: RootState) => state.auth.id)

  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  const [currentVirtues, setCurrentVirtues] = useState<VirtueType[] | null>(
    null
  )

  const [findUserByPublicTag] = useFindByPublicTagMutation()

  const [findVirtuesByPublicTagMutation] = useFindVirtuesByPublicTagMutation()

  const [isOwnAccount, setIsOwnAccount] = useState<boolean | null>(null)

  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  useEffect(() => {
    if (!currentUser) {
      findUserByPublicTag(publicTag)
        .unwrap()
        .then((res) => {
          console.log(res.id, authenticatedUserId)

          if (res.id === authenticatedUserId) {
            setIsOwnAccount(true)
          } else {
            setIsOwnAccount(false)
          }

          setCurrentUser(res)
        })
        .catch((e) => {
          // TODO
        })
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser && !currentVirtues) {
      findVirtuesByPublicTagMutation(publicTag)
        .unwrap()
        .then((res) => {
          setCurrentVirtues(res)
        })
        .catch((e) => {
          setIsSubscribed(false)
        })
    }
  }, [currentUser, currentVirtues])

  return (
    <div className="page-container">
      {currentUser && (
        <div className="user-info">
          <h1 className="user-info-h1">
            {currentUser.displayName} @{currentUser.publicTag}
          </h1>
          <h2 className="user-info-h2">says...</h2>
        </div>
      )}
      <div className="user-virtues">
        {currentVirtues && currentUser ? (
          currentVirtues.map((v: VirtueType) => (
            <Virtue
              user={currentUser}
              text={v.text}
              virtueId={v.id}
              isMine={currentUser.id === authenticatedUserId}
            />
          ))
        ) : (
          <></>
        )}
        <VirtuePlus />
      </div>
    </div>
  )
}

export default UserPage
