import { formatToBRL } from 'brazilian-values'
import { Field, Form, Formik } from 'formik'
import { Alerts } from 'interfaces/Alterts'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { alertDispatch } from 'utils/alertDispatch'
import * as Yup from 'yup'
import Button from '../../components/elements/Button'
import DatePicker from '../../components/elements/Datepicker'
import { IProject } from '../../interfaces/IProject'
import Line from '../../public/line.svg'
import { ProjectsService } from '../../services/ProjectsService'
import { UsersService } from '../../services/UsersService'
import { alertState, projectsState } from '../../utils/atom'

const schema = Yup.object().shape({
  title: Yup.string().required('O projeto precisa ter um Título'),
  zip_code: Yup.number()
    .required('O projeto precisa ter um CEP')
    .test(
      'len',
      'O CEP deve possuir 8 dígitos',
      (val) => val.toString().length === 8
    )
})

const ProjectForm = () => {
  const [projects, setProjects] = useRecoilState<IProject[] | null>(
    projectsState
  )
  const setAlert = useSetRecoilState(alertState)

  const [cep, setCep] = useState<string>()
  const [cost, setCost] = useState<number>(0)
  const [deadline, setDeadline] = useState({ startDate: null, endDate: null })
  const projectsService = new ProjectsService()
  const usersService = new UsersService()
  const user = usersService.getUserLocalStorage()

  const successAlert: Alerts = {
    text: 'Projeto adicionado com sucesso',
    type: 'success',
    visible: true
  }

  const addProject = (project: IProject) => {
    projects ? setProjects([...projects, project]) : setProjects([project])
  }

  const handleSubmit = (e) => {
    e.cost = cost
    e.deadline = new Date(deadline.startDate!).toISOString()
    e.zip_code = parseInt(e.zip_code)
    projectsService
      .addProject(e, user)
      .then((res) => {
        addProject(res.data)
        alertDispatch(successAlert, setAlert)
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="p-5">
      <div className="flex items-center">
        <h2 className="text-[22px] text-left uppercase font-bold leading-7 mr-2">
          Adicione um novo projeto
        </h2>
        <img src={Line} className="h-[3px]" />
      </div>
      <Formik
        initialValues={{
          title: '',
          zip_code: '',
          cost: cost,
          deadline: deadline
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6">
                  Título
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    className="block p-3 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.title && touched.title && (
                    <div className="error">{errors.title}</div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6">
                  CEP
                </label>
                <Field name="zip_code">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div className="mt-2">
                      <input
                        id="zip_code"
                        type="number"
                        value={cep}
                        onChange={(e) => {
                          console.log(e.target)
                          return setCep(e.target.value)
                        }}
                        className="block p-3 appearance-none h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6">
                  Valor
                </label>

                <div className="mt-2">
                  <Field
                    validate={() => {
                      let error
                      if (cost == 0) {
                        error = 'O projeto precisa ter um valor'
                      }
                      return error
                    }}
                    onChange={(e: any) => {
                      const input = e.nativeEvent
                      if (input.data) {
                        return setCost(parseInt(cost.toString() + input.data))
                      }
                      if (input.inputType == 'deleteContentBackward') {
                        const valueString = cost.toString()
                        const newValue = valueString.substring(
                          0,
                          valueString.length - 1
                        )
                        newValue ? setCost(parseInt(newValue)) : setCost(0)
                      }
                    }}
                    value={formatToBRL((cost / 100).toString())}
                    type="string"
                    name="cost"
                    id="cost"
                    className="block p-3 appearance-none h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.cost && touched.cost && (
                    <div className="error">{errors.cost}</div>
                  )}
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6">
                  Prazo final
                </label>
                <div className="mt-2 w-48">
                  <DatePicker value={deadline} setValue={setDeadline} />
                </div>
                {deadline.startDate == null && touched.deadline ? (
                  <div className="error">O projeto deve ter um prazo final</div>
                ) : null}
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <Button className="button text">Adicionar</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProjectForm
