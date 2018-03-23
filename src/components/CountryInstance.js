import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CountryInstance extends React.Component {

  state = {
    countryItem: {},
    movieranks: [],
    streamranks: []
  }

  componentDidMount() {
    const country = this.props.location.state.item;
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/country/${country}`;
    if (country) {
      axios.get(url).then(res => {
        this.setState({countryItem : res.data.data[0]});
      });
      let movieUrl = url + '/movie';
      axios.get(movieUrl).then(res => {
        const rank = res.data.data;
        this.setState({movieranks: rank});
      })
      let serviceUrl = url + '/streaming';
      axios.get(serviceUrl).then(res => {
        const rank = res.data.data;
        this.setState({streamranks: rank});
      })
    }
  }

  numberWithCommas = (x) => {
    console.log(x)
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {

    console.log(this.state.movies);
    const pop = Number(this.state.countryItem.population) ;
      let x = pop.toLocaleString()

    //console.log(String(pop.numberWithCommas));


    return (<div className="container">
      <div className="row">

        <div className="card">
            <h3 className="display-4">
              {this.state.countryItem.name}</h3>
              <hr></hr>
          <div className="col-sm-4">
            <img className="img-responsive" src={this.state.countryItem.image} alt=""/>
          </div>
          <div className="col-sm-8">

            <h4>Population</h4>
            <p>{x}</p>
              <hr></hr>
            <h4>Spoken Languages</h4>
            <p>{this.state.countryItem.languages}</p>
              <hr></hr>
            <h4>Top Streaming Services</h4>
            <p>
              <ol>
                {
                  this.state.streamranks.map(item => <li>
                    <Link to={{
                        pathname: `/streaming_service/${item.id}`,
                        state: {
                          item: item.id
                        }
                      }}>{item.name}</Link>
                  </li>)
                }
              </ol>
            </p>
              <hr></hr>
            <h4>Top Movies</h4>
            <p>
              <ol>
                {
                  this.state.movieranks.slice(0,10).map(item => <li>
                    <Link to={{
                        pathname: `/movie/${item.id}`,
                        state: {
                          item: item.id
                        }
                      }}>{item.name}</Link>
                  </li>)
                }
              </ol>
            </p>
              <hr></hr>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default CountryInstance;
