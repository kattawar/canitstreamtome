import React from 'react';
import {
  Link
} from 'react-router-dom';
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

export class MovieGrid extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        offset: 0,
        data: [],
        activePage: 1,
        selectedOption: '',
        activeSort: 'title',
        activeDir: 'asc',
        activeFilter: '',
        activeValue: '',
        activeComparison: '',
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
        this.setState({
          activeDir: dir
        }, function() {
          this.setState({
            activeSort: sort
          }, function() {
            this.setState({
              activePage: 1
            });
            this.setState({
              realPage: 0
            }, function() {
              this.updateData();
            });



          });
        });
      }


      //  this.updateData();
    }


    handleFilterChange = (selectedOption) => {
      console.log("FILTER");
      this.setState({
        selectedOption
      });
      var filter = '';
      var value = '';
      var comparison = '';
      if (selectedOption) {
        switch (selectedOption.value) {
          case '11':

            filter = 'rating';
            value = '8';
            comparison = '>=';


            break;
          case '22':

            filter = 'rating';
            value = '7';
            comparison = '>=';


            break;
          case '33':

            filter = 'rating';
            value = '6';
            comparison = '>=';


            break;
          case '44':

            filter = 'rating';
            value = '5';
            comparison = '>=';


            break;

          case '55':

            filter = 'rating';
            value = '4';
            comparison = '>=';


            break;
          case '66':

            filter = 'release_date';
            value = '2010-01-01';
            comparison = '>=';


            break;
          case '77':

            filter = 'release_date';
            value = '2000-01-01';
            comparison = '>=';


            break;
          case '88':

            filter = 'release_date';
            value = '2000-01-01';
            comparison = '<=';


            break;
          case '99':

            filter = 'release_date';
            value = '1970-01-01';
            comparison = '<=';


            break;

          default:
            console.log("HERE3");

        }
        this.setState({
          activeFilter: filter
        }, function() {
          this.setState({
            activeValue: value
          }, function() {
            this.setState({
              activeComparison: comparison
            }, function() {
              this.setState({
                activePage: 1
              });
              this.setState({
                realPage: 0
              }, function() {
                this.updateData();
              });
            });


          });
        });
      }


      //  this.updateData();
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

      let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/movie?pagesize=24&filter=${this.state.activeFilter}&value=${this.state.activeValue}&comparison=${this.state.activeComparison}&sortby=${this.state.activeSort}&sortdir=${this.state.activeDir}&pagenum=${this.state.realPage}`;
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

        const {
          selectedOption
        } = this.state;
        const value = selectedOption && selectedOption.value;
        //6
        //1
        var totalItems = 1120;

        if (this.state.data.data) {
          const instanceGrouped = this.state.data.data;

          const instanceRows = splitArray(instanceGrouped, 6);

          console.log(this.state.data.data);

          return ( < div >

              <
              div className = "col-sm-3" >
              <
              /div>

              <
              div className = "row" >
              <
              div className = "col-sm-3" >
              <
              h4 > Sort By < /h4> <
              Select name = "form-field-name"
              value = {
                value
              }
              onChange = {
                this.handleChange
              }
              options = {
                [{
                    value: '1',
                    label: 'Title A-Z'
                  },
                  {
                    value: '2',
                    label: 'Title Z-A'
                  },
                  {
                    value: '3',
                    label: 'Rating High-Low'
                  },
                  {
                    value: '4',
                    label: 'Rating Low-High'
                  },
                  {
                    value: '5',
                    label: 'Release Date Newest-Oldest'
                  },
                  {
                    value: '6',
                    label: 'Release Date Oldest-Newest'
                  },
                ]
              }
              /> <
              /div>

              <
              div className = "col-sm-3" >
              <
              h4 > Filter By < /h4> <
              Select name = "form-field-name2"
              value = {
                value
              }
              onChange = {
                this.handleFilterChange
              }
              options = {
                [{
                    value: '11',
                    label: 'Rating > 8'
                  },
                  {
                    value: '22',
                    label: 'Rating > 7'
                  },
                  {
                    value: '33',
                    label: 'Rating > 6'
                  },
                  {
                    value: '44',
                    label: 'Rating > 5'
                  },
                  {
                    value: '55',
                    label: 'Rating > 4'
                  },
                  {
                    value: '66',
                    label: 'Release Date > 2010'
                  },
                  {
                    value: '77',
                    label: 'Realease Date > 2000'
                  },
                  {
                    value: '88',
                    label: 'Release Date < 2000'
                  },
                  {
                    value: '99',
                    label: 'Release Date < 1970'
                  },
                ]
              }
              /> <
              /div> <
              div className = "col-sm-2" >
              <
              /div>

              <
              /div>

              <
              div className = "movie" >
              <
              section >

              <
              div className = "container" > {
                instanceRows.map(
                  rowList => !rowList ?
                  null :
                  < div className = "row" > {
                    rowList.map(item =>
                      <
                      div className = "col-sm-2"
                      onClick = {
                        this.handleClick
                      } >
                      <
                      Link to = {
                        {
                          pathname: `/movie/${item.name}`,
                          state: {
                            item: item.id
                          }
                        }
                      } >
                      <
                      div className = "card" >
                      <
                      img src = {
                        item.image
                      }
                      alt = "" / >
                      <
                      h5 align = "center" > {
                        item.name
                      } < /h5> <
                      /div> <
                      /Link> <
                      /div>)
                    } <
                    /div>)
                  }

                  <
                  /div>

                  <
                  /section> <
                  /div>

                  <
                  div className = "text-center" >
                  <
                  Pagination activePage = {
                    this.state.activePage
                  }
                  itemsCountPerPage = {
                    24
                  }
                  totalItemsCount = {
                    totalItems
                  }
                  pageRangeDisplayed = {
                    5
                  }
                  onChange = {
                    this.handlePageChange
                  }
                  /> <
                  /div> <
                  /div>);
                }
                return ( < div > < /div>);

                }
              }

              export default MovieGrid;
