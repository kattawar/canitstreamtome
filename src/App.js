import {ModelItem, ModelGrid} from './components/Hello';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBarr from './components/NavBar';
import {Route, Switch, withRouter} from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies'
import Bottom from './components/Footer'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
