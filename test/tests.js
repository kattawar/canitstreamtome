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
//import ModelGrid from '../src/components/Grid';
//import splitArray from '../src/components/Grid';
//import MovieInstance from '../src/components/MovieInstance';
//import CountryInstance from '../src/components/CountryInstance';
//import ServiceInstance from '../src/components/ServiceInstance';


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

describe('Test Footer', () => {
	it ('contains footer', () => {
		expect(shallow(< Bottom/>).find('footer').hasClass('py-5 bg-black')).to.equal(true);
	})
})

/*describe('Test About', () => {
	it ('contains all section headers', () => {
		expect(shallow(<About />).contains('PURPOSE')).to.equal(true);		
		expect(shallow(<About />).contains('HOW WE')).to.equal(true);		
		expect(shallow(<About />).contains('APPROVE US, INC. MEMBERS')).to.equal(true);		
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
})*/