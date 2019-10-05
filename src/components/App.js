import React, { Component } from 'react'
import FoodsList from './FoodsList'
import CreateFood from './CreateFood'
import Login from './Login'
import Header from './Header'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-black">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/all-foods' />} />
            <Route exact path="/create" component={CreateFood} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/all-foods' component={FoodsList} />
            <Route exact path='/my-foods' component={FoodsList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
