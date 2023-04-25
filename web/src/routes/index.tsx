import { Route, Routes } from 'react-router-dom'
import ProtectedLayout from '../components/ProtectedLayout'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import TablePage from '../pages/TablePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <TablePage />
          </ProtectedLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes
