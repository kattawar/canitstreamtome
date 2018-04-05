import React from 'react';
import { Link } from 'react-router-dom';
import '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';

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
        //activeValue: '',
        //activeComparison: '',
        realPage: 0
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
      var filter = '';
      if (selectedOptionFilter) {
        console.log(selectedOptionFilter)
          if (selectedOptionFilter.includes('science')) {
            filter = '"genres":["Science Fiction","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('crime')) {
            filter = '"genres":["Crime","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('action')) {
            filter = '"genres":["Action","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('comedy')) {
            filter = '"genres":["Comedy","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('history')) {
            filter = '"genres":["History","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('drama')) {
            filter = '"genres":["Drama","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('war')) {
            filter = '"genres":["War","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('thriller')) {
            filter = '"genres":["Thriller","like"]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('11')) {
            filter = '"rating":["8",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('22')) {
            filter = '"rating":["7",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('33')) {
            filter = '"rating":["6",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('44')) {
            filter = '"rating":["5",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('55')) {
            filter = '"rating":["4",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('66')) {
            filter = '"release_date":["2010-01-01",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('77')) {
            filter = '"release_date":["2000-01-01",">="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('88')) {
            filter = '"release_date":["2000-01-01","<="]';
            filters.push(filter)
          }
          if (selectedOptionFilter.includes('99')) {
            filter = '"release_date":["1970-01-01","<="]';
            filters.push(filter)
          }
      }
      console.log(filters)
      this.setState({activeFilters: filters}, function() {
            this.setState({activePage: 1});
            this.setState({realPage: 0}, function() {
              this.updateData();
            });
      });
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
      console.log(url);
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
                  options={
                    [{value: 'science', label: 'Genre: Science Fiction'},
                    {value: 'crime', label: 'Genre: Crime'},
                    {value: 'action', label: 'Genre: Action'},
                    {value: 'comedy', label: 'Genre: Comedy'},
                    {value: 'history', label: 'Genre: History'},
                    {value: 'drama', label: 'Genre: Drama'},
                    {value: 'war', label: 'Genre: War'},
                    {value: 'thriller', label: 'Genre: Thriller'},
                    {value: '11', label: 'Rating > 8'},
                    {value: '22', label: 'Rating > 7'},
                    {value: '33', label: 'Rating > 6'},
                    {value: '44', label: 'Rating > 5'},
                    {value: '55', label: 'Rating > 4'},
                    {value: '66', label: 'Release Date > 2010'},
                    {value: '77', label: 'Realease Date > 2000'},
                    {value: '88', label: 'Release Date < 2000'},
                    {value: '99', label: 'Release Date < 1970'}]
                  }/>
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
