import { Alerts } from 'interfaces/Alterts'

export function alertDispatch(alert: Alerts, setState: any) {
  setState(alert)
  setTimeout(() => {
    setState({ ...alert, visible: false })
  }, 4000)
}
