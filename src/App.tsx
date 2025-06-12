import '@/App.css'
import { MainLayout } from './layouts/Main'

function App() {
  const pages = [
    {
      key: 'hydra',
      label: 'Hydra'
    },
    {
      key: 'chimera',
      label: 'Chimera'
    }
  ]

  return <MainLayout pageNavigation={pages} />
}

export default App
