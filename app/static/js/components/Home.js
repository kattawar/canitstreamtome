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

				<Carousel controls={true}>
					<Carousel.Item>
						<img class="center-block" alt="900x500"
								src="/static/img/usa.png"
								style={imageStyles} />
					</Carousel.Item>
					<Carousel.Item>
						<img class="center-block" alt="900x500"
								src="/static/img/brazil.png"
								style={imageStyles} />
					</Carousel.Item>
					<Carousel.Item>
						<img class="center-block" alt="900x500"
								src="/static/img/germany.png"
								style={imageStyles} />
					</Carousel.Item>
				</Carousel>

				<div>
					<h1 style={headerStyle}><b>CanItStreamToMe</b></h1>
				</div>
			</div>


		);
	}
}

export default Home;