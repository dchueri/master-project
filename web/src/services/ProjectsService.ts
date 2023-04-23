import api from '../utils/api'

export class ProjectsService {
  async getAllProjects() {
    return await api.get('/projects')
  }

  async setProjectAsDone(projectId: string) {
    return await api.patch(`projects/${projectId}/done`)
  }

  async deleteProject(projectId: string) {
    return await api.delete(`projects/${projectId}`)
  }
}
