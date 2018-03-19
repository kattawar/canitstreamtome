import React from 'react';
import '../movie-details.css';

var rowStyle = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  marginTop: 20,
  marginBottom: 20,


  // 'ms' is the only lowercase vendor prefix
};
class MovieInstance extends React.Component {



  state = {
    movieItem: {}
  }

  componentDidMount() {
    const movie = this.props.location.state.item.item;
    this.setState({movieItem: movie});
  }

  render() {
    return (
      <div className="container">
      <div className="row" style={rowStyle}>

          <div className="col-sm-4">
            <img className="img-responsive" src={this.state.movieItem.poster_url} alt=""/>
          </div>
          <div className="col-sm-8">
            <h3 className="display-4">
              {this.state.movieItem.title}</h3>
              <hr></hr>

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
      <div className="row" style={rowStyle}>

          <div className="col">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe title="vid" className="embed-responsive-item" src="https://www.youtube.com/embed/gCcx85zbxz4?rel=0" allowfullscreen="allowfullscreen"></iframe>
            </div>
          </div>
        </div>


    </div>);
  }
}

export default MovieInstance;
