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
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/streaming_service/${service}`;
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
    let priceBasic = "";
    let priceStandard = "";
    let pricePremium = "";
    if (this.state.serviceItem.pricing) {
      console.log(this.state.serviceItem.pricing['basic']);
      priceBasic = "Basic: " +String(this.state.serviceItem.pricing['basic']);
      priceStandard = "Standard: " +String(this.state.serviceItem.pricing['standard']);
      pricePremium = "Premium: " +String(this.state.serviceItem.pricing['premium']);
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
            <h4>Pricing</h4>
            <p>
              {priceBasic}<br></br>
              {priceStandard}<br></br>
              {pricePremium}
            </p>
            <h4>Top Countries That Use {this.state.serviceItem.name}</h4>
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
            <h4>Top Movies on {this.state.serviceItem.name}</h4>
            <p>
              <ol>
                {
                  this.state.movies.slice(0,10).map(item => <li>
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
          </div>
        </div>
      </div>
    </div>);
  }
}

export default ServiceInstance;
