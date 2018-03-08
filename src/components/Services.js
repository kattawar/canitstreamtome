import React from 'react';
import { ModelGrid } from './Grid';
import hulu from '../img/hulu-logo.png';
import netflix from '../img/netflix-logo.png';
import amazon from '../img/amazon-logo.png';
import epix from '../img/epix-logo.png';

class Services extends React.Component {

	render() {
		let vars = [hulu, netflix, amazon, epix, amazon, netflix, epix, hulu];

		 return (<ModelGrid type='service' info={vars} />);
	}
}

export default Services;