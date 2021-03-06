import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../movie-details.css';

class MovieInstance extends React.Component {

  state = {
    movieItem: {},
    rankings: [],
    streaming: [],
    movieUrl: ''
  }

  componentDidMount() {
    const movie = (this.props.location.pathname).split("/movie/").pop();
    let url = `http://api.canitstreamto.me/v2/movie/${movie}`;
    if (movie) {
      axios.get(url).then(res => {
        const item = res.data.data[0];
        this.setState({movieItem: item});
        var trailer = String(item.trailer_url);
        trailer = trailer.replace('watch?v=', 'embed/');
        this.setState({movieUrl: trailer});
      });
      let countryUrl = url + '/popularity';
      axios.get(countryUrl).then(res => {
        const rank = res.data.data;
        this.setState({rankings: rank});
      })
      let streamingUrl = url + '/streaming';
      axios.get(streamingUrl).then(res => {
        const stream = res.data.data;
        this.setState({streaming: stream});
      });
      this.setState({loading: false});
    }
  }

  render() {
      return (<div className="container">
        <div className="row">
          <div className="card">
            <h3 className="display-4">
              {this.state.movieItem.name}</h3>
            <hr></hr>
            <div className="col-sm-3">
              <img className="img-responsive" src={this.state.movieItem.image} alt=""/>
            </div>
            <div className="col-sm-8">
              <h4>Release Date</h4>
              <p>{this.state.movieItem.release_date}</p>
              <hr></hr>
              <h4>Rating</h4>
              <p>{this.state.movieItem.rating}</p>
              <hr></hr>
              <h4>Genre</h4>
              <p>{this.state.movieItem.genres}</p>
              <hr></hr>
              <h4>Desc</h4>
              <p>{this.state.movieItem.description}</p>
              <hr></hr>
              <h4>Cast</h4>
              <p>{this.state.movieItem.movie_cast}</p>
              <hr></hr>
              <h4>Trailer Link</h4>
              <p><a href={this.state.movieItem.trailer_url}>{this.state.movieItem.trailer_url}</a></p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
          <div className="card">
            <div className="col-sm-12">
              <h3>Top Trending In</h3>
              <hr></hr>
              <p>
                <ol>
                  {
                    this.state.rankings.map(item => <li key={item.id}>
                      <Link to={{
                          pathname: `/country/${item.id}`
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
              <h3>Compatible Streaming Services</h3>
              <hr></hr>
              <p>
                <ul>
                {
                  this.state.streaming.map(item => <li key={item.id}>
                    <Link to={{
                        pathname: `/streaming_service/${item.id}`
                      }}>{item.name}</Link>
                  </li>)
                }
              </ul>
              </p>
            </div>
          </div>
        </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="col">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="vid" className="embed-responsive-item" src={this.state.movieUrl} allowFullScreen="allowFullScreen"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default MovieInstance;
