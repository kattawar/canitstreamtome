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
    <img width={900} height={500} alt="900x500" src="/static/img/brazil.png" />
    <Carousel.Caption>
      <h3>Welcome!</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="/static/img/usa.png" />
    <Carousel.Caption>
      <h3>Movies!</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="/static/img/germany.png" />
    <Carousel.Caption>
      <h3>Streaming Services!</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>;

    
			</div>


		);
	}
}

export default Home;