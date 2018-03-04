import React from 'react';
import {Carousel, Container, Slide} from 'react-bootstrap';

var imageStyles = {
	height: "850:px",
	width: "1700px"
}

var headerStyle={
    fontSize: '300px',
    color: 'black',
    textDecoration: 'bold',
    textShadow: '2px 1px gray',
    textAlign: 'center',
    opacity: '0.0',
}

class Home extends React.Component {
	render() {
		return (

			<div>

<Carousel>
       <Carousel.Item>
      <header className="masthead text-center text-white">
        <div className="masthead-content">
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
          </div>
      <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>

    </header>

  </Carousel.Item>
  <Carousel.Item>
    <header className="masthead text-center text-white">
        <div className="masthead-content">
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
          </div>
      <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>

    </header>
  </Carousel.Item>
   <Carousel.Item>
    <header className="masthead text-center text-white">
        <div className="masthead-content">
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
          </div>
      <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>

    </header>
  </Carousel.Item>
   <Carousel.Item>
    <header className="masthead text-center text-white">
        <div className="masthead-content">
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
          </div>
      <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>

    </header>
  </Carousel.Item>
			</Carousel>;
    
			</div>


		);
	}
}

export default Home;