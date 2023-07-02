import { useParams } from 'react-router'
import { UserType } from '../types/user.type'
import { useState } from 'react'

const UserPage = () => {
  const { publicTag } = useParams() as { publicTag: string }

  const [currentUser, setCurrentUser] = useState({} as UserType)

  useEffect(() => {}, [currentUser])

  return <></>
}

export default UserPage
