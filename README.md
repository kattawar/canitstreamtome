# canitstreamtome

Find connections between countries, movies and streaming services
## Features
- Our website features several different pages that allow you to gather up to date and relevent info on movies, streaming services, and the popularity of each.
- Our movies page displays all of the most popular movies and gives you the relevent info about each of them. You can then sort the movies by title, rating, and release date and filter
the results as well at the same time. We also support filtering on multiple criteria at the same time. 
- Our other pages such as the streaming services and the countries
also display cards in a similar fashion to the movies and allow to sort and filter on their respective values as well. 
- We also provide a search utility at the top of
our website that allows you to search all of the data models at once. The searches are case agnostic and partial and we rank the results by how relevent the given field is to the
data model. When a search is made a page will then be displayed with all of the models that matched the given search query and the given query will be highlighted in the models. You 
can then navigate through the three different models independently of eachother.
## Use Cases
The primary use case of CanItStreamTo.Me is mainly for the general public, for the many days people wish to watch a movie but don't know where to watch it. In addition, it is vastly helpful in identifying trends and the locations in which these movies are most popular. Through the use of the CanItStreamToMe API, users also can also display the most popular movies and services across countries around the world.
### Specific Cases
- A group of friends get together to watch a movie. They don't know what to watch, but they have a few subscription services between them. They click on a service they are subscribed to and start to browse the movies. They click on a few that seem interesting and come across one that is popular in Country X. Person A is among the group and is originally from Country X. She has been wanting to get more in touch which her Country X side to they decide to watch that movie.
- Person A has a close friend, Person B, who lives in another country. Person B always has great movie suggestions and Person A wonders what other movies are popular in Person B's country. Person A goes to CanItStreamTo.me and clicks on Person B's country. Person A sees a bunch of movies that are popular in that country and clicks on the first one. Person A sees that he can stream it on netflix or rent it youtube. Luckily Person already has netflix, he watches it and talks to Person B about the movie.
## Core Structure
      canitstreamtome
      ├── app (api.canitstreamto.me)
      │   ├── __init__.py
      │   ├── canitstreamtome_api.py
      │   ├── canitstreamtome_apiv2.py
      │   ├── database.py
      │   └── test.py
      │
      ├── backend
      │   ├── main.py
      │   └── tests.py
      │
      ├── frontend 
      │   ├── guitests.py
      │   ├── index.js
      │   └── tests.js
      │
      ├── public
      │
      ├── src (canitstreamto.me)
      │   ├── components
      │   ├── img
      │   ├── selenium_tests
      │   └── index.js
      │
      ├── test (front-end tests)
      │   ├── helpers
      │   └── tests.js
      │
      ├── .babelrc
      ├── .gitignore
      ├── Postman.json
      ├── README.md
      ├── makefile
      ├── package-lock.json
      └── package.json

## Setup and Running
- Install packages with 'npm run'
- Run website locally with 'npm start'

## Screenshots
![GitHub Logo](/screenshots/s1.png)
![GitHub Logo](/screenshots/s2.png)
![GitHub Logo](/screenshots/s3.png)
![GitHub Logo](/screenshots/s4.png)
![GitHub Logo](/screenshots/s5.png)
## Resources
### Team
- **Slack**: We used the messaging tool, Slack, to communicate within our team and also as a way to keep up with the state of our Github. By connecting our Github repo to our slack team we are able to receive Slack message updates of commits, issues, and other events on our Github.

- **Github**: We used Github for version control and collaboration. Github allows all of our team members to contribute to one repository. It also allows for version control so that, in the event that something in our code is broken we have working versions we can always go back to.

- **GitBook**: We are used GitBook to write our technical report. It allows us to work on different sections of our report concurrently. The chapters also help us divide the parts of the report among our members.

- **NameCheap**: We used NameCheap to get a free domain at the start of the project.
### Back-end
- **Flask**: We use flask to connect our Python code to our website. The python renders the HTML files and flask runs the code to produce the front-end on our website.

- **Postman**: We used this for database design and testing.

- **REST Countries**: We got the flag images and details for each country from this API.

- **pytrends Pseudo API for Google Trends**: We are using this pseudo API to find what countries are searching for each movie or streaming service the most.

- **Guidebox API**: Got the information about which streaming services provide which movies from here to add to our database.

- **themoviedb API**: Got the detail information about each of our movie instances from here for our database.

### Front-end
- **Axios**: We use this to make calls to our API and Github's API simple.

- **Create-react-app**: We used this to help create our initial project structure as the TAs recommended.

- **S3**: We used S3 to host our front-end.

- **Selenium**: We are using Selenium to test the GUI of our website.

- **Mocha**: We are using Mocha to create unit tests for our front-end.

- **React**: We are using React combined with JavaScript to create dynamic components on our website.

- **Bootstrap**: We used Bootstrap to get our template for the base of our design. We used their one-page-wonder template and made changes to fit our personal taste and the requirements of the project.
