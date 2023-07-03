import { useNavigate, useParams } from 'react-router'
import { UserType } from '../types/user.type'
import { useEffect, useState } from 'react'
import { useFindByPublicTagMutation } from '../state-management/api/user.api'
import { VirtueType } from '../types/virtue.type'
import { useFindVirtuesByPublicTagMutation } from '../state-management/api/virtue.api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state-management/stores/store'
import Virtue from '../components/Virtue/Virtue'
import '../styles/UserVirtues.sass'
import VirtuePlus from '../components/Virtue/VirtuePlus'
import { LoginRounded } from '@mui/icons-material'
import { Formik, Field } from 'formik'
import { Form } from 'formik'
import { useUpdateMutation } from '../state-management/api/auth.api'
import { logOut } from '../state-management/slices/auth.slice'
import * as Yup from 'yup'

import { RegisterFormInterface } from '../components/Auth/Register/Register'

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

  const [amIEditingMyself, setAmIEditingMyself] = useState<boolean | null>(null)

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

  const [updateUser] = useUpdateMutation()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleUpdate({
    publicTag,
    password,
    displayName,
  }: RegisterFormInterface) {
    updateUser({
      ...(publicTag && { publicTag }),
      ...(password && { password }),
      ...(displayName && { displayName }),
    })
      .unwrap()
      .then((res) => {
        console.log(res)

        dispatch(logOut())

        navigate('/')
      })
      .catch((e) => {
        // TODO
        console.log(e)

        navigate(0)
      })
  }

  const updateUserValidationSchema = Yup.object({
    publicTag: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .optional(),
    displayName: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .optional(),
    password: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .optional(),
  })

  const initialValues: RegisterFormInterface = {
    publicTag: '',
    displayName: '',
    password: '',
  }

  return (
    <div className="page-container">
      {currentUser?.id === authenticatedUserId && !amIEditingMyself && (
        <button
          onClick={() => {
            setAmIEditingMyself(true)
          }}
        >
          Just let me edit myself...
        </button>
      )}
      {amIEditingMyself && (
        <div>
          <div className="auth-form-container">
            <Formik
              initialValues={initialValues}
              validationSchema={updateUserValidationSchema}
              onSubmit={(values) => {
                console.log('updating')
                handleUpdate(values)
              }}
            >
              {({ errors, touched }) => (
                <Form className="auth-form">
                  <div className="auth-form-headline">
                    <h1 className="generic-h1">{'Updating >)'}</h1>
                    <LoginRounded
                      className="auth-form-icon"
                      onClick={() => {
                        setAmIEditingMyself(false)
                      }}
                    />
                  </div>
                  <label className="auth-form-label">Public Tag:</label>
                  <Field name="publicTag" className="auth-form-input" />
                  {errors.publicTag && touched.publicTag ? (
                    <div className="auth-form-message">{errors.publicTag}</div>
                  ) : null}
                  <label className="auth-form-label">Display name:</label>
                  <Field name="displayName" className="auth-form-input" />
                  {errors.displayName && touched.displayName ? (
                    <div className="auth-form-message">
                      {errors.displayName}
                    </div>
                  ) : null}
                  <label className="auth-form-label">Password:</label>
                  <Field
                    name="password"
                    className="auth-form-input"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div className="auth-form-message">{errors.password}</div>
                  ) : null}
                  <button type="submit" className="auth-form-button">
                    Update me!
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
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
        {currentUser?.id === authenticatedUserId && <VirtuePlus />}
      </div>
    </div>
  )
}

export default UserPage
