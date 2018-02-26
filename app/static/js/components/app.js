import {ModelItem, ModelGrid} from './Hello';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<ModelGrid />
			</div>
		);
	}
}

export default App;