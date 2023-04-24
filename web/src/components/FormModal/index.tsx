import ProjectForm from 'components/ProjectForm'

const FormModal = ({
  open,
  handleCloseModal
}: {
  open: boolean
  handleCloseModal: (e: any) => void
}) => {
  if (!open) return null
  return (
    <div
      id="container"
      onClick={handleCloseModal}
      className="fixed z-20 inset-0 bg-[black] bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-[#e7e9f1] p-2 rounded-l-[65px] rounded-r-[5px]">
        <ProjectForm />
      </div>
    </div>
  )
}

export default FormModal
