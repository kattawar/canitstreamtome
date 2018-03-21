import React from 'react';
import '../movie-details.css';


class MovieInstance extends React.Component {



  state = {
    movieItem: {}
  }

  componentDidMount() {
    const movie = this.props.location.state.item.item;
    console.log(this.props.location.state);

    this.setState({movieItem: movie});
  }

  render() {
    console.log(this.state.movieItem);

      var movieUrl = String(this.state.movieItem.trailer_url);
    movieUrl = movieUrl.replace('watch?v=','embed/');
      console.log(movieUrl);
    return (
      <div className="container">
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
              <a href="/country1">USA,</a>
              <a href="/country2">Brazil,</a>
              <a href="/country3">Germany,</a>
              <a href="/country4">South Korea</a>
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
