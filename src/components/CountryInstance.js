import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

class CountryInstance extends React.Component {

  state = {
    countryItem: {},
    movieranks: [],
    streamranks: []
  }

  componentDidMount() {
    let country = (this.props.location.pathname).split("/country/").pop();
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v2/country/${country}`;
    if (country) {
      axios.get(url).then(res => {
        this.setState({countryItem: res.data.data[0]});
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {

    const pop = Number(this.state.countryItem.population);
    let x = pop.toLocaleString()

    const lat1 = Number(this.state.countryItem.latitude);
    const long1 =Number(this.state.countryItem.longitude);

if(this.state.countryItem.latitude){
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
            <h4>Region</h4>
            <p>{this.state.countryItem.region}</p>
            <hr></hr>
            <h4>Spoken Languages</h4>
            <p>{this.state.countryItem.languages}</p>
          </div>
        </div>
      </div>
            <div className="row">
        <div className="col-sm-6">
        <div className="card">
          <div className="col-sm-12">
            <h3>Top Streaming Services</h3>
            <hr></hr>
            <p>
              <ol>
                { this.state.streamranks.length === 0 ? <li>
                  <Link to={{
                      pathname: `/streaming_service/266`,
                      state: {
                        item: '266'
                      }
                    }}>Netflix</Link>
                </li> :
                  this.state.streamranks.map(item => <li>
                    <Link to={{
                        pathname: `/streaming_service/${item.name}`,
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
        <div className="col-sm-6">
        <div className="card">
          <div className="col-sm-12">
            <h3>Top Movies</h3>
            <hr></hr>
            <p>
              <ol>
                {
                  this.state.movieranks.length === 0 ? null : this.state.movieranks.slice(0, 10).map(item => <li>
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
      <div className="row">
      <div className= "card">
        <div className="test">

        <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyCDiHkgbdcRTJQnYPN0I_USDbkKUmKuYJE' }}
    zoom={6}
    center={[lat1,long1]}>

  </GoogleMapReact>
  </div>
        </div>
        </div>
    </div>);
  }
  return(<div></div>);
}

}

export default CountryInstance;
