import React from 'react';

class NavBar extends React.Component {
	render() {
		return (
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
                  <li><a href="/">Home</a></li>
                  <li><a href="/movies">Movies</a></li>
                  <li><a href="/services">Streaming Services</a></li>
                  <li><a href="/countries">Countries</a></li>
                     <li><a href="/#about">About</a></li>
                </ul>
            </div>
          </div>
        </div>
    );
	}
}

export default NavBar;