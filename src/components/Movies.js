import React from 'react';
import { ModelGrid } from './Hello';

class Movies extends React.Component {
		constructor(props) {
		super(props);
	}

	render() {
		let vars = ['br.png','toy.png', 'tgf.png', 'ww.png'];

		 return (<ModelGrid type='movie' info={vars} />);
	}
}

export default Movies;