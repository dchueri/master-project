import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '../context/AuthProvider'
import AppRoutes from '../routes'
import { Alert } from './elements/Alert'

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Alert />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default App
