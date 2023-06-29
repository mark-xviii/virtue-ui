import { Field, Form, Formik, useFormik, validateYupSchema } from 'formik'
import * as Yup from 'yup'

interface LoginFormInterface {
  publicTag: string
  password: string
}

const Login = () => {
  const loginValidationSchema = Yup.object({
    publicTag: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .required('Required!'),

    password: Yup.string()
      .min(3, '3 characters min!')
      .max(64, '64 characters max!')
      .required('Required!'),
  })

  const initialValues: LoginFormInterface = { publicTag: '', password: '' }

  return (
    <div className="auth-form">
      <h1 className="generic-h1">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="publicTag" />
            {errors.publicTag && touched.publicTag ? (
              <div>{errors.publicTag}</div>
            ) : null}
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
