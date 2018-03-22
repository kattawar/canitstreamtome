import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../movie-details.css';

class MovieInstance extends React.Component {

  state = {
    movieItem: {},
    rank1: {},
    rank2: {},
    rank3: {},
    rank4: {},
    rank5: {}
  }

  componentDidMount() {
    const movie = this.props.location.state.item;
    let url = `https://cors-anywhere.herokuapp.com/http://api.canitstreamto.me/v1/movie/${movie}`;
    if (movie) {
      axios.get(url).then(res => {
        const item = res.data.data[0];
        this.setState({movieItem: item});
      });
      url = url + '/popularity';
      axios.get(url).then(res => {
        const rank = res.data.data;
        this.setState({rank1: rank[0]});
        this.setState({rank2: rank[1]});
        this.setState({rank3: rank[2]});
        this.setState({rank4: rank[3]});
        this.setState({rank5: rank[4]});
      })
    }
  }

  render() {
    console.log(this.state.movieItem);

    var movieUrl = String(this.state.movieItem.trailer_url);
    movieUrl = movieUrl.replace('watch?v=', 'embed/');
    console.log(movieUrl);
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
            <h4>Rating</h4>
            <p>{this.state.movieItem.rating}</p>
            <hr></hr>
            <h4>Desc</h4>
            <p>{this.state.movieItem.description}</p>
            <hr></hr>
            <h4>Cast</h4>
            <p>{this.state.movieItem.movie_cast}</p>
            <hr></hr>
            <h4>Popular Countries</h4>
            <p>
              <ol>
                <li>
                  <Link to={{
                      pathname: `/country/${this.state.rank1.country}`,
                      state: {
                        item: this.state.rank1.country
                      }
                    }}>
                    {this.state.rank1.country}
                  </Link>
                </li>
                <li>
                  <Link to={{
                      pathname: `/country/${this.state.rank2.country}`,
                      state: {
                        item: this.state.rank2.country
                      }
                    }}>
                    {this.state.rank2.country}
                  </Link>
                </li>
                <li>
                  <Link to={{
                      pathname: `/country/${this.state.rank3.country}`,
                      state: {
                        item: this.state.rank3.country
                      }
                    }}>
                    {this.state.rank3.country}
                  </Link>
                </li>
                <li>
                  <Link to={{
                      pathname: `/country/${this.state.rank4.country}`,
                      state: {
                        item: this.state.rank4.country
                      }
                    }}>
                    {this.state.rank4.country}
                  </Link>
                </li>
                <li>
                  <Link to={{
                      pathname: `/country/${this.state.rank5.country}`,
                      state: {
                        item: this.state.rank5.country
                      }
                    }}>
                    {this.state.rank5.country}
                  </Link>
                </li>
              </ol>
            </p>
            <hr></hr>
            <h4>Compatible Streaming Services</h4>
            <p>
              <a href="/service1">
                Hulu,</a>
              <a href="/service2">Netflix,</a>
              <a href="/service3">Amazon Video,</a>
              <a href="/service4">Epix</a>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="col">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe title="vid" className="embed-responsive-item" src={movieUrl} allowfullscreen="allowfullscreen"></iframe>
            </div>
          </div>
        </div>
      </div>

    </div>);
  }
}

export default MovieInstance;
