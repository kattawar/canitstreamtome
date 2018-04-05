import React from 'react';
import {Link} from 'react-router-dom';
import '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const LANG_FILTERS = [
  {value: 'english',label: 'Language: English'},
  {value: 'spanish',label: 'Language: Spanish'},
  {value: 'arabic',label: 'Language: Arabic'},
  {value: 'french',label: 'Language: French'},
  {value: 'german',label: 'Language: German'},
  {value: 'dutch',label: 'Language: Dutch'}
]

const REGION_FILTERS = [
  {value: 'africa',label: 'Region: Africa'},
  {value: 'americas',label: 'Region: Americas'},
  {value: 'asia',label: 'Region: Asia'},
  {value: 'europe',label: 'Region: Europe'},
  {value: 'oceania',label: 'Region: Oceania'}
]

const REGION_FILTERS_DISABLED = [
  {value: 'africa',label: 'Region: Africa',disabled: true},
  {value: 'americas',label: 'Region: Americas',disabled: true},
  {value: 'asia',label: 'Region: Asia',disabled: true},
  {value: 'europe',label: 'Region: Europe',disabled: true},
  {value: 'oceania',label: 'Region: Oceania',disabled: true}
]

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
      realPage: 0,
      region_selected: false
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
    var languages = [];
    var region_selected = false

    if (selectedFilter) {
      if (selectedFilter.includes('english')) {
        filter = '"English","like"'
        languages.push(filter)
      }
      if (selectedFilter.includes('spanish')) {
        filter = '"Spanish","like"'
        languages.push(filter)
      }
      if (selectedFilter.includes('arabic')) {
        filter = '"Arabic","like"'
        languages.push(filter)
      }
      if (selectedFilter.includes('french')) {
        filter = '"French","like"'
        languages.push(filter)
      }
      if (selectedFilter.includes('german')) {
        filter = '"German","like"'
        languages.push(filter)
      }
      if (selectedFilter.includes('dutch')) {
        filter = '"Dutch","like"'
        languages.push(filter)
      }
      if (selectedFilter.includes('africa')) {
        this.setState({region_selected: true});
        region_selected = true
        filter = '"region":["Africa","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('americas')) {
        this.setState({region_selected: true});
        region_selected = true
        filter = '"region":["Americas","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('asia')) {
        this.setState({region_selected: true});
        region_selected = true
        filter = '"region":["Asia","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('europe')) {
        this.setState({region_selected: true});
        region_selected = true
        filter = '"region":["Europe","%3D"]'
        filters.push(filter)
      }
      if (selectedFilter.includes('oceania')) {
        this.setState({region_selected: true});
        region_selected = true
        filter = '"region":["Oceania","%3D"]'
        filters.push(filter)
      }
    }

    if (languages.length > 0) {
      var lang_filter = '"languages":[' + languages[0]
      var isFirst = true
      for (var lang in languages) {
        if (isFirst) {
          isFirst = false
        } else {
          lang_filter = lang_filter + ',' + languages[lang]
        }
      }
      lang_filter = lang_filter + ']'
      filters.push(lang_filter)
    }

    if (!region_selected) {
      this.setState({region_selected: false});
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
  }

  updateData = () => {
    this.setState({activePage: 1});
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
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/country?pagesize=1500&filter={${filters}}&sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}&pagenum=${this.state.realPage}`;
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

    var create_options = LANG_FILTERS
    if (this.state.region_selected) {
      create_options = create_options.concat(REGION_FILTERS_DISABLED)
    } else {
      create_options = create_options.concat(REGION_FILTERS)
    }

    const options = create_options



  var totalItems = 0;
    if (this.state.data.data) {
      const instanceGrouped = this.state.data.data;
      const instanceRows = splitArray(instanceGrouped, 6).slice(4*(this.state.activePage-1),4*(this.state.activePage-1)+3);
      totalItems=instanceGrouped.length;

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
              options={options}
            />
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
