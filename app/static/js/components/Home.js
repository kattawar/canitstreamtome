import React from 'react';
import {Carousel, Container, Slide} from 'react-bootstrap';

var imageStyles = {
	height: "850:px",
	width: "1700px";
}

class Home extends React.Component {
	render() {
		return (
			<div>

				<Carousel controls={false}>
					<Carousel.Item>
						<img class="center-block" alt="900x500"
								src="/static/img/usa.png" />
					</Carousel.Item>
					<Carousel.Item>
						<img class="center-block" alt="900x500"
								src="/static/img/brazil.png" />
					</Carousel.Item>
					<Carousel.Item>
						<img class="center-block" alt="900x500"
								src="/static/img/germany.png" />
					</Carousel.Item>
				</Carousel>

			</div>

		);
	}
}