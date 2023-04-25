import { Field, Form, Formik } from 'formik'
import { Alerts } from 'interfaces/Alterts'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { alertDispatch } from 'utils/alertDispatch'
import * as Yup from 'yup'
import Button from '../../../components/elements/Button'
import DatePicker from '../../../components/elements/Datepicker'
import { IProject } from '../../../interfaces/IProject'
import Line from '../../../public/line.svg'
import { ProjectsService } from '../../../services/ProjectsService'
import { UsersService } from '../../../services/UsersService'
import {
  alertState,
  projectToUpdateState,
  projectsState
} from '../../../utils/atom'

const schema = Yup.object().shape({
  title: Yup.string().required('O projeto precisa ter um Título')
})

const UpdateProjectForm = () => {
  const [projects, setProjects] = useRecoilState<IProject[] | null>(
    projectsState
  )

  const projectToUpdate = useRecoilValue(projectToUpdateState)
  const setAlert = useSetRecoilState(alertState)
  const [deadline, setDeadline] = useState({
    startDate: new Date(projectToUpdate!.deadline).toISOString().split('T')[0],
    endDate: new Date(projectToUpdate!.deadline).toISOString().split('T')[0]
  })
  const projectsService = new ProjectsService()
  const usersService = new UsersService()
  const user = usersService.getUserLocalStorage()

  const successAlert: Alerts = {
    text: 'Projeto atualizado com sucesso',
    type: 'success',
    visible: true
  }

  const handleSubmit = async (e) => {
    if (deadline.startDate) {
      e.deadline = new Date(deadline.startDate!).toISOString()
      await projectsService
        .updateProject(e, projectToUpdate!.id, user)
        .then((res) => {
          res.status === 200 ? alertDispatch(successAlert, setAlert) : null
        })
    }
  }

  return (
    <div className="p-5">
      <div className="flex items-center">
        <h2 className="text-[22px] text-left uppercase font-bold leading-7 mr-2">
          Editar projeto
        </h2>
        <img src={Line} className="h-[3px]" />
      </div>
      <Formik
        initialValues={{
          title: projectToUpdate!.title,
          deadline: ''
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
                <Button className="button text">Autalizar</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UpdateProjectForm
