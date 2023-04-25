import UpdateProjectModal from 'components/UpdateProjectModal'
import { useAuth } from 'context/AuthProvider/useAuth'
import { IProject } from 'interfaces/IProject'
import { useState } from 'react'
import { MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { projectToUpdateState } from 'utils/atom'
import AddProjectModal from '../components/AddProjectModal'
import Table from '../components/Table'
import Button from '../components/elements/Button'
import Fred from '../public/fred.png'

const TablePage = () => {
  const [openAddModal, setAddModalOpen] = useState<boolean>(false)
  const [openUpdateModal, setUpdateModalOpen] = useState<boolean>(false)
  const setProjectToUpdate = useSetRecoilState(projectToUpdateState)
  const handleOpenAddModal = () => setAddModalOpen(true)
  const handleCloseAddModal = (e: any) => {
    if (e.target.id === 'container') return setAddModalOpen(false)
  }
  const handleOpenUpdateModal = (project: IProject) => {
    setUpdateModalOpen(true)
    setProjectToUpdate(project)
  }
  const handleCloseUpdateModal = (e: any) => {
    if (e.target.id === 'container') return setUpdateModalOpen(false)
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
        <Button className="button text" onClick={handleOpenAddModal}>
          Adicionar Projeto
        </Button>
      </div>
      <div className="w-full flex items-start justify-center h-[70vh]">
        <AddProjectModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
        <UpdateProjectModal
          open={openUpdateModal}
          handleCloseModal={handleCloseUpdateModal}
        />
        <Table updateModal={handleOpenUpdateModal} />
      </div>
      <img className="absolute top-[62%] left-[85%] h-[350px] z-0" src={Fred} />
    </div>
  )
}

export default TablePage
