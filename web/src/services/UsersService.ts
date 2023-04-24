import { IUser } from 'context/AuthProvider/types'
import api from '../utils/api'

export class UsersService {
  async login(username: string, password: string) {
    try {
      const req = await api().post('/auth/login', { username, password })
      return req.data
    } catch {
      return null
    }
  }

  setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('u', JSON.stringify(user))
  }

  getUserLocalStorage() {
    const json = localStorage.getItem('u')
    if (!json) {
      return null
    }
    const user = JSON.parse(json)
    return user ?? null
  }
}
