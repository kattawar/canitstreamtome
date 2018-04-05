import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Home from '../src/components/Home';
import NavBarr from '../src/components/NavBar';
import Bottom from '../src/components/Footer';
import About from '../src/components/About';
import CountriesGrid from '../src/components/CountriesGrid';
import MovieGrid from '../src/components/MovieGrid';
import ServicesGrid from '../src/components/ServicesGrid';
import SearchBar from '../src/components/SearchBar';
import Search from '../src/components/Search';

describe('Test Home', () => {
	it ('contains header', () => {
		expect(shallow(<Home />).find('header').hasClass('masthead text-center text-white')).to.equal(true);
	})

	it ('contains carousel', () => {
		expect(shallow(<Home />).find('Carousel').exists()).to.equal(true);
	})
})

describe('Test NavBar', () => {
	it ('contains brand', () => {
		expect(shallow(<NavBarr />).contains('CanItStreamTo.me')).to.equal(true);
	})

	it ('contains all navitems', () => {
		expect(shallow(<NavBarr />).contains('Movies')).to.equal(true);
		expect(shallow(<NavBarr />).contains('Streaming Services')).to.equal(true);
		expect(shallow(<NavBarr />).contains('Countries')).to.equal(true);
		expect(shallow(<NavBarr />).contains('About Us')).to.equal(true);
	})
})

describe('Test SearchBar', () => {
	it ('exists', () => {
		expect(shallow(<SearchBar />).find('form').length).to.equal(0)
	})
})

describe('Test Footer', () => {
	it ('contains footer', () => {
		expect(shallow(< Bottom/>).find('footer').hasClass('py-5 bg-black')).to.equal(true);
	})
})

/*describe('Test Search', () => {
	it ('contains models', () => {
		expect(shallow(< Search/>).contains('Movies')).to.equal(true);
		expect(shallow(< Search/>).contains('Streaming Services')).to.equal(true);
		expect(shallow(< Search/>).contains('Countries')).to.equal(true);
	})
})*/

describe('Test CountriesGrid', () => {
	it ('contains card', () => {
		expect(shallow(< CountriesGrid/>).find('section').length).to.equal(0);
	})
})

describe('Test MovieGrid', () => {
	it ('contains card', () => {
		expect(shallow(< MovieGrid/>).find('section').length).to.equal(0);
	})
})

describe('Test ServicesGrid', () => {
	it ('contains card', () => {
		expect(shallow(< ServicesGrid/>).find('section').length).to.equal(0);
	})
})

describe('Test About', () => {
	it ('contains all section headers', () => {
		expect(shallow(<About />).contains('PURPOSE')).to.equal(true);
		expect(shallow(<About />).contains('STATS')).to.equal(true);
		expect(shallow(<About />).contains('DATA')).to.equal(true);
		expect(shallow(<About />).contains('TOOLS')).to.equal(true);
		expect(shallow(<About />).contains('LINKS')).to.equal(true);
	})

	it ('contains all members', () => {
		expect(shallow(<About />).contains('Erin Jensby')).to.equal(true);
		expect(shallow(<About />).contains('Nick Lavigne')).to.equal(true);
		expect(shallow(<About />).contains('Kevin Salcedo')).to.equal(true);
		expect(shallow(<About />).contains('Zach Kattawar')).to.equal(true);
		expect(shallow(<About />).contains('Jordan Howe')).to.equal(true);
	})
})
