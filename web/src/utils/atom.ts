import { Alerts } from 'interfaces/Alterts'
import { IProject } from 'interfaces/IProject'
import { atom } from 'recoil'

export const projectsState = atom({
  key: 'projectsState',
  default: null as IProject[] | null
})

export const projectToUpdateState = atom({
  key: 'projectToUpdateState',
  default: null as IProject | null
})

export const alertState = atom({
  key: 'alertState',
  default: { text: 'o', type: 'success', visible: false } as Alerts | null
})
