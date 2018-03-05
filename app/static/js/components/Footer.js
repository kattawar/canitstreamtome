import React from 'react';

const pStyle = {
	margin: 15
}
class Bottom extends React.Component {
	render() {
		return (
		<footer className="py-5 bg-black">
 			<div className="container">
    			<p className="text-center text-white medium" style={pStyle}>Copyright &copy; Approve Us, Inc. 2018</p>
  			</div>
		</footer>

		);
	}
}

export default Bottom;
