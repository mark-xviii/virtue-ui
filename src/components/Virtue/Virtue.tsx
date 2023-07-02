import { UserType } from '../../types/user.type'
import '../../styles/Virtue.sass'

export interface VirtuePropsInterface {
  user: UserType
  text: string
}

const Virtue = ({ user, text }: VirtuePropsInterface) => {
  return (
    <div className="virtue-container">
      <h1 className="virtue-display-name">{user.displayName}</h1>
      <h2 className="virtue-public-tag">{user.publicTag}</h2>
      <p className="virtue-text" dangerouslySetInnerHTML={{ __html: text }}>
        pseudo text..!*$ ifoiah lorem pseudo text..!*$ ifoiah lorem pseudo
        text..!*$ ifoiah lorem pseudo text..!*$ ifoiah lorem.
      </p>
    </div>
  )
}

export default Virtue
