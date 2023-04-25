import Button from 'components/elements/Button'
import { useAuth } from 'context/AuthProvider/useAuth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../public/logo.svg'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await login(username, password)
  }

  const login = async (username: string, password: string) => {
    try {
      await auth.authenticate(username, password)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-primary-900 rounded-lg shadow-md flex flex-col"
      >
        <img src={Logo} className="mb-3 w-[15vw] mx-auto" />
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-gray-300 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-300 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>
        <Button className="button text">Login</Button>
      </form>
    </div>
  )
}

export default Login
