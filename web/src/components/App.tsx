import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '../context/AuthProvider'
import AppRoutes from '../routes'

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default App
