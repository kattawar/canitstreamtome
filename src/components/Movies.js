import React from 'react';
import { ModelGrid } from './Grid';
import axios from 'axios';


class Movies extends React.Component {

	state = {
		movieList : []
	}

	componentDidMount(){
		axios.get(`https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/movie?sortdir=asc&pagesize=24`)
	       .then(res => {
	         const movieList = res.data;
	         this.setState({ movieList });
	       })
				  .catch((error) => {
						console.log(error);
					});



	}
	render() {

		 return (<ModelGrid type='movies' info={this.state.movieList}/>);
	}
}

export default Movies;
