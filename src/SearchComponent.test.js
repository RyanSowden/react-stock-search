import React from 'react';
import SearchComponent from './SearchComponent';
import Enzyme from 'enzyme';
import {shallow, mount} from 'enzyme';
import {render, screen, fireEvent} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("Button test", () => {
	it("should initialize index to 0", () => {
    	// check for initial state
    	const app = shallow(<SearchComponent />);
    	expect(app.state("value")).toEqual("");
  });

	//check for the state to be updated.
	it("Check for updates to the state value", () => {
		const app = shallow(<SearchComponent />);
		app.instance().setState({value: 'test'});
		expect(app.state('value')).toEqual('test');
	
	});
	it("Check if the current_price variable takes a value", () => {
		const app = shallow(<SearchComponent />);
		const current_price = 10;
		app.instance().setState({current_price: current_price});
		expect(app.state('current_price')).toEqual(10)
	});

	it("Check if the current_price variable takes a value", () => {
		const app = shallow(<SearchComponent />);
		const adjust_price = 10;
		app.instance().setState({adjust_price: adjust_price});
		expect(app.state('adjust_price')).toEqual(10)
	});

});
