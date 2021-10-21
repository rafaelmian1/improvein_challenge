import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Bands from './pages/Bands'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LogIn} />
        <Route
          exact
          path='/bands'
          component={localStorage.getItem('user') ? Bands : LogIn}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
