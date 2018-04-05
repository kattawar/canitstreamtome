import React from 'react';
import {Link} from 'react-router-dom';
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

export class CountriesGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      activePage: 1,
      selectedSort: '',
      selectedFilter: [],
      activeSort: 'name',
      activeDir: 'asc',
      activeFilters: [],
      realPage: 0
    };
    this.updateData();

  }

  handleChange = (selectedSort) => {
    this.setState({selectedSort});
    var dir = '';
    var sort = '';

    if (selectedSort) {

      switch (selectedSort.value) {
        case 'name_asc':
          sort = 'name'
          dir = 'asc'
          break;
        case 'name_desc':
          sort = 'name'
          dir = 'desc'
          break;
        case 'population_asc':
          sort = 'population'
          dir = 'asc'
          break;
        case 'population_desc':
          sort = 'population'
          dir = 'desc'
          break;
        default:
          console.log("HERE3");
      }
    } else {
      sort = 'name';
      dir = 'asc';
    }
    this.setState({activeDir: dir}, function() {
      this.setState({activeSort: sort}, function() {
        this.updateData();
      });
    });
    //  this.updateData();
  }

  handleFilter = (selectedFilter) => {
    this.setState({selectedFilter});
    var filters = [];
    var filter = '';
    if (selectedFilter) {
      if (selectedFilter.includes('en')) {
        filter = '"languages":["English","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('sp')) {
        filter = '"languages":["Spanish","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('ar')) {
        filter = '"languages":["Arabic","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('fr')) {
        filter = '"languages":["French","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('africa')) {
        filter = '"region":["Africa","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('americas')) {
        filter = '"region":["Americas","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('asia')) {
        filter = '"region":["Asia","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('europe')) {
        filter = '"region":["Europe","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('oceania')) {
        filter = '"region":["Oceania","%3D"]'
        filters.push(filter)
      }
    }

    this.setState({activeFilters: filters}, function() {
          this.setState({activePage: 1});
          this.setState({realPage: 0}, function() {
            this.updateData();
          });
    });
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
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
    console.log(this.state.activeDir);
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/country?pagesize=24&filter={${filters}}&sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}&pagenum=${this.state.realPage}`;
    //console.log(url);

    axios.get(url).then(res => {
      const instanceList = res.data;
      this.setState({data: instanceList});

    }).catch((error) => {
      console.log(error);
    });

  }

  render() {

    const {selectedSort} = this.state;
    const valueSort = selectedSort && selectedSort.value;
    const {selectedFilter} = this.state;
    const valueFilter = selectedFilter;
    //6
    //1
    var totalItems = 130;

    if (this.state.data.data) {
      const instanceGrouped = this.state.data.data;

      const instanceRows = splitArray(instanceGrouped, 6);

      console.log(this.state.data.data);

      return (<div>

        <div className="col-sm-3"></div>
        <div className="row">
          <div className="col-sm-3">
            <h4>Sort By</h4>
            <Select
              name="form-field-name"
              value={valueSort}
              onChange={this.handleChange}
              options={[
                {value: 'name_asc',label: 'Name: A-Z'},
                {value: 'name_desc',label: 'Name: Z-A'},
                {value: 'population_asc',label: 'Population: Low-High'},
                {value: 'population_desc',label: 'Population: High-Low'}
              ]}/>
          </div>
          <div className="col-sm-3">
            <h4>Filter By</h4>
            <Select
              name="form-field-name"
              multi={true}
              removeSelected={true}
              simpleValue
              value={valueFilter}
              onChange={this.handleFilter}
              options={[
                {value: 'en',label: 'Language: English'},
                {value: 'sp',label: 'Language: Spanish'},
                {value: 'ar',label: 'Language: Arabic'},
                {value: 'fr',label: 'Language: French'},
                {value: 'africa',label: 'Region: Africa'},
                {value: 'americas',label: 'Region: Americas'},
                {value: 'asia',label: 'Region: Asia'},
                {value: 'europe',label: 'Region: Europe'},
                {value: 'oceania',label: 'Region: Oceania'}
              ]}/>
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="country">
          <section>
            <div className="container">
              {
                instanceRows.map(
                  rowList => !rowList
                  ? null
                  : <div className="row">
                    {
                      rowList.map((item, i) => <div className="col-sm-2" onClick={this.handleClick}>
                        <OverlayTrigger trigger={['hover','focus']}
                          placement={i <= 2 ? "right" : "left"}
                          overlay={<Popover id="popover-trigger-hover-focus">
                            <strong>Population: </strong>
                            {Number(item.population).toLocaleString()}<br/>
                            <strong>Languages: </strong>
                            {item.languages}<br/>
                          </Popover>}>
                          <Link to={{
                              pathname: `/country/${item.name}`,
                              state: {
                                item: item.id
                              }
                            }}>
                            <div className="card">
                              <img src={item.image} alt=""/>
                              <h5 align="center">{item.name}</h5>
                            </div>
                          </Link>
                          </OverlayTrigger>
                      </div>)
                    }
                  </div>)
              }
            </div>
          </section>
        </div>
        <div className="text-center">
          <Pagination activePage={this.state.activePage} itemsCountPerPage={24} totalItemsCount={totalItems} pageRangeDisplayed={5} onChange={this.handlePageChange}/>
        </div>
      </div>);
    }
    return (<div></div>);
  }
}

export default CountriesGrid;
