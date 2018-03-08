import React from 'react';
import { ModelGrid } from './Grid';
import br from '../img/br.png';
import toy from '../img/toy.png';
import tgf from '../img/tgf.png';
import ww from '../img/ww.png';


class Movies extends React.Component {

	render() {
		let vars = [br, toy, tgf, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br];

		 return (<ModelGrid type='movie' info={vars} />);
	}
}

export default Movies;