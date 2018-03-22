import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Foo from '../src/Foo';

describe('<Foo/>', function () {
  it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).contains(<div className="foo" />)).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).is('.foo')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<Foo />).find('.foo').length).to.equal(1);
  });
});
