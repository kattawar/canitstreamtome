import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../movie-details.css';
class ServiceInstance extends React.Component {

  state = {
    serviceItem: {},
    rankings: []
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
        console.log(rank);
        this.setState({rankings : rank});
      });
    }
  }

  render() {
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
            <h4>Available Countries</h4>
            <p></p>
            <h4>Pricing</h4>
            <p>
              <ul>
              </ul>
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
              <ul>
                <li>Placeholder</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default ServiceInstance;
