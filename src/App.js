import React from 'react';
import NavBarr from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieInstance from './components/MovieInstance';
import Services from './components/Services';
import ServiceInstance from './components/ServiceInstance';
import Countries from './components/Countries';
import CountryInstance from './components/CountryInstance';
import Bottom from './components/Footer';
import About from './components/About';
import Search from './components/Search';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <NavBarr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie" component={Movies} />
          <Route path='/movie/:movieID' component={MovieInstance}/>
          <Route exact path="/country" component={Countries} />
          <Route path="/country/:countryID" component={CountryInstance}/>
          <Route exact path="/streaming_service" component={Services} />
          <Route path="/streaming_service/:serviceID" component={ServiceInstance}/>
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={Search} />
        </Switch>
        <Bottom />
      </div>
    );
  }
}

export default App;
