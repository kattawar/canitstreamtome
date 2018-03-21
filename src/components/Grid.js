import React from 'react';
import { Link } from 'react-router-dom';
import  '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';

function splitArray(input, spacing) {
    var output = [];



    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }


    return output;
}




export class ModelGrid extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      activePage: 1
    };
    this.updateData(1);


  }

    handlePageChange = (pageNumber) => {
   console.log(`active page is ${pageNumber}`);
   this.setState({activePage: pageNumber});
   this.updateData(pageNumber);
 }

    updateData= (pageNumber) =>{
      console.log(pageNumber);
      console.log("updatecalled");
      let url = "";

       url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/${this.props.type}?pagesize=24&pagenum=${pageNumber-1}`;
console.log(url)
      axios.get(url)
  	       .then(res => {
  	         const movieList = res.data;
  	         this.setState({ data:movieList });



  	       })
  				  .catch((error) => {
  						console.log(error);
  					});



  	}


	render() {



	 //movieList = this.props.info;
		//const movieGrouped = movieList;
    //console.log(movieList.movies);

   //posters = movieList.movies;

      if(this.state.data.data){
      const movieGrouped = this.state.data.data;


     const posterRows = splitArray(movieGrouped, 6);



     console.log(this.state.data.data);

		return (
      <div>
			<section>
			<div className="container">
      {posterRows.map(rowList=>
        !rowList ? null:
         <div className="row">
				{rowList.map(item =>


							<div className="col-sm-2" onClick={this.handleClick}>
								<Link to={{pathname:`/${this.props.type}/${item.name}`, state:{item: {item}}}}>
									<img src={item.image}  alt=""/>
								</Link>
							</div>
					)}
          </div>
        )}



			</div>




			</section>
      <div className="text-center">
      <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={24}
          totalItemsCount={800}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        </div>
        </div>
		);
  }
  return (<div></div>);


	}
}
