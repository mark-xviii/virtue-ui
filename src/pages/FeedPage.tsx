import { useEffect, useState } from 'react'
import { useGetFeedMutation } from '../state-management/api/virtue.api'
import { VirtueType } from '../types/virtue.type'
import Virtue from '../components/Virtue/Virtue'

const FeedPage = () => {
  const [getFeed] = useGetFeedMutation()

  const [virtues, setVirtues] = useState<VirtueType[] | null>(null)

  useEffect(() => {
    getFeed(null)
      .unwrap()
      .then((res) => {
        setVirtues(res)
      })
      .catch((e) => {
        // TODO
      })
  }, [])

  return (
    <div className="page-container">
      {virtues &&
        virtues.map((v) => (
          <Virtue user={v.user} text={v.text} virtueId={v.id} key={v.id} />
        ))}
    </div>
  )
}

export default FeedPage
