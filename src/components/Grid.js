import React from 'react';

export class ModelGrid extends React.Component {


	render() {
		const movieList = this.props.info;

		return (
			<section>
			<div className="container">
			<div className="row align-items-center">
				{movieList.map(function(value){
					return <ModelItem key={value} src={`/${value}`} alt="" />
				})}
			</div>
			</div>
			</section>
		);

	}
}

export class ModelItem extends React.Component {


	render() {
		return (
			<div className="col-sm-3">
				<img className="img-responsive" src={this.props.src} alt={this.props.alt} />
			</div>
		);
	}
}

