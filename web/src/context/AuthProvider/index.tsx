import { createContext, useEffect, useState } from 'react'
import { UsersService } from 'services/UsersService'
import { IAuthProvider, IContext, IUser } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>()
  const userService = new UsersService()

  useEffect(() => {
    if (!user) {
      const loggedUser = userService.getUserLocalStorage()
      if (loggedUser) {
        setUser(loggedUser)
      }
    }
  }, [user])

  async function authenticate(username: string, password: string) {
    const res = await userService.login(username, password)

    const payload = { token: res.token, username }

    setUser(payload)
    userService.setUserLocalStorage(payload)
  }

  function logout() {
    setUser(null)
    userService.setUserLocalStorage(null)
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
