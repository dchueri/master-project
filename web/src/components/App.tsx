import Fred from '../public/fred.png'
import Table from './Table'

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <Table />
      <img
        className="absolute top-[62%] left-[85%] h-[350px] z-[-1]"
        src={Fred}
      />
    </div>
  )
}

export default App
