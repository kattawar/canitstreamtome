import React from 'react';
import '../about.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Highlighter from 'react-highlight-words';

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
      countryResult: [],
      movieSplit: [],
      streamSplit: [],
      countrySplit: [],
      activeMoviePage: 1,
      activeCountryPage: 1,
      activeStreamPage: 1
    }
  }
  handlePageChangeMovie = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activeMoviePage: pageNumber});

  }

  handlePageChangeCountry = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activeCountryPage: pageNumber});

  }
  handlePageChangeStream = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activeStreamPage: pageNumber});

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
      let moviesSplit = splitArray(movies, 6);
      this.setState({movieResult: movies});
      this.setState({movieSplit: moviesSplit});
    });
    url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/country/search?value=${searchCriteria}`;
    axios.get(url).then(res => {
      let countries = res.data.data;
      let countriesSplit = splitArray(countries, 6);
      this.setState({countryResult: countries});
      this.setState({countrySplit: countriesSplit});
    });
    url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/streaming_service/search?value=${searchCriteria}`;
    axios.get(url).then(res => {
      let services = res.data.data;
      let splitServices = splitArray(services, 6);
      this.setState({streamResult: services});
      this.setState({streamSplit: splitServices});
    });

  }

  render() {
    // Grab the returned results
    //const {movieResult, countryResult, streamResult} = this.state;
    const {searchCriteria} = this.state;
    const {movieResult,countryResult,streamResult} = this.state;

    // let movieResult = this.state.movieResult;
    // let countryResult = this.state.countryResult;
    // let streamResult = this.state.streamResult;
    console.log(countryResult);
    // If any results are returned, then render the results page
    if (movieResult.length >= 0 && countryResult.length >= 0 && streamResult.length >= 0) {

      let movies = splitArray(movieResult, 6).slice(this.state.activeMoviePage - 1, this.state.activeMoviePage);
      let countries = splitArray(countryResult, 6).slice(this.state.activeCountryPage - 1, this.state.activeCountryPage);
      let services = splitArray(streamResult, 6).slice(this.state.activeStreamPage - 1, this.state.activeStreamPage);
      //let countries = this.state.countrySplit[this.state.activeCountryPage-1];
      //let services = this.state.streamSplit[this.state.activeStreamPage-1];
      return (<div>
        <h1 align='center'>Movies</h1>
        <section>
          <div className="container">
            {
              movieResult.length === 0
                ? <h2 align='center'>Sorry, nothing here!</h2>
                : movies.map(
                  rowList => !rowList
                  ? null
                  : <div className="row">
                    {
                      rowList.map((item, i) => <div className="col-sm-2" onClick={this.handleClick}>
                        <div className="card">
                          <Link to={{pathname: `/movie/${item.name}`, state: {item: item.id}}}>
                            <h2 className="display-4">
                              <Highlighter highlightClassName="nameHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.name}/>
                            </h2>
                            <hr/>
                            <div className="col-sm-3">
                              <img className="img-responsive" src={item.image} alt=""/>
                            </div>
                          </Link>
                          <div className="col-sm-8">
                            <h4>Release Date</h4>
                            <Highlighter highlightClassName="releaseHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.release_date}/>
                            <hr/>
                            <h4>Rating</h4>
                            <Highlighter highlightClassName="ratingHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.rating}/>
                            <hr/>
                            <h4>Genre</h4>
                            <Highlighter highlightClassName="genresHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.genres}/>
                            <hr/>
                            <h4>Description</h4>
                            <Highlighter highlightClassName="descriptionHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.description}/>
                            <hr/>
                            <h4>Cast</h4>
                            <Highlighter highlightClassName="castHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.cast}/>
                          </div>
                        </div>
                      </div>)
                    }
                  </div>)
            }
          </div>
        </section>
        <div className="text-center">
          <Pagination activePage={this.state.activeMoviePage} itemsCountPerPage={6} totalItemsCount={movieResult.length} pageRangeDisplayed={5} onChange={this.handlePageChangeMovie}/>
        </div>
        <h1 align='center'>Countries</h1>
        <section>
          <div className="container">
            {
              countryResult.length === 0
                ? <h2 align='center'>Sorry, nothing here!</h2>
                : countries.map(
                  rowList => !rowList
                  ? null
                  : <div className="row">
                    {
                      rowList.map((item, i) => <div className="col-sm-2" onClick={this.handleClick}>
                        <div className="card">
                          <Link to={{pathname: `/country/${item.name}`, state: {item: item.id}}}>
                            <h2 className="display-4">
                              <Highlighter highlightClassName="nameHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.name}/>
                            </h2>
                            <hr/>
                            <div className="col-sm-4">
                              <img className="img-responsive" src={item.image} alt=""/>
                            </div>
                          </Link>
                          <div className="col-sm-8">
                            <h4>Population</h4>
                            <p>{Number(item.population).toLocaleString()}</p>
                            <Highlighter highlightClassName="populationHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={Number(item.population).toLocaleString()}/>

                            <hr/>
                            <h4>Spoken Languages</h4>
                            <Highlighter highlightClassName="languageHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.languages}/>
                          </div>
                        </div>
                      </div>)}
                  </div>)}
          </div>
        </section>
        <div className="text-center">
          <Pagination activePage={this.state.activeCountryPage} itemsCountPerPage={6} totalItemsCount={countryResult.length} pageRangeDisplayed={5} onChange={this.handlePageChangeCountry}/>
        </div>
        <h1 align='center'>Streaming Services</h1>
        <section>
          <div className="container">
            {
              streamResult.length === 0
                ? <h2 align='center'>Sorry, nothing here!</h2>
                : services.map(
                  rowList => !rowList
                  ? null
                  : <div className="row">
                    {
                      rowList.map((item, i) => <div className="col-sm-2" onClick={this.handleClick}>
                        <div className="card">
                          <Link to={{pathname: `/streaming_service/${item.name}`, state: {item: item.id}}}>
                            <h2 className="display-4">
                              <Highlighter highlightClassName="nameHighlight" searchWords={[searchCriteria]} autoEscape={true} textToHighlight={item.name}/>
                            </h2>
                            <hr/>
                            <div className="col-sm-3">
                              <img className="img-responsive" src={item.image} alt=""/>
                            </div>
                          </Link>
                          <div className="col-sm-8">
                            <h4>URL</h4>
                            <p>
                              <a href={item.website}>{item.website}</a>
                            </p>
                          </div>
                        </div>
                      </div>)}
                  </div>)}
          </div>
        </section>
        <div className="text-center">
          <Pagination activePage={this.state.activeStreamPage} itemsCountPerPage={6} totalItemsCount={streamResult.length} pageRangeDisplayed={5} onChange={this.handlePageChangeStream}/>
        </div>
      </div>);
    }
    // If there are no results, then let the user know
    return (<h1 align='center'>Sorry! No results!</h1>)

  }

}

export default Search;
