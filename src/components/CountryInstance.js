import React from 'react';
import axios from 'axios';
import '../movie-details.css';
class CountryInstance extends React.Component {

  state = {
    countryItem: {}
  }

  componentDidMount() {
    const country = this.props.location.state.item;
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/country/${country}`;
    if (country) {
      axios.get(url).then(res => {
        this.setState({countryItem : res.data.data[0]});
      });
    }
  }

  render() {
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
            <p>{this.state.countryItem.population}</p>
              <hr></hr>
            <h4>Spoken Languages</h4>
            <p>{this.state.countryItem.languages}</p>
              <hr></hr>
            <h4>Top Streaming Services</h4>
            <p><ul><li>Placeholder</li></ul></p>
              <hr></hr>
            <h4>Top Movies</h4>
            <p><ul><li>Placeholder</li></ul></p>
              <hr></hr>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default CountryInstance;
