import { useState } from 'react'
import Fred from '../public/fred.png'
import FormModal from './FormModal'
import Table from './Table'
import Button from './elements/Button'

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = (e: any) => {
    if (e.target.id === 'container') return setOpen(false)
  }
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="w-full flex justify-center">
        <div onClick={handleOpenModal}>
          <Button>Open</Button>
        </div>
        <FormModal open={open} handleCloseModal={handleCloseModal} />
      </div>
      <Table />
      <img
        className="absolute top-[62%] left-[85%] h-[350px] z-[-1]"
        src={Fred}
      />
    </div>
  )
}

export default App
