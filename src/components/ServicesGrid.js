import React from 'react';
import { Link } from 'react-router-dom';
import '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { splitArray } from './Utilities'

export class ServicesGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      activePage: 1,
      selectedOption: '',
      selectedOptionFilter: '',
      activeSort:'name',
      activeDir:'asc',
      realPage: 0,
      unfilteredData: []
    };
    this.updateData();

  }

  handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      var dir = '';
      var sort = '';
      if(selectedOption){
        switch(selectedOption.value) {
          case 'name asc':
            sort='name'
            dir='asc'
            break;
          case 'name desc':
            sort='name'
            dir='desc'
            break;
          default:
            console.log("default");
        }
        this.setState({activeDir: dir}, function () {
          this.setState({activeSort: sort}, function () {
            this.updateData();
          });
        });
      }
  }

  handleFilter = (selectedOptionFilter) => {
      this.setState({ selectedOptionFilter });
      var data = {"data": []}
      var idx = 0
      var service_inst = []
      var x = 0
      if(selectedOptionFilter){
        switch(selectedOptionFilter.value) {
          case 'filt free':
            for (x = 0; x < 21; x++) {
              service_inst = this.state.unfilteredData.data[x]
              if (service_inst.pricing.basic === 'Free') {
                data.data[idx] = service_inst;
                idx++
              }
            }
            break;
          case 'filt sub':
            for (x = 0; x < 21; x++) {
              service_inst = this.state.unfilteredData.data[x]
              if (service_inst.pricing.basic[0] === '$') {
                data.data[idx] = service_inst;
                idx++
              }
            }
            break;
          case 'filt rent':
            for (x = 0; x < 21; x++) {
              service_inst = this.state.unfilteredData.data[x]
              if (service_inst.pricing.basic === 'Pricing Varies') {
                data.data[idx] = service_inst;
                idx++
              }
            }
            break;
          case 'filt provider':
            for (x = 0; x < 21; x++) {
              service_inst = this.state.unfilteredData.data[x]
              if (service_inst.pricing.basic === 'Through Cable Provider') {
                data.data[idx] = service_inst;
                idx++
              }
            }
            break;
          default:
            console.log("default");
        }
        this.setState({data: data}, function () {
        });
      } else {
        this.setState({data: this.state.data}, function () {});
      }
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.setState({realPage: pageNumber-1}, function () {
      this.updateData();
    });

  }

  updateData = () => {
    let url =`https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/streaming_service?pagesize=18&sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}&pagenum=${this.state.realPage}`;

    axios.get(url).then(res => {
      const instanceList = res.data;
      this.setState({data: instanceList});
      this.handleFilter(this.state.selectedOptionFilter);
    }).catch((error) => {
      console.log(error);
    });

    let url2 =`https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/streaming_service?sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}`;

    axios.get(url2).then(res => {
      const instanceList = res.data;
      this.setState({unfilteredData: instanceList});
    }).catch((error) => {
      console.log(error);
    });

  }

  render() {

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    const { selectedOptionFilter } = this.state;
    const valueFilter = selectedOptionFilter && selectedOptionFilter.value;

    var totalItems = 24;

    if (this.state.data.data) {
      const instanceGrouped = this.state.data.data;

      const instanceRows = splitArray(instanceGrouped, 6);

      return (<div>

        <div className="col-sm-3">
        </div>

        <div className="row">
          <div className="col-sm-3">
            <h4>Sort By</h4>
              <Select
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                options={[
                  { value: 'name asc', label: 'Name A-Z' },
                  { value: 'name desc', label: 'Name Z-A' }
                ]}
              />
          </div>
          <div className="col-sm-3">
            <h4>Filter By</h4>
              <Select
                name="form-field-name"
                value={valueFilter}
                onChange={this.handleFilter}
                options={[
                  { value: 'filt free', label: 'Free services' },
                  { value: 'filt sub', label: 'Subscription services' },
                  { value: 'filt rent', label: 'Renting services' },
                  { value: 'filt provider', label: 'Through cable provider' }
                ]}
              />
          </div>
          <div className="col-sm-2">
          </div>

        </div>

        <div className="streaming_service">
        <section>

          <div className="container">
            {
              instanceRows.map(
                rowList => !rowList
                ? null
                : <div className="row">
                  {
                    rowList.map((item,i) =>
                      <div className="col-sm-2" onClick={this.handleClick}>
                        <OverlayTrigger trigger={['hover','focus']}
                          placement={i <= 2 ? "right" : "left"}
                          overlay={<Popover id="popover-trigger-hover-focus">
                            <strong>Pricing: </strong>
                            <ul>
                              {Object.keys(item.pricing).map(tier => (
                                <li>{tier} : {item.pricing[tier]}</li>
                              ))}
                            </ul>
                          </Popover>}>
                          <Link to={{
                              pathname: `/streaming_service/${item.id}`
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
          <Pagination activePage={this.state.activePage} itemsCountPerPage={18} totalItemsCount={totalItems} pageRangeDisplayed={5} onChange={this.handlePageChange}/>
        </div>
      </div>);
    }
    return (<div></div>);

  }
}

export default ServicesGrid;
