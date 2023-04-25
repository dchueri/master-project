import Button from 'components/elements/Button'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Alerts } from 'interfaces/Alterts'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { UsersService } from 'services/UsersService'
import { alertDispatch } from 'utils/alertDispatch'
import { alertState } from 'utils/atom'
import * as Yup from 'yup'
import Logo from '../../public/logo.svg'

export const SignupForm = () => {
  const setAlert = useSetRecoilState(alertState)
  const navigate = useNavigate()
  const usersService = new UsersService()

  const initialValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Você precisa fornecer um nome'),
    username: Yup.string().required('Você precisa fornecer um nome de usuário'),
    password: Yup.string().required('Você precisa fornecer uma senha'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Senhas não correspondem')
      .required('Confirme a sua senha')
  })

  const failAlert: Alerts = {
    text: 'O nome de usuário já está em uso',
    type: 'fail',
    visible: true
  }

  const successAlert: Alerts = {
    text: 'Conta criada com sucesso!',
    type: 'success',
    visible: true
  }

  const onSubmit = async (values) => {
    await usersService
      .createUser(values.name, values.username, values.password)
      .then((res) => {
        const response = res.request.status
        if (response === 400) {
          alertDispatch(failAlert, setAlert)
        }
        if (response === 201) {
          alertDispatch(successAlert, setAlert)
          navigate('/login')
        }
      })
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="w-96 p-6 bg-primary-900 rounded-lg shadow-md flex flex-col">
            <img src={Logo} className="mb-3 w-[15vw] mx-auto" />
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-gray-300 font-medium mb-2"
              >
                Nome
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
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
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-gray-300 font-medium mb-2"
              >
                Senha
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
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-300 font-medium mb-2"
              >
                Confirme a senha
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`border border-gray-400 rounded-md p-2 w-full ${
                  errors.confirmPassword && touched.confirmPassword
                    ? 'border-danger-500'
                    : ''
                }`}
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="error"
              />
            </div>
            <Button type="submit" className="button text">
              Criar conta
            </Button>
            <p className="text-[white] flex justify-end pt-4 text-sm">
              Já possui uma conta?
              <span
                className="pl-1 cursor-pointer font-[500] hover:font-[700]"
                onClick={() => navigate('/login')}
              >
                Faça o login aqui!
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}
