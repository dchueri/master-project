import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login/LoginForm'
import ProtectedLayout from '../components/ProtectedLayout'
import TablePage from '../pages/TablePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
