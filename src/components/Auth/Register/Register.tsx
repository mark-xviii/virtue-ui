import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import '../../../styles/Auth.sass'
import { useDispatch } from 'react-redux'
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../../state-management/api/auth.api'
import { setAuthData } from '../../../state-management/slices/auth.slice'
import { LoginRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { LoginResponseInterface } from '../../../interfaces/api/auth.interface'

interface RegisterFormInterface {
  publicTag: string
  displayName: string
  password: string
}

const Login = () => {
  const loginValidationSchema = Yup.object({
    publicTag: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .required('Required!'),

    displayName: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .required('Required!'),

    password: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .required('Required!'),
  })

  const initialValues: RegisterFormInterface = {
    publicTag: '',
    displayName: '',
    password: '',
  }

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [register] = useRegisterMutation()

  async function handleLogin({
    publicTag,
    password,
    displayName,
  }: RegisterFormInterface) {
    try {
      // TODO: add loading blocking screen

      const res = await register({
        publicTag,
        password,
        displayName,
      }).unwrap()

      dispatch(
        setAuthData({
          accessToken: res.accessToken,
          id: res.id,
        } as LoginResponseInterface)
      )

      navigate('/')
    } catch (error: any) {
      // TODO
    }
  }

  return (
    <div className="page-container">
      <div className="auth-form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            handleLogin(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="auth-form">
              <div className="auth-form-headline">
                <h1 className="generic-h1">Register</h1>
                <LoginRounded
                  className="auth-form-icon"
                  onClick={() => {
                    navigate('/')
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
                <div className="auth-form-message">{errors.displayName}</div>
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
                Submit
              </button>
              <Link to={'/auth/login'} className="auth-form-link">
                Already have an account?
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
