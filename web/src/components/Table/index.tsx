import { formatToBRL, formatToCEP } from 'brazilian-values'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { IProject } from '../../interfaces/IProject'
import { ProjectsService } from '../../services/ProjectsService'

const Table = () => {
  const [projects, setProjects] = useState<IProject[]>()
  const projectsService = new ProjectsService()

  useEffect(() => {
    projectsService
      .getAllProjects()
      .then((res) => setProjects(res.data))
      .catch((e) => console.log(e))
  })
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
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
                </tr>
              </thead>
              <tbody>
                {projects?.map((project, index) => {
                  const data = moment(project.deadline).format('DD/MM/YYYY')
                  return (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
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
                        Done / Delete
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
