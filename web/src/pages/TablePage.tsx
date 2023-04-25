import { useAuth } from 'context/AuthProvider/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormModal from '../components/FormModal'
import Table from '../components/Table'
import Button from '../components/elements/Button'
import Fred from '../public/fred.png'

const TablePage = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = (e: any) => {
    if (e.target.id === 'container') return setOpen(false)
  }
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <div className="relative block overflow-hidden bg-[white] h-[100vh] justify-center gap-2">
      <div className="h-[5vh] flex justify-end p-5">
        <p
          onClick={() => {
            auth.logout()
            navigate('/login')
          }}
        >
          Sair
        </p>
      </div>
      <div className="w-full flex items-end justify-center h-[20vh] pb-5">
        <Button className="button text" onClick={handleOpenModal}>
          Adicionar Projeto
        </Button>
      </div>
      <div className="w-full flex items-start justify-center h-[75vh]">
        <FormModal open={open} handleCloseModal={handleCloseModal} />
        <Table />
      </div>
      <img className="absolute top-[62%] left-[85%] h-[350px] z-0" src={Fred} />
    </div>
  )
}

export default TablePage
