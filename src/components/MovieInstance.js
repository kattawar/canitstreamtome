import React from 'react';
import '../movie-details.css';
class MovieInstance extends React.Component {

  state = {
    movieItem: {}
  }

  componentDidMount() {
    const movie = this.props.location.state.item.item;
    this.setState({movieItem: movie});
  }

  render() {
    return (<div class="container">
      <div class="row">
        <div class="card">
          <div class="col-lg-4">
            <img class="img-responsive" src={this.state.movieItem.poster_url} alt=""/>
          </div>
          <div class="col-lg-8">
            <h3 class="display-4">
              {this.state.movieItem.title}</h3>

            <h4>Rating</h4>
            <p>{this.state.movieItem.rating}</p>
            <h4>Desc</h4>
            <p>{this.state.movieItem.description}</p>
            <h4>Cast</h4>
            <p>{this.state.movieItem.movie_cast}</p>
            <h4>Popular Countries</h4>
            <p>
              <a href="/country1">USA,</a>
              <a href="/country2">Brazil,</a>
              <a href="/country3">Germany,</a>
              <a href="/country4">South Korea</a>
            </p>
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
      <div class="row">
        <div class="card">
          <div class="col">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe title="vid" class="embed-responsive-item" src="https://www.youtube.com/embed/gCcx85zbxz4?rel=0" allowfullscreen="allowfullscreen"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default MovieInstance;
