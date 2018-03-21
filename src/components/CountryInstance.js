import React from 'react';
import '../movie-details.css';
class CountryInstance extends React.Component {

  state = {
    countryItem: {}
  }

  componentDidMount() {
    const country = this.props.location.state.item.item;
    this.setState({countryItem: country});
  }

  render() {
    return (<div class="container">
      <div class="row">
        <div class="card">
          <div class="col-lg-4">
            <img class="img-responsive" src={this.state.countryItem.image} alt=""/>
          </div>
          <div class="col-lg-8">
            <h3 class="display-4">
              {this.state.countryItem.name}</h3>

            <h4>Population</h4>
            <p>{this.state.countryItem.population}</p>
            <h4>Spoken Languages</h4>
            <p>{this.state.countryItem.languages}</p>
            <h4>Top Streaming Services</h4>
            <p><ul><li>Placeholder</li></ul></p>
            <h4>Top Movies</h4>
            <p><ul><li>Placeholder</li></ul></p>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default CountryInstance;
