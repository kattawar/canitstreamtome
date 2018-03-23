import React from 'react';
import {Link} from 'react-router-dom';
import '../movies.css';
import Pagination from "react-js-pagination";
import axios from 'axios';

function splitArray(input, spacing) {
  var output = [];

  for (var i = 0; i < input.length; i += spacing) {
    output[output.length] = input.slice(i, i + spacing);
  }

  return output;
}

export class ModelGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      activePage: 1
    };
    this.updateData(1);

  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.updateData(pageNumber);
  }

  updateData = (pageNumber) => {
    console.log(pageNumber);
    console.log("updatecalled");
    let url = "";

    url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/${this.props.type}?pagesize=24&pagenum=${pageNumber - 1}`;
    console.log(url)
    axios.get(url).then(res => {
      const instanceList = res.data;
      this.setState({data: instanceList});

    }).catch((error) => {
      console.log(error);
    });

  }

  render() {
    //6
    //1
    var totalItems = 0;
    if(String(this.props.type)==="movie"){
          totalItems=1120;
    }
    if(String(this.props.type)==="country"){
          totalItems=130;
    }
    if(String(this.props.type)==="streaming_service"){
          totalItems=24;
    }

    if (this.state.data.data) {
      const instanceGrouped = this.state.data.data;

      const instanceRows = splitArray(instanceGrouped, 6);

      console.log(this.state.data.data);

      return (<div>
        <section>
          <div className="container">
            {
              instanceRows.map(
                rowList => !rowList
                ? null
                : <div className="row">
                  {
                    rowList.map(item =>
                      <div className="col-sm-2" onClick={this.handleClick}>
                        <Link to={{
                            pathname: `/${this.props.type}/${item.name}`,
                            state: { item: item.id }
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
        <div className="text-center">
          <Pagination activePage={this.state.activePage} itemsCountPerPage={24} totalItemsCount={totalItems} pageRangeDisplayed={5} onChange={this.handlePageChange}/>
        </div>
      </div>);
    }
    return (<div></div>);

  }
}
