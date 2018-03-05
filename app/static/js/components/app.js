import {ModelItem, ModelGrid} from './Hello';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBarr from './NavBar';
import {Route, Switch, withRouter} from 'react-router-dom';
import Home from './Home';
import Movies from './Movies'

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
			</div>
		);
	}
}

export default App;