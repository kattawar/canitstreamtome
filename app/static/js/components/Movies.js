import React from 'react';
import { ModelGrid } from './Hello';

class Movies extends React.Component {
		constructor(props) {
		super(props);
	}

	render() {
		let vars = 
		['1' : 'br.png',
		 '2' : 'toy.png',
		 '3' : 'tgf.png',
		 '4' : 'ww.png'];

		 return (<MovieGrid type='movie' info={vars} />);
	}
}

export default Movies;