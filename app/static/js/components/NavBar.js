import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBarr extends React.Component {
	render() {
		return (
<<<<<<< HEAD
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1 className="title-nav" onClick={console.log('clicked')}>CanItStreamToMe</h1>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
            </div>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/Movies">Movies</Link></li>
                  <li><Link to="/services">Streaming Services</Link></li>
                  <li><Link to="/countries">Countries</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
            </div>
          </div>
        </div>
=======
       <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="#">
        Link
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link
      </NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Link Right
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link Right
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
>>>>>>> 047f7c85cb83ac7ee3248f1f7fa55bcde40b5a4a
    );
	}
}

export default NavBarr;