import { IProject } from 'interfaces/IProject'
import { atom } from 'recoil'

export const projectsState = atom({
  key: 'projectsState',
  default: null as IProject[] | null
})
