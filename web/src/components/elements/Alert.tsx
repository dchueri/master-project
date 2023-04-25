import { useRecoilState } from 'recoil'
import { alertState } from 'utils/atom'

export const Alert = () => {
  const [alert, setAlert] = useRecoilState(alertState)
  let display
  alert?.visible ? (display = '') : (display = ' invisible')

  return (
    <div
      className={alert?.type + display}
      role="alert"
      onClick={() => {
        setAlert({ text: '', type: 'fail', visible: false })
      }}
    >
      <span className="block sm:inline">{alert?.text}</span>
    </div>
  )
}
