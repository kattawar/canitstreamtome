import React from 'react';


class ModelRow extends React.Component {
	render() {
		return (
			<div class="row align-items-center" style="margin-top:50px; margin-bottom:50px">
				<ModelItem />
			</div>
		);

	}
}

class ModelItem extends React.Component {
	render() {
		return (
			<div class="col-sm-3">
				<a href="/movie1">
					<img class="img-responsive" src="/static/img/br.png" alt="" />
				</a>
			</div>
		);
	}
}

export default ModelItem;
