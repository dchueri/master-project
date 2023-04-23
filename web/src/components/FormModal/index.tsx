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
      className="fixed inset-0 bg-[black] bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-[white] p-2 rounded">Modal</div>
    </div>
  )
}

export default FormModal
