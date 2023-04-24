import { useState } from 'react'
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
  return (
    <div className="relative overflow-hidden bg-[white] h-[100vh] flex flex-col justify-center gap-2">
      <div className="w-full flex justify-center">
        <div onClick={handleOpenModal}>
          <Button className="button text">Adicionar Projeto</Button>
        </div>
        <FormModal open={open} handleCloseModal={handleCloseModal} />
      </div>
      <Table />
      <img className="absolute top-[62%] left-[85%] h-[350px] z-0" src={Fred} />
    </div>
  )
}

export default TablePage
