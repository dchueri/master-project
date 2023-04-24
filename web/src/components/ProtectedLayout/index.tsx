import { useNavigate } from 'react-router-dom'
import Button from '../../components/elements/Button'
import { useAuth } from '../../context/AuthProvider/useAuth'

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.username) {
    return (
      <div className="my-auto h-[100vh] flex flex-col justify-between">
        <div className="pt-[20vh] text-center">
          <h1 className="title h-auto">401</h1>
          <h1 className="title h-auto">Não autorizado</h1>
          <Button onClick={() => navigate('/login')} className="button text">
            Login
          </Button>
        </div>
        <div className="flex justify-center">
          <img className="max-w-[20vw]" src="/erro.png" />
        </div>
      </div>
    )
  }
  return children
}

export default ProtectedLayout
