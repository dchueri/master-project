import api from '../utils/api'

export class ProjectsService {
  async getAllProjects() {
    return await api.get('/projects')
  }
}
