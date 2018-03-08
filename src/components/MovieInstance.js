import React from 'react';
import '../movie-details.css';
import br from '../img/br.png';

class MovieInstance extends React.Component {
	render() {
		return (

<div class="container">
      <div class="row">
        <div class="card">
          <div class="col-lg-4">
            <img class="img-responsive" src={br} alt=""/>
          </div>
          <div class="col-lg-8">
            <h3 class="display-4"> Blade Runner </h3>

            <h4>Rating</h4>
            <p>8.2/10 IMDB</p>
            <h4>Desc</h4>
            <p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>
            <h4>Cast</h4>
            <p>Ryan Gosling, Dave Bautista, Robin Wright, Mark Arnold</p>
            <h4>Popular Countries</h4>
            <p><a href="/country1">USA,</a> <a href="/country2">Brazil,</a> <a href="/country3">Germany,</a> <a href="/country4">South Korea</a></p>
            <h4>Compatible Streaming Services</h4>
            <p><a href="/service1"> Hulu,</a> <a href="/service2">Netflix,</a> <a href="/service3">Amazon Video,</a> <a href="/service4">Epix</a></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card">
          <div class="col">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe title="vid" class="embed-responsive-item" src="https://www.youtube.com/embed/gCcx85zbxz4?rel=0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
	}
}

export default MovieInstance;
