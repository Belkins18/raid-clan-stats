import '@/App.css'
import { MainLayout } from './layouts/Main'
import { WithAntTheme } from './hocs/withAntTheme'

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
  return (
    <WithAntTheme>
      <MainLayout pageNavigation={pages} />
    </WithAntTheme>
  )
}

export default App
