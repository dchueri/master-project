import { useAuth } from 'context/AuthProvider/useAuth'
import { useState } from 'react'
import { MdLogout } from 'react-icons/md'
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
      <div className="h-[10vh] flex items-center justify-end pr-10">
        <Button
          onClick={() => {
            auth.logout()
            navigate('/login')
          }}
          className="button text flex gap-2 items-center"
        >
          Sair
          <MdLogout className=" text-lg" />
        </Button>
      </div>
      <div className="w-full flex items-end justify-center h-[20vh] pb-5">
        <Button className="button text" onClick={handleOpenModal}>
          Adicionar Projeto
        </Button>
      </div>
      <div className="w-full flex items-start justify-center h-[70vh]">
        <FormModal open={open} handleCloseModal={handleCloseModal} />
        <Table />
      </div>
      <img className="absolute top-[62%] left-[85%] h-[350px] z-0" src={Fred} />
    </div>
  )
}

export default TablePage
