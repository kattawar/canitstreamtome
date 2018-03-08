import React from 'react';
import { ModelGrid } from './Grid';
import usa from '../img/usa.png';
import sk from '../img/southkorea.png';
import germany from '../img/germany.png';
import brazil from '../img/brazil.png';

class Countries extends React.Component {

	render() {
		let vars = [usa, germany, sk, brazil, sk, germany, brazil, usa];

		 return (<ModelGrid type='country' info={vars} />);
	}
}

export default Countries;