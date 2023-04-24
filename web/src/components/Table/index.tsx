import { formatToBRL, formatToCEP } from 'brazilian-values'
import Button from 'components/elements/Button'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { MdClose, MdDone } from 'react-icons/md'
import { IProject } from '../../interfaces/IProject'
import { ProjectsService } from '../../services/ProjectsService'
import { UsersService } from '../../services/UsersService'

const Table = () => {
  const [projects, setProjects] = useState<IProject[]>()
  const projectsService = new ProjectsService()
  const usersService = new UsersService()
  const user = usersService.getUserLocalStorage()

  const handleSetProjectAsDone = async (projectId: string) => {
    await projectsService.setProjectAsDone(projectId, user)
    await getProjects()
  }

  const handleDeleteProject = async (projectId: string) => {
    await projectsService.deleteProject(projectId, user)
    deleteProject(projectId)
  }

  const sortProjects = (projects: IProject[]) => {
    return projects.sort((a, b) => {
      if (a.done && !b.done) {
        return 1
      }
      if (!a.done && b.done) {
        return -1
      }
      return 0
    })
  }

  const getProjects = async () => {
    try {
      const response = await projectsService.getAllProjects(user)
      setProjects(sortProjects(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProject = (projectId: string) => {
    const newProjects = projects?.filter((project) => project.id !== projectId)
    if (newProjects) {
      setProjects(newProjects)
    }
  }

  useEffect(() => {
    if (!projects) {
      getProjects()
    }
  })
  return (
    <div className="flex flex-col justify-center relative z-10">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex justify-center py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-left text-sm font-light bg-gray-50">
              <thead className="border-b font-medium bg-gray-100 border-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-4">
                    CEP
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Prazo
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((project, index) => {
                  const data = moment(project.deadline).format('DD/MM/YYYY')
                  return (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-gray-200 border-gray-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-[600]">
                        {project.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatToCEP(project.zip_code.toString())}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatToBRL(project.cost / 100)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{data}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {project.done == true ? 'Concluído' : 'Aberto'}
                      </td>
                      <td className="flex justify-center gap-2 whitespace-nowrap px-6 py-4 w-[min-content]">
                        {project.done ? (
                          <Button className={'button disabled'}>
                            <MdDone />
                          </Button>
                        ) : (
                          <div
                            onClick={() => handleSetProjectAsDone(project.id)}
                          >
                            <Button className={'button'}>
                              <MdDone />
                            </Button>
                          </div>
                        )}
                        <div onClick={() => handleDeleteProject(project.id)}>
                          <Button className="button red">
                            <MdClose />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
