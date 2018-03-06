import React from 'react';
import NavBarr from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies'
import Bottom from './components/Footer'

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <NavBarr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
        </Switch>
        <Bottom />
      </div>
    );
  }
}

export default App;
