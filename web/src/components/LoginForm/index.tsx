import Button from 'components/elements/Button'
import { useAuth } from 'context/AuthProvider/useAuth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Alerts } from 'interfaces/Alterts'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { alertDispatch } from 'utils/alertDispatch'
import { alertState, projectsState } from 'utils/atom'
import * as Yup from 'yup'
import Logo from '../../public/logo.svg'

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Você deve fornecer um username'),
  password: Yup.string().required('Você deve fornecer uma senha')
})

const Login: React.FC = () => {
  const setProjects = useSetRecoilState(projectsState)
  const setAlert = useSetRecoilState(alertState)
  const auth = useAuth()
  const navigate = useNavigate()

  const failAlert: Alerts = {
    text: 'Username ou password incorretos',
    type: 'fail',
    visible: true
  }

  const successAlert: Alerts = {
    text: 'Seja bem vindo(a)!',
    type: 'success',
    visible: true
  }

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    const { username, password } = values
    try {
      await auth.authenticate(username, password)
      alertDispatch(successAlert, setAlert)
      setProjects(null)
      navigate('/')
    } catch (e) {
      alertDispatch(failAlert, setAlert)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-96 p-6 bg-primary-900 rounded-lg shadow-md flex flex-col">
            <img src={Logo} className="mb-3 w-[15vw] mx-auto" />
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-gray-300 font-medium mb-2"
              >
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className={`border border-gray-300 rounded-md p-2 w-full ${
                  errors.username && touched.username ? 'border-danger-500' : ''
                }`}
              />
              <ErrorMessage name="username" component="p" className="error" />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-300 font-medium mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`border border-gray-400 rounded-md p-2 w-full ${
                  errors.password && touched.password ? 'border-danger-500' : ''
                }`}
              />
              <ErrorMessage name="password" component="p" className="error" />
            </div>
            <Button type="submit" className="button text">
              Login
            </Button>
            <p className="text-[white] flex justify-end pt-4 text-sm">
              Ainda não possui uma conta?
              <span
                className="pl-1 cursor-pointer font-[500] hover:font-[700]"
                onClick={() => navigate('/signup')}
              >
                Clique aqui!
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
