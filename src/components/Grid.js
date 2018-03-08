import React from 'react';

function splitArray(input, spacing) {
    var output = [];

    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
}

export class ModelGrid extends React.Component {


	render() {
		const movieList = this.props.info;
		const movieGrouped = splitArray(movieList, 3);

		return (
			<section>
			<div className="container">
				{movieGrouped.map(rowList =>
					!rowList ? null :
					<div className="row">
						{rowList.map(movie =>
							<div className="col-sm-4">
								<img src={movie} alt=""/>
							</div>
						)}
					</div>
					)}

			</div>
			</section>
		);

	}
}


