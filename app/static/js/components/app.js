import {ModelItem, ModelGrid} from './Hello';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import {Route, Switch, withRouter} from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
		);
	}
}

export default App;