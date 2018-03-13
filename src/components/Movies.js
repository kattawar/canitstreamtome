import React from 'react';
import { ModelGrid } from './Grid';
import br from '../img/br.png';
import toy from '../img/toy.png';
import tgf from '../img/tgf.png';
import ww from '../img/ww.png';
import axios from 'axios';


class Movies extends React.Component {

	state = {
		movieList : []
	}

	componentDidMount(){
		axios.get(`https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/movie?all=true`)
	       .then(res => {
	         const movieList = res.data;
	         this.setState({ movieList });
					 console.log(movieList);
	       })
				  .catch((error) => {
						console.log(error);
					});



	}
	render() {
		let vars = [br, toy, tgf, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br, ww, toy, ww, tgf, br];

		 return (<ModelGrid type='movies' info={this.state.movieList}/>);
	}
}

export default Movies;
