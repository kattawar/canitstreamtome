import React from 'react';
import {Link} from 'react-router-dom';
import '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
      selectedFilter: '',
      activeSort: 'name',
      activeDir: 'asc',
      activeFilter: '',
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

    this.setState({
      activeDir: dir
    }, function() {
      this.setState({
        activeSort: sort
      }, function() {
        this.updateData();
      });
    });

    //  this.updateData();
  }

  handleFilter = (selectedFilter) => {
    this.setState({selectedFilter});
    var filter = '';
    var comparison = '';
    var value = '';
    let filterUrl = '';

    if (selectedFilter) {

      switch (selectedFilter.value) {
        case 'en':
          filter = 'languages'
          comparison = '%3D'
          value = 'English'

          break;
        case 'sp':
          filter = 'languages'
          comparison = '%3D'
          value = 'Spanish'

          break;
        case 'ar':
          filter = 'languages'
          comparison = '%3D'
          value = 'Arabic'

          break;
        case 'fr':
          filter = 'languages'
          comparison = '%3D'
          value = 'French'

          break;
        case 'africa':
          filter = 'region'
          comparison = '%3D'
          value = 'Africa'

          break;
        case 'americas':
          filter = 'region'
          comparison = '%3D'
          value = 'Americas'

          break;
        case 'asia':
          filter = 'region'
          comparison = '%3D'
          value = 'Asia'

          break;
        case 'europe':
          filter = 'region'
          comparison = '%3D'
          value = 'Europe'

          break;
        case 'oceania':
          filter = 'region'
          comparison = '%3D'
          value = 'Oceania'

          break;
        default:
          console.log("HERE3");

      }
      filterUrl = `&filter=${filter}&comparison=${comparison}&value=${value}`;
    } else {
      filterUrl = '';
    }
    this.setState({
      activeFilter: filterUrl
    }, function() {
      this.updateData();
    });

    //  this.updateData();
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
    console.log(this.state.activeDir);
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/country?pagesize=24&sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}&pagenum=${this.state.realPage}${this.state.activeFilter}`;
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
    const valueFilter = selectedFilter && selectedFilter.value;
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
            <h4>
              Sort By
            </h4>
            <Select name="form-field-name" value={valueSort} onChange={this.handleChange} options={[
                {
                  value: 'name_asc',
                  label: 'Name A-Z'
                }, {
                  value: 'name_desc',
                  label: 'Name Z-A'
                }, {
                  value: 'population_asc',
                  label: 'Population Low-High'
                }, {
                  value: 'population_desc',
                  label: 'Population High-Low'
                }
              ]}/>
          </div>

          <div className="col-sm-3">
            <h4>
              Filter By
            </h4>
            <Select name="form-field-name" value={valueFilter} onChange={this.handleFilter} options={[
                {
                  value: 'en',
                  label: 'Language - English'
                }, {
                  value: 'sp',
                  label: 'Language - Spanish'
                }, {
                  value: 'ar',
                  label: 'Language - Arabic'
                }, {
                  value: 'fr',
                  label: 'Language - French'
                }, {
                  value: 'africa',
                  label: 'Region - Africa'
                }, {
                  value: 'americas',
                  label: 'Region - Americas'
                }, {
                  value: 'asia',
                  label: 'Region - Asia'
                }, {
                  value: 'europe',
                  label: 'Region - Europe'
                }, {
                  value: 'oceania',
                  label: 'Region - Oceania'
                }
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
                      rowList.map(item => <div className="col-sm-2" onClick={this.handleClick}>
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
