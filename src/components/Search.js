import React from 'react';
import '../about.css';
import axios from 'axios';
import {Link} from 'react-router-dom';


function splitArray(input, spacing) {
  var output = [];

  for (var i = 0; i < input.length; i += spacing) {
    output[output.length] = input.slice(i, i + spacing);
  }

  return output;
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCriteria: '',
      movieResult: [],
      streamResult: [],
      countryResult: []
    }
  }
  componentDidMount() {
    // Get the search term - we will split the strings here
    let phrase = this.props.location.search;
    const searchCriteria = phrase.split('=').pop();
    this.setState({searchCriteria})

    // API calls for each model, sending in the search term - for the 'or' case, need to do this multiple times
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/movie/search?value=${searchCriteria}`;
    axios.get(url).then(res => {
      let movies = res.data.data;
      this.setState({movieResult: movies});
    });
    url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/country/search?value=${searchCriteria}`;
    axios.get(url).then(res => {
      let countries = res.data.data;
      this.setState({countryResult: countries});
    });
    url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/streaming_service/search?value=${searchCriteria}`;
    axios.get(url).then(res => {
      let services = res.data.data;
      this.setState({streamResult : services});
    });

  }

  render() {
    // Grab the returned results
    const {movieResult, countryResult, streamResult} = this.state;

    // If any results are returned, then render the results page
    if (movieResult.length > 0 || countryResult.length > 0 || streamResult.length > 0) {
      let movies = splitArray(movieResult, 6);
      let countries = splitArray(countryResult, 6);
      let services = splitArray(streamResult, 6);
      return (
        <div>
          <h1 align='center'>Movies</h1>
          <section>
            <div className="container">
              {movieResult.length === 0 ? <h2 align='center'>Sorry, nothing here!</h2> :
                movies.map(rowList => !rowList ? null :
                <div className="row"> {rowList.map((item,i) =>
                  <div className="col-sm-2" onClick={this.handleClick}>
                      <Link to={{pathname: `/movie/${item.name}`, state: {item:item.id}}}>
                      <div className="card">
                        <img src={item.image} alt=""/>
                        <h5 align="center"> {item.name}</h5>
                      </div>
                      </Link>
                  </div>)}
                </div>)}
            </div>
          </section>
          <h1 align='center'>Countries</h1>
          <section>
            <div className="container">
              {countryResult.length === 0 ? <h2 align='center' >Sorry, nothing here!</h2> :
                countries.map(rowList => !rowList ? null :
                <div className="row"> {rowList.map((item,i) =>
                  <div className="col-sm-2" onClick={this.handleClick}>
                      <Link to={{pathname: `/country/${item.name}`, state: {item:item.id}}}>
                      <div className="card">
                        <img src={item.image} alt=""/>
                        <h5 align="center"> {item.name}</h5>
                      </div>
                      </Link>
                  </div>)}
                </div>)}
            </div>
          </section>
          <h1 align='center'>Streaming Services</h1>
          <section>
            <div className="container">
              {streamResult.length === 0 ? <h2 align='center'>Sorry, nothing here!</h2> :
                services.map(rowList => !rowList ? null :
                <div className="row"> {rowList.map((item,i) =>
                  <div className="col-sm-2" onClick={this.handleClick}>
                      <Link to={{pathname: `/streaming_service/${item.name}`, state: {item:item.id}}}>
                      <div className="card">
                        <img src={item.image} alt=""/>
                        <h5 align="center"> {item.name}</h5>
                      </div>
                      </Link>
                  </div>)}
                </div>)}
            </div>
          </section>
        </div>
      );
    }
    // If there are no results, then let the user know
    return (
      <h1 align='center'>Sorry! No results!</h1>
    )

  }

}

export default Search;
