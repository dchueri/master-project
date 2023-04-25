export interface IProject {
  id: string
  title: string
  cost: number
  zip_code: number
  done: boolean
  deadline: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateProjectDto {
  title: string
  zip_code: number
  deadline: string
  cost: number
}

export interface UpdateProjectDto {
  title: string
  deadline: string
}
