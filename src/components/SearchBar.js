import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        input: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit = (eventKey) => {
      eventKey.preventDefault();
      //var endPoint = this.state.input;
      //this.props.history.push("/search?q=" + endPoint);
  };

  render() {
  	return (
      <div>
        //<form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl type="text" placeholder="Search" />
          </FormGroup>{' '}
          <Link to={{pathname: `/search`}}>
          <button className="btn btn-default" type="submit">
            <i className="glyphicon glyphicon-search"/>
          </button>
          </Link>
        //</form>
      </div>
    );
  }
}

export default SearchBar;
