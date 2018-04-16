import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar.js'

class NavBarr extends React.Component {
  render() {
    return (<Navbar inverse="inverse" collapseOnSelect="collapseOnSelect">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">CanItStreamTo.me</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullLeft="pullLeft">
          <NavItem eventKey={1}>
            <Link to="/movie">Movies</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/streaming_service">Streaming Services</Link>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to="/country">Countries</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to="/about">About Us</Link>
          </NavItem>
        </Nav>
        <Navbar.Form pullRight="pullRight">
          <SearchBar/>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>);
  }
}

export default NavBarr;
