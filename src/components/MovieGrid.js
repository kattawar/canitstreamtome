import React from 'react';
import { Link } from 'react-router-dom';
import '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const GENRE_FILTERS = [
  {value: 'science', label: 'Genre: Science Fiction'},
  {value: 'crime', label: 'Genre: Crime'},
  {value: 'action', label: 'Genre: Action'},
  {value: 'comedy', label: 'Genre: Comedy'},
  {value: 'history', label: 'Genre: History'},
  {value: 'drama', label: 'Genre: Drama'},
  {value: 'war', label: 'Genre: War'},
  {value: 'thriller', label: 'Genre: Thriller'}
]

const RATING_FILTERS = [
  {value: 'rating_0_4', label: 'Rating 0 to 4'},
  {value: 'rating_4_6', label: 'Rating 4 to 6'},
  {value: 'rating_6_8', label: 'Rating 6 to 8'},
  {value: 'rating_8_10', label: 'Rating 8 to 10'}
]

const RATING_FILTERS_DISABLED = [
  {value: 'rating_0_4', label: 'Rating 0 to 4', disabled: true},
  {value: 'rating_4_6', label: 'Rating 4 to 6', disabled: true},
  {value: 'rating_6_8', label: 'Rating 6 to 8', disabled: true},
  {value: 'rating_8_10', label: 'Rating 8 to 10', disabled: true}
]

const RELEASE_FILTERS = [
  {value: 'release_pre_80', label: 'Release Date before 1980'},
  {value: 'release_80_00', label: 'Realease Date 1980 to 2000'},
  {value: 'release_00_10', label: 'Release Date 2000 to 2010'},
  {value: 'release_10_now', label: 'Release Date after 2010'}
]

const RELEASE_FILTERS_DISABLED = [
  {value: 'release_pre_80', label: 'Release Date before 1980', disabled: true},
  {value: 'release_80_00', label: 'Realease Date 1980 to 2000', disabled: true},
  {value: 'release_00_10', label: 'Release Date 2000 to 2010', disabled: true},
  {value: 'release_10_now', label: 'Release Date after 2010', disabled: true}
]

function splitArray(input, spacing) {
  var output = [];
  for (var i = 0; i < input.length; i += spacing) {
    output[output.length] = input.slice(i, i + spacing);
  }
  return output;
}

