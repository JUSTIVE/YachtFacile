import './App.css'
import { Field } from './components/Field'
import { RecoilRoot } from 'recoil'
import { Logger } from './Logger'

function App() {
  return (
    <RecoilRoot>
      <Field />
      <Logger />
    </RecoilRoot>
  )
}

export default App
