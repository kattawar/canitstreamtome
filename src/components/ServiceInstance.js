import React from 'react';
import '../movie-details.css';
import hulu from '../img/hulu-logo.png'
class ServiceInstance extends React.Component {

  state = {
    serviceItem: {}
  }

  componentDidMount() {
    const service = this.props.location.state.item.item;
    this.setState({serviceItem: service});
  }

  render() {
    return (<div className="container">
      <div className="row">
        <div className="card">
          <div className="col-lg-4">
            <img className="img-responsive" src={hulu} alt=""/>
          </div>
          <div className="col-lg-8">
            <h3 className="display-4">
              {this.state.serviceItem.name}</h3>

            <h4>Available Countries</h4>
            <p>{this.state.serviceItem.available_countries}</p>
            <h4>Pricing</h4>
            <p>{this.state.serviceItem.pricing}</p>
            <h4>Top Countries That Use {this.state.serviceItem.name}</h4>
            <p><ul><li>Placeholder</li></ul></p>
            <h4>Top Movies on {this.state.serviceItem.name}</h4>
            <p><ul><li>Placeholder</li></ul></p>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default ServiceInstance;
