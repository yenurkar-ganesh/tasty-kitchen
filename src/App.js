import {Link, BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurentDetailsCard from './components/RestaurentDetailsCard'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/restaurants-list/:id"
        component={RestaurentDetailsCard}
      />
    </Switch>
  </BrowserRouter>
)

export default App
