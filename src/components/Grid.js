import React from 'react';
import { Link } from 'react-router-dom';
import  '../movies.css';

function splitArray(input, spacing) {
    var output = [];

    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
}



export class ModelGrid extends React.Component {

    handleClick = () => {
    	console.log('this is:', this);

    }


	render() {
    var posters = [];
    var movieList = [];
	 movieList = this.props.info;
		//const movieGrouped = movieList;
    console.log(movieList.movies);

   posters = movieList.movies;

   if(posters){
     const posterRows = splitArray(posters, 6);
     console.log(posterRows);
		return (

			<section>
			<div className="container">
      {posterRows.map(rowList=>
        !rowList ? null:
         <div className="row">
				{rowList.map(item =>


							<div className="col-sm-2" onClick={this.handleClick}>
								<Link to={`/${this.props.type}/${this.props.type}Instance`}>
									<img src={item.poster_url}  alt=""/>
								</Link>
							</div>
					)}
          </div>
        )}

			</div>
			</section>
		);
  }
  return(<div></div>);
	}
}
