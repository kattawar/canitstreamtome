import React from 'react';
import NavBarr from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieInstance from './components/MovieInstance'
import Services from './components/Services';
import Countries from './components/Countries';
import Bottom from './components/Footer';
import About from './components/About';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <NavBarr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
          <Route path='/movies/movieInstance' component={MovieInstance}/>
          <Route exact path="/countries" component={Countries} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/about" component={About} />
        </Switch>
        <Bottom />
      </div>
    );
  }
}

export default App;