export class MovieGrid extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        offset: 0,
        data: [],
        activePage: 1,
        selectedOption: '',
        selectedOptionFilter: [],
        activeSort: 'title',
        activeDir: 'asc',
        activeFilters: [],
        realPage: 0,
        rating_selected: false,
        release_selected: false
      };
      this.updateData();
    }

    handleChange = (selectedOption) => {
      this.setState({
        selectedOption
      });
      var dir = '';
      var sort = '';
      if (selectedOption) {
        switch (selectedOption.value) {
          case '1':
            sort = 'title'
            dir = 'asc'
            break;
          case '2':
            sort = 'title'
            dir = 'desc'
            break;
          case '3':
            sort = 'rating'
            dir = 'desc'
            break;
          case '4':
            sort = 'rating'
            dir = 'asc'
            break;
          case '5':
            sort = 'release_date'
            dir = 'desc'
            break;
          case '6':
            sort = 'release_date'
            dir = 'asc'
            break;
          default:
            console.log("HERE3");
        }
      } else {
        sort = 'title'
        dir = 'asc'
      }
      this.setState({activeDir: dir}, function() {
        this.setState({activeSort: sort}, function() {
          this.setState({activePage: 1});
          this.setState({realPage: 0}, function() {
            this.updateData();
          });
        });
      });
      //  this.updateData();
    }

    handleFilterChange = (selectedOptionFilter) => {
      console.log("FILTER");
      this.setState({selectedOptionFilter});
      var filters = [];
      var genres = [];
      var filter = '';
      var rating_selected = false
      var release_selected = false

      if (selectedOptionFilter) {
        console.log(selectedOptionFilter)
          if (selectedOptionFilter.includes('science')) {
            filter = '"Science Fiction","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('crime')) {
            filter = '"Crime","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('action')) {
            filter = '"Action","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('comedy')) {
            filter = '"Comedy","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('history')) {
            filter = '"History","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('drama')) {
            filter = '"Drama","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('war')) {
            filter = '"War","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('thriller')) {
            filter = '"Thriller","like"';
            genres.push(filter)
          }
          if (selectedOptionFilter.includes('rating_0_4')) {
            this.setState({rating_selected: true});
            rating_selected = true
            filter = '"rating":["0.0",">=","4.0","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('rating_4_6')) {
            this.setState({rating_selected: true});
            rating_selected = true
            filter = '"rating":["4.0",">=","6.0","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('rating_6_8')) {
            this.setState({rating_selected: true});
            rating_selected = true
            filter = '"rating":["6.0",">=","8.0","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('rating_8_10')) {
            this.setState({rating_selected: true});
            rating_selected = true
            filter = '"rating":["8.0",">=","9.9","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('release_pre_80')) {
            this.setState({release_selected: true});
            release_selected = true
            filter = '"release_date":["1980-01-01","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('release_80_00')) {
            this.setState({release_selected: true});
            release_selected = true
            filter = '"release_date":["1980-01-01",">=","2000-01-01","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('release_00_10')) {
            this.setState({release_selected: true});
            release_selected = true
            filter = '"release_date":["2000-01-01",">=","2010-01-01","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('release_10_now')) {
            this.setState({release_selected: true});
            release_selected = true
            filter = '"release_date":["2010-01-01",">="]';
            filters.push(filter)
          }
      }

      if (genres.length > 0) {
        var genre_filter = '"genres":[' + genres[0]
        var isFirst = true
        for (var genre in genres) {
          if (isFirst) {
            isFirst = false
          } else {
            genre_filter = genre_filter + ',' + genres[genre]
          }
        }
        genre_filter = genre_filter + ']'
        filters.push(genre_filter)
      }

      console.log(filters)
      if (!release_selected) {
        this.setState({release_selected: false});
      }
      if (!rating_selected) {
        this.setState({rating_selected: false});
      }

      this.setState({activeFilters: filters}, function() {
            this.setState({activePage: 1});
            this.setState({realPage: 0}, function() {
              this.updateData();
            });
      });
    }

    updateOptions = () => {

    }

    handlePageChange = (pageNumber) => {
      console.log(`active page is ${pageNumber}`);
      this.setState({
        activePage: pageNumber
      });
      this.setState({
        realPage: pageNumber - 1
      }, function() {
        this.updateData();
      });
    }

    updateData = () => {
      var filters = "" + this.state.activeFilters[0]
      var isFirst = true
      for (var filter in this.state.activeFilters) {
        if (isFirst) {
          isFirst = false
        } else {
          filters = filters + ',' + this.state.activeFilters[filter]
        }
      }
      console.log(filters);
      if (filters === 'undefined') {
        filters = ""
      }
      let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/movie?pagesize=24&filter={${filters}}&sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}&pagenum=${this.state.realPage}`;
      //console.log(url);
      axios.get(url).then(res => {
        const instanceList = res.data;
        this.setState({
          data: instanceList
        });
      }).catch((error) => {
        console.log(error);
      });
    }

    render() {

        const {selectedOption} = this.state;
        const value = selectedOption && selectedOption.value;

        const {selectedOptionFilter} = this.state;
        const valueFilter = selectedOptionFilter;

        var create_options = GENRE_FILTERS
        if (this.state.rating_selected) {
          create_options = create_options.concat(RATING_FILTERS_DISABLED)
        } else {
          create_options = create_options.concat(RATING_FILTERS)
        }
        if (this.state.release_selected) {
          create_options = create_options.concat(RELEASE_FILTERS_DISABLED)
        } else {
          create_options = create_options.concat(RELEASE_FILTERS)
        }
        console.log(this.state.rating_selected)
        console.log(this.state.release_selected)
        console.log(create_options)

        const options = create_options

        var totalItems = 1120;

        if (this.state.data.data) {
          const instanceGrouped = this.state.data.data;
          const instanceRows = splitArray(instanceGrouped, 6);
          console.log(this.state.data.data);

          return (
            <div>
              <div className="col-sm-3">
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <h4>Sort By</h4>
                    <Select
                      name="form-field-name"
                      value={value}
                      onChange={this.handleChange}
                      options={
                        [{value: '1', label: 'Title A-Z'},
                        {value: '2', label: 'Title Z-A'},
                        {value: '3', label: 'Rating High-Low'},
                        {value: '4', label: 'Rating Low-High'},
                        {value: '5', label: 'Release Date Newest-Oldest'},
                        {value: '6', label: 'Release Date Oldest-Newest'}]
                      }/>
                  </div>
                <div className="col-sm-3">
                <h4>Filter By</h4>
                <Select
                  name="form-field-name2"
                  multi={true}
                  removeSelected={true}
                  onChange={this.handleFilterChange}
                  simpleValue
                  value={valueFilter}
                  options={options}
                />
              </div>
              <div className="col-sm-2">
              </div>
            </div>
            <div className="movie">
              <section>
                <div className="container">
                  {instanceRows.map(rowList => !rowList ? null :
                    <div className="row"> {rowList.map((item,i) =>
                      <div className="col-sm-2" onClick={this.handleClick}>
                        <OverlayTrigger trigger={['hover','focus']}
                          placement={i <= 2 ? "right" : "left"}
                          overlay={<Popover id="popover-trigger-hover-focus">
                            <strong>Release date: </strong>
                            {item.release_date} <br/>
                            <strong>Rating: </strong>
                            {item.rating} <br/>
                            <strong>Genre: </strong>
                            {item.genre} <br/>
                          </Popover>}>
                          <Link to={{pathname: `/movie/${item.name}`, state: {item:item.id}}}>
                          <div className="card">
                            <img src={item.image} alt=""/>
                            <h5 align="center"> {item.name}</h5>
                          </div>
                          </Link>
                        </OverlayTrigger>

                      </div>)}
                    </div>)}
                </div>
              </section>
            </div>
            <div className="text-center">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={24}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                onChange = {this.handlePageChange}
              />
            </div>
          </div>);
        }
      return (<div></div>);
    }
}

export default MovieGrid;
