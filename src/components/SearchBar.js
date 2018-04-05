import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        input: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

handleChange = (eventKey) => {
  this.setState({input: eventKey.target.value});
}

  handleSubmit = (eventKey) => {
      eventKey.preventDefault();
      var endPoint = this.state.input;
      this.props.history.push("/search?value=" + endPoint);
  };

  render() {
  	return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              value={this.state.input}
              placeholder="Search"
              onChange={this.handleChange}
              />

          </FormGroup>{' '}
        </form>
      </div>
    );
  }
}

export default withRouter(SearchBar);
