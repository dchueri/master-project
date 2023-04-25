import axios from 'axios'
import { IUser } from 'context/AuthProvider/types'

const api = (localUser?: IUser) =>
  localUser
    ? axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: 'Bearer ' + localUser.token,
          user: localUser.username
        }
      })
    : axios.create({
        baseURL: import.meta.env.VITE_API_URL
      })

export default api
