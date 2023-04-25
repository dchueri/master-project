import { IUser } from '../context/AuthProvider/types'
import { CreateProjectDto, UpdateProjectDto } from '../interfaces/IProject'
import api from '../utils/api'

export class ProjectsService {
  async getAllProjects(localUser: IUser) {
    return await api(localUser).get('/projects')
  }

  async setProjectAsDone(projectId: string, localUser: IUser) {
    return await api(localUser).patch(`projects/${projectId}/done`)
  }

  async updateProject(
    updateProject: UpdateProjectDto,
    projectId: string,
    localUser: IUser
  ) {
    return await api(localUser).put(`projects/${projectId}`, updateProject)
  }

  async addProject(project: CreateProjectDto, localUser: IUser) {
    return await api(localUser).post(`projects`, project)
  }

  async deleteProject(projectId: string, localUser: IUser) {
    return await api(localUser).delete(`projects/${projectId}`)
  }
}
