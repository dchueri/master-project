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
      <div className="bg-[white] p-2 rounded">
        <ProjectForm />
      </div>
    </div>
  )
}

export default FormModal
