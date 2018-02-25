import React from 'react';

export class ModelGrid extends React.Component {
	render() {
		return (
			<section>
			<div class="container">
			<div class="row align-items-center">
				<ModelItem ref="/movie1" src="/static/img/br.png" alt="" />
				<ModelItem ref="/movie2" src="/static/img/toy.png" alt="" />
				<ModelItem ref="/movie3" src="/static/img/tgf.png" alt="" />
				<ModelItem ref="/movie4" src="/static/img/ww.png" alt="" />
			</div>
			</div>
			</section>
		);

	}
}

export class ModelItem extends React.Component {
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

