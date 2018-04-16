import React from 'react';
import '../about.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Highlighter from 'react-highlight-words';
import { splitArray, splitSearch } from './Utilities.js';


class Search extends React.Component {
  constructor(props) {
    super(props);

    let phrase = this.props.location.search;
    const searchCriteria = phrase.split('=').pop();

    this.state = {
      searchCriteria: searchCriteria,
      queries: splitSearch(searchCriteria),
      movieResult: [],
      streamResult: [],
      countryResult: [],
      activeMoviePage: 1,
      activeCountryPage: 1,
      activeStreamPage: 1
    }

    this.updateData = this.updateData.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateService = this.updateService.bind(this);

    this.updateData();
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

  componentDidUpdate() {
    let newPhrase = this.props.location.search;
    const newSearch = newPhrase.split('=').pop();
    const {searchCriteria} = this.state;
    if (searchCriteria !== newSearch) {
      this.setState({queries: splitSearch(newSearch)});
      this.setState({
        searchCriteria: newSearch
      }, function() {
        this.updateData()
      });
    }
  }

  updateData = () => {
    const {searchCriteria} = this.state;
    let queries = searchCriteria.split(/( or )|(%20or%20)/);
    queries = queries.filter(e => e !== undefined).filter(e => e !== " or ").filter(e => e !== "%20or%20");
    this.setState({queries: queries});
    this.updateMovie(queries);
    this.updateCountry(queries);
    this.updateService(queries);
  }

  updateMovie = (queries) => {
    let newDict = {}
    for (let term of queries) {
      let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/movie/search?value=${term}`;
      axios.get(url).then(res => {
        let results = res.data.data;
        for (let movie of results) {
          newDict[movie.id] = movie;
        }
        this.setState({movieResult: Object.values(newDict)});
        this.setState({activeMoviePage: 1});

      });

    }
  }

  updateCountry = (queries) => {
    let newDict = {}
    for (let term of queries) {
      let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/country/search?value=${term}`;
      axios.get(url).then(res => {
        let results = res.data.data;
        for (let country of results) {
          newDict[country.id] = country;
        }
        this.setState({countryResult: Object.values(newDict)});
        this.setState({activeCountryPage: 1});
      });

    }
  }

  updateService = (queries) => {
    let newDict = {}
    for (let term of queries) {
      let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/streaming_service/search?value=${term}`;
      axios.get(url).then(res => {
        let results = res.data.data;
        for (let service of results) {
          newDict[service.id] = service;
        }
        this.setState({streamResult: Object.values(newDict)});
        this.setState({activeStreamPage: 1});
      });

    }
  }

  render() {
    // Grab the returned results
    const {queries} = this.state;
    const {movieResult, countryResult, streamResult} = this.state;

    // If any results are returned, then render the results page
    if (movieResult.length > 0 || countryResult.length > 0 || streamResult.length > 0) {

      let movies = splitArray(movieResult, 3).slice(this.state.activeMoviePage - 1, this.state.activeMoviePage+1);
      let countries = splitArray(countryResult, 3).slice(this.state.activeCountryPage - 1, this.state.activeCountryPage+1);
      let services = splitArray(streamResult, 3).slice(this.state.activeStreamPage - 1, this.state.activeStreamPage+1);
      console.log(movies);
      return (<div>
        <section>
          <div className="container">
            {
              movieResult.length === 0
                ? null
                : <div>
                    <h1 align='center'>Movies</h1>
                    <section>
                      {
                        movies.map(
                          rowList => !rowList
                          ? null
                          : <div className="row">
                            {
                              rowList.map((item, i) => <div className="col-sm-4" onClick={this.handleClick}>
                                <div className="card">
                                  <Link to={{
                                      pathname: `/movie/${item.id}`
                                    }}>
                                    <h2 className="display-3">
                                      <Highlighter highlightClassName="nameHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.name}/>
                                    </h2>
                                    <hr/>
                                    <div className="col-sm-3">
                                      <img className="img-responsive" src={item.image} alt=""/>
                                    </div>
                                  </Link>
                                  <div className="col-sm-9">
                                    <h4>Release Date</h4>
                                    <p><Highlighter highlightClassName="releaseHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.release_date}/></p>
                                    <hr/>
                                    <h4>Rating</h4>
                                    <p><Highlighter highlightClassName="ratingHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.rating}/></p>
                                    <hr/>
                                  </div>
                                  <div className="col-sm-12">
                                    <h4>Genre</h4>
                                    <p><Highlighter highlightClassName="genresHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.genres}/></p>
                                    <hr/>
                                    <h4>Description</h4>
                                    <p><Highlighter highlightClassName="descriptionHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.description}/></p>
                                    <hr/>
                                    <h4>Cast</h4>
                                    <p><Highlighter highlightClassName="castHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.movie_cast}/></p>
                                  </div>
                                </div>
                              </div>)
                            }
                          </div>)
                      }
                    </section>
                    <div className="text-center">
                      <Pagination activePage={this.state.activeMoviePage} itemsCountPerPage={6} totalItemsCount={movieResult.length} pageRangeDisplayed={5} onChange={this.handlePageChangeMovie}/>
                    </div>
                  </div>
            }
          </div>
        </section>

        <section>
          <div className="container">
            {
              countryResult.length === 0
                ? null
                : <div>
                    <h1 align='center'>Countries</h1>
                    <section>
                      {
                        countries.map(
                          rowList => !rowList
                          ? null
                          : <div className="row">
                            {
                              rowList.map((item, i) => <div className="col-sm-4" onClick={this.handleClick}>
                                <div className="card">
                                  <Link to={{
                                      pathname: `/country/${item.id}`
                                    }}>
                                    <h2 className="display-3">
                                      <Highlighter highlightClassName="nameHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.name}/>
                                    </h2>
                                    <hr/>
                                    <div className="col-sm-4">
                                      <img className="img-responsive" src={item.image} alt=""/>
                                    </div>
                                  </Link>
                                  <div className="col-sm-8">
                                    <h4>Population</h4>
                                    <p><Highlighter highlightClassName="populationHighlight" searchWords={queries} autoEscape={true} textToHighlight={Number(item.population).toLocaleString()}/></p>
                                    <hr/>
                                  </div>
                                  <div className="col-sm-12">
                                    <h4>Region</h4>
                                    <p><Highlighter highlightClassName="regionHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.region}/></p>
                                    <hr/>
                                    <h4>Spoken Languages</h4>
                                    <p><Highlighter highlightClassName="languageHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.languages}/></p>
                                  </div>
                                </div>
                              </div>)
                            }
                          </div>)
                      }
                    </section>
                    <div className="text-center">
                      <Pagination activePage={this.state.activeCountryPage} itemsCountPerPage={6} totalItemsCount={countryResult.length} pageRangeDisplayed={5} onChange={this.handlePageChangeCountry}/>
                    </div>
                  </div>
            }
          </div>
        </section>

        <section>
          <div className="container">
            {
              streamResult.length === 0
                ? null
                : <div>
                    <h1 align='center'>Streaming Services</h1>
                    <section>
                      {
                        services.map(
                          rowList => !rowList
                          ? null
                          : <div className="row">
                            {
                              rowList.map((item, i) => <div className="col-sm-4" onClick={this.handleClick}>
                                <div className="card">
                                  <Link to={{
                                      pathname: `/streaming_service/${item.id}`
                                    }}>
                                    <h2 className="display-3">
                                      <Highlighter highlightClassName="nameHighlight" searchWords={queries} autoEscape={true} textToHighlight={item.name}/>
                                    </h2>
                                    <hr/>
                                    <div className="col-sm-3">
                                      <img className="img-responsive" src={item.image} alt=""/>
                                    </div>
                                  </Link>
                                  <div className="col-sm-9">
                                    <h4>URL</h4>
                                    <p>
                                      <a href={item.website}>{item.website}</a>
                                    </p>
                                  </div>
                                </div>
                              </div>)
                            }
                          </div>)
                      }
                    </section>
                    <div className="text-center">
                      <Pagination activePage={this.state.activeStreamPage} itemsCountPerPage={6} totalItemsCount={streamResult.length} pageRangeDisplayed={5} onChange={this.handlePageChangeStream}/>
                    </div>
                  </div>
            }
          </div>
        </section>

      </div>);
    }
    // If there are no results, then let the user know
    return (<h1 align='center'>Sorry! No results!</h1>)

  }

}

export default Search;
