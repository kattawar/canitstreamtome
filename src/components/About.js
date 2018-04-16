import React from 'react';
import '../about.css';
import erin_hs from '../img/erin_headshot.png';
import nick_hs from '../img/nick_lavigne.jpeg';
import kevin_hs from '../img/kevin-headshot.jpg';
import jordan_hs from '../img/jordan_howe.jpg';
import zach_hs from '../img/zach.png';

import axios from 'axios';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jordan_commits: 0,
      zach_commits: 0,
      erin_commits: 0,
      nick_commits: 0,
      kevin_commits: 0,
      jordan_issues: 0,
      zach_issues: 0,
      erin_issues: 0,
      nick_issues: 0,
      kevin_isues: 0,
    }
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    let url = 'https://api.github.com/repos/kattawar/canitstreamtome/stats/contributors';

    axios.get(url).then(res => {
      const commitData = res.data;
      this.setState({jordan_commits: commitData[1]['total'], zach_commits: commitData[0]['total'] + commitData[2]['total'],
        erin_commits: commitData[3]['total'],
        nick_commits: commitData[4]['total'],
        kevin_commits: commitData[5]['total'],
      })
    }).catch(error => {
      console.log(error);
    })
		url = 'https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=QuantumSoundings&state=all';
    axios.get(url).then(res => {
      const jordan_data = res.data;
      this.setState({jordan_issues: jordan_data.length})
    })
    url = 'https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=kattawar&state=all';
    axios.get(url).then(res => {
      const zach_data = res.data;
      this.setState({zach_issues: zach_data.length})
    })
    url = 'https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=erinjensby&state=all';
    axios.get(url).then(res => {
      const erin_data = res.data;
      this.setState({erin_issues: erin_data.length})
    })
    url = 'https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=nico1utaustin&state=all';
    axios.get(url).then(res => {
      const nick_data = res.data;
      this.setState({nick_issues: nick_data.length})
    })
    url = 'https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=kevinsalcedo&state=all';
    axios.get(url).then(res => {
      const kevin_data = res.data;
      this.setState({kevin_issues: kevin_data.length})
    })
  }

  render() {
    return (<div>
      <section>
        <div className="container text-center">
          <div className="p-4">
            <h3 className="display-3">APPROVE US, INC. MEMBERS</h3>
          </div>
        </div>
      </section>

      <section align-items-center>
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-4">
              <img className="img-responsive" src={erin_hs} alt=""></img>
              <h4>Erin Jensby</h4>
              <p>This is my last semester at UT majoring in Computer Science. Outside of school I love to be outdoors, hang out with puppers, and eat pizza.</p>
              <p>Major Responsibilities: Front-End CSS & HTML</p>
              <p>No. Commits: {this.state.erin_commits}</p>
              <p>No. Issues: {this.state.erin_issues}</p>
              <p>No. Unit Tests: 25</p>
            </div>
            <div className="col-sm-4">
              <img className="img-responsive" src={nick_hs} alt=""></img>
              <h4>Nick Lavigne</h4>
              <p>I am a senior studying computer science at UT Austin. I hope to one day go into web development or mobile development. I am also an avid basketball fan, go Bulls!</p>
              <p>Major Responsibilities: Front End CSS/HTML React</p>
              <p>No. Commits: {this.state.nick_commits}</p>
              <p>No. Issues: {this.state.nick_issues}</p>
              <p>No. Unit Tests: 0</p>
            </div>
            <div className="col-sm-4">
              <img className="img-responsive" src={kevin_hs} alt=""></img>
              <h4>Kevin Salcedo</h4>
              <p>I am a student at the University of Texas and I enjoy rock climbing in my free time when I'm not coding.</p>
              <p>Major Responsibilities: Front End/React</p>
              <p>No. Commits: {this.state.kevin_commits}</p>
              <p>No. Issues: {this.state.kevin_issues}</p>
              <p>No. Unit Tests: 2</p>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-4">
              <img src={zach_hs} alt=""></img>
              <h4>Zach Kattawar</h4>
              <p>I am currently a college student at the University of Texas studying computer science. In my free time I enjoy making electronic music and playing video games.</p>
              <p>Major Responsibilities: Flask and Deployment</p>
              <p>No. Commits: {this.state.zach_commits}</p>
              <p>No. Issues: {this.state.zach_issues}</p>
              <p>No. Unit Tests: 0</p>
            </div>
            <div className="col-sm-4">
              <img src={jordan_hs} alt=""></img>
              <h4>Jordan Howe</h4>
              <p>I'm a senior at the University of Texas at Austin studying Computer Science and Music major.</p>
              <p>Major Responsibilities: Database and API</p>
              <p>No. Commits: {this.state.jordan_commits}</p>
              <p>No. Issues: {this.state.jordan_issues}</p>
              <p>No. Unit Tests: 44</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="p-4">
              <div className="col-sm-6">
              <h3 className="display-3">PURPOSE</h3>
              <p>Canitstreamto.me provides the most talked about shows and films on streaming services right now! Not only can you see what the hottest works are in you own country, you can see what is popular across the world. With thousands of options online of what to watch next, we want to give our users information on what is being talked about everywhere! Our intended users are media subscribers across the world.</p>
              </div>
              <div className="col-sm-6">
              <h3 className="display-3">HOW WE'RE DIFFERENT</h3>
              <p>By looking at Twitter and Google Trends for data on the popularity of streaming shows and film we don’t just show what got the best reviews, or what everyone loves. We show what everyone can’t stop talking about. Whether it is what they love to binge on, what has the biggest controversy, what they love to hate, or what is plainly the best.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container text-center">
          <div className="p-4">
          <div className="col-sm-6">
            <h3 className="display-3">TOOLS</h3>
            <p>Slack: team communication and Github updates</p>
            <p>GitBook: collaborative writing</p>
            <p>Github: version control and collaboration</p>
            <p>NameCheap: free domains</p>
            <p>AWS: web hosting</p>
            <p>S3: hosting our front-end</p>
            <p>Flask: backend framework</p>
            <p>Bootstrap: templates for site design</p>
            <p>React: creating dynamic components</p>
            <p>Selenium: testing our GUI</p>
            <p>Mocha: front-end unit testing</p>
            <p>Postman: API design and testing</p>
          </div>
          <div className="col-sm-6">
            <h3 className="display-3">DATA</h3>
            <p><a href="https://developers.themoviedb.org/3/getting-started/introduction">
              The Movie DB API</a>: provides our data for the details of each movie</p>
            <p><a href="https://developer.twitter.com/en/docs">
              Twitter API</a>: provides a twitter feed for relevent tweets to each movie</p>
            <p><a href="https://github.com/GeneralMills/pytrends">
              Pseudo API for Google Trends</a>: provides data for which countries are searching</p>
            <p>for a particular streaming service or movie the most</p>
            <p><a href="hhttps://api.guidebox.com/docs/key">
              Guidebox API</a>: provides data for which movies each streaming service provides</p>
            <p><a href="https://restcountries.eu/">
              REST Countries</a>: provides flag images and details for each country</p>
              <h3 className="display-3">STATS</h3>
              <p>Total No. Commits: {this.state.jordan_commits + this.state.zach_commits + this.state.erin_commits + this.state.nick_commits + this.state.kevin_commits}</p>
              <p>Total No. Issues: {this.state.jordan_issues + this.state.zach_issues + this.state.erin_issues + this.state.nick_issues + this.state.kevin_issues}</p>
              <p>Total No. Unit Tests: 65</p>
          </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container text-center">
          <h3 className="display-3">LINKS</h3>
          <p></p>
          <p>
            <a href="https://kevinsalcedo.gitbooks.io/report/content/">Technical Report</a>
          </p>
          <p></p>
          <p>
            <a href="https://github.com/kattawar/canitstreamtome">GitHub Repo</a>
          </p>
          <p>
            <a href="https://kevinsalcedo.gitbooks.io/api/content/">API Documentation</a>
          </p>
        </div>
      </section>

    </div>);
  }
}

export default About;
