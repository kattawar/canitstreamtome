import React from 'react';
import '../about.css';
import erin_hs from '../img/erin_headshot.png';
import nick_hs from '../img/nick_lavigne.jpeg';
import kevin_hs from '../img/kevin-headshot.jpg';
import jordan_hs from '../img/jordan_howe.jpg';
import zach_hs from '../img/zach.png';

class About extends React.Component {
	render() {
		return (
      <div>
			<section>
      <div className="container text-center">
        <div className="row align-items-center">
            <div className="p-4">
              <h3 className="display-4">PURPOSE</h3>
              <p>Canitstreamto.me provides the most talked about shows and films on streaming services right now!  Not only can you see what the hottest works are in you own country, you can see what is popular across the world.  With thousands of options online of what to watch next, we want to give our users information on what is being talked about everywhere!  Our intended users are media subscribers across the world.</p>
            </div>
        </div>
      </div>
    </section>


    <section>
      <div className="container text-center">
        <div className="row align-items-center">
            <div className="p-4">
              <h3 className="display-4">HOW WE'RE DIFFERENT</h3>
              <p>By looking at twitter for data on the popularity of streaming shows and film we don’t just show what got the best reviews, or what everyone loves.  We show what everyone can’t stop talking about.  Whether it is what they love to binge on, what has the biggest controversy, what they love to hate, or what is plainly the best.</p>
            </div>
        </div>
      </div>
    </section>


    <section>
      <div className="container text-center">
            <div className="p-4">
              <h3 className="display-4">ACCEPT US, INC. MEMBERS</h3>
            </div>
      </div>
    </section>

    <section>
      <div className="container text-center">
              <div className="row">
              <div className="col-sm-4">
              <img class="img-responsive" src={erin_hs} alt=""></img>
                <h4>Erin Jensby</h4>
                <p>This is my last semester at UT majoring in Computer Science. Outside of school I love to be outdoors, hang out with puppers, and eat pizza.</p>
                <p>Major Responsibilities: Front-End CSS & HTML</p>
                <p>No. Commits: </p>
                <p>No. Issues: </p>
                <p>No. Unit Tests: </p>
              </div>
              <div className="col-sm-4">
              <img class="img-responsive" src={nick_hs} alt=""></img>
                <h4>Nick Lavigne</h4>
                <p>I am a senior studying computer science at UT Austin. I hope to one day go into web development or mobile development. I am also an avid basketball fan, go Bulls!</p>
                <p>Major Responsibilities: Front End CSS/HTML React</p>
                <p>No. Commits: </p>
                <p>No. Issues: </p>
                <p>No. Unit Tests: </p>
              </div>
              <div className="col-sm-4">
              <img class="img-responsive" src={kevin_hs} alt=""></img>
                <h4>Kevin Salcedo</h4>
                <p>I am a student at the University of Texas and I enjoy rock climbing in my free time when I'm not coding.</p>
                <p>Major Responsibilities: Frontend</p>
                <p>No. Commits: </p>
                <p>No. Issues: </p>
                <p>No. Unit Tests: </p>
              </div>

        </div>
      </div>
    </section>

    <section>
        <div className="container text-center">
              <div className="row">
              <div className="col-sm-4">
              <img  src={zach_hs} alt=""></img>
              <h4>Zach Kattawar</h4>
              <p>I am currently a college student at the University of Texas studying computer science. In my free time I enjoy making electronic music and playing video games.</p>
              <p>Major Responsibilities: Flask and Deployment</p>
              <p>No. Commits:</p>
              <p>No. Issues: </p>
              <p>No. Unit Tests: 0</p>
              </div>
              <div class="col-sm-4">
              <img  src={jordan_hs} alt=""></img>
              <h4>Jordan Howe</h4>
              <p>I'm a senior at the University of Texas at Austin studying Computer Science and Music major.</p>
              <p>Major Responsibilities: Database and API</p>
              <p>No. Commits:</p>
              <p>No. Issues: </p>
              <p>No. Unit Tests: 0</p>
              </div>
              </div>
        </div>
    </section>

    <section>
      <div className="container text-center">
            <div className="p-4">
              <h3 className="display-4">STATS</h3>
              <p>Total No. Commits: </p>
              <p>Total No. Issues:</p>
              <p>Total No. Unit Tests: 0</p>
            </div>
      </div>
    </section>

    <section>
      <div className="container text-center">
            <div className="p-4">
              <h3 className="display-4">DATA</h3>
              <p>Our data is drawn from several differnet REST API sites. We get most of our movie date from <a href="https://developers.themoviedb.org/3/getting-started/introduction"> MovieDB API</a>. Our country data comes from the <a href="https://www.cia.gov/library/publications/the-world-factbook/docs/faqs.html">CIA factbook API</a>. We also scrape twitter trending movies with the <a href="https://developer.twitter.com/en/docs">Twitter API</a> to get most popular movies in a country. The streaming service compatability comes from the <a href="https://api.guidebox.com/docs/key">Guidebox API</a>.
              </p>
            </div>
      </div>
    </section>

    <section>
      <div className="container text-center">
            <div className="p-4">
              <h3 className="display-4">TOOLS</h3>
              <p>Slack: team communication and Github updates</p>
              <p>Flask: backend framework</p>
              <p>Github: version control and collaboration</p>
              <p>Bootstrap: templates for site design</p>
              <p>GitBook: collaborative writing</p>
              <p>NameCheap: free domains</p>
              <p>AWS: web hosting</p>
            </div>
      </div>
    </section>

    <section>
      <div className="container text-center">
              <h3 className="display-4">LINKS</h3>
              <p></p>
              <p> <a href="https://www.gitbook.com/book/kevinsalcedo/report/welcome">GitBook Report</a> </p>
              <p></p>
              <p> <a href="https://github.com/kattawar/canitstreamtome">GitHub Repo</a> </p>
      </div>
    </section>


   
     
   


      </div>
		);
	}
}

export default About;
