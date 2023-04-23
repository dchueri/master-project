import App from 'components/App'
import { createRoot } from 'react-dom/client'
import 'style.css'
import 'tailwindcss/tailwind.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
