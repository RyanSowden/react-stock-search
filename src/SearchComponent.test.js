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

});
