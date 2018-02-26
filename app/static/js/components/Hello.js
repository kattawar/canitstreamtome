import React from 'react';

export class ModelGrid extends React.Component {
		constructor(props) {
		super(props);
	}

	render() {
		

		return (
			<section>
			<div class="container">
			<div class="row align-items-center">
				{this.props.info}.map{function(index, photo) {
			return <ModelItem ref={`/${this.props.type}${index}`} src={`/static/img/${photo}`} />
		}
	}
			</div>
			</div>
			</section>
		);

	}
}

export class ModelItem extends React.Component {
		constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="col-sm-3">
				<a href={this.props.ref}>
					<img class="img-responsive" src={this.props.src} alt={this.props.alt} onClick={this.handleClick} />
				</a>
			</div>
		);
	}
}

