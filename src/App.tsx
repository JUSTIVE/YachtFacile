import './App.css'
import { Field } from './Field'
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
