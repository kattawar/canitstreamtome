import React from 'react';
import {Carousel} from 'react-bootstrap';
import '../home.css';


class Home extends React.Component {
	render() {
		return (

			<div>



<header className="masthead text-center text-white">
 <div className="masthead-content">
 <div className="container">
<Carousel>
       <Carousel.Item>
      
       
            
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
           
          
   
    
  </Carousel.Item>
  <Carousel.Item>
    
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
        
    

   
  </Carousel.Item>
   <Carousel.Item>
    
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
        
    
 
  </Carousel.Item>
   <Carousel.Item>
    
            <div className="container">
              <h1 className="masthead-heading mb-0">Movies</h1>
              <h2 className="masthead-subheading mb-0">What's On?</h2>
              <a href="/movies" className="btn btn-primary btn-xl rounded-pill mt-5">Go</a>
            </div>
          
      

 
  </Carousel.Item>
			</Carousel>
      </div>
      
      </div>
      <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>
      </header>
      
    
			</div>


		);
	}
}

export default Home;