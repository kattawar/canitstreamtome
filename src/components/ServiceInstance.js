import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../movie-details.css';
class ServiceInstance extends React.Component {

  state = {
    serviceItem: {},
    rankings: [],
    movies: []
  }

  componentDidMount() {
    const service = this.props.location.state.item;
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/streaming_service/${service}`;
    if (service) {
      axios.get(url).then(res => {
        const item = res.data.data[0];
        this.setState({serviceItem: item});
      });

      let popUrl = url + '/popcountry';
      axios.get(popUrl).then(res => {
        const rank = res.data.data;
        this.setState({rankings: rank});
      });

      let movieUrl = url + '/movie';
      axios.get(movieUrl).then(res => {
        const movie = res.data.data;
        this.setState({movies: movie});
      });
    }
  }

  render() {

    let prices = {};
    if (this.state.serviceItem.pricing) {
      for (let key in this.state.serviceItem.pricing) {
        prices[key] = this.state.serviceItem.pricing[key];
      }
    }

    return (<div className="container">
      <div className="row">
        <div className="card">
          <h3 className="display-4">
            {this.state.serviceItem.name}
          </h3>
          <hr/>
          <div className="col-sm-3">
            <img className="img-responsive" src={this.state.serviceItem.image} alt=""/>
          </div>
          <div className="col-sm-8">
            <h4>URL</h4>
            <p><a href={this.state.serviceItem.website}>{this.state.serviceItem.website}</a></p>
            <hr></hr>
            <h4>Pricing</h4>
            <p>
              <ul>
                {Object.keys(prices).map(tier => (
                  <li>{tier} : {prices[tier]}</li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      </div>
            <div className="row">
        <div className="col-sm-6">
        <div className="card">
          <div className="col-sm-12">
            <h3>Top Countries That Use {this.state.serviceItem.name}</h3>
            <hr></hr>
            <p>
              <ol>
                {
                  this.state.rankings.map(item => <li>
                    <Link to={{
                        pathname: `/country/${item.country}`,
                        state: {
                          item: item.id
                        }
                      }}>{item.country}</Link>
                  </li>)
                }
              </ol>
            </p>
          </div>
        </div>
        </div>
        <div className="col-sm-6">
        <div className="card">
          <div className="col-sm-12">
            <h3>Top Movies on {this.state.serviceItem.name}</h3>
            <hr></hr>
            <p>
              <ol>
                {
                  this.state.movies.slice(0,10).map(item => <li>
                    <Link to={{
                        pathname: `/movie/${item.name}`,
                        state: {
                          item: item.id
                        }
                      }}>{item.name}</Link>
                  </li>)
                }
              </ol>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>);
  }
}

export default ServiceInstance;
