import React from 'react';
import SearchComponent from './SearchComponent';
import Enzyme from 'enzyme';
import {shallow, mount} from 'enzyme';
import {render, screen, fireEvent} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() });

describe("SearchComponent", () => {
	it("should render properly", () => {
    	// check for initial state
    	const app = renderer.create(<SearchComponent />);
	expect(app).toMatchSnapshot();
  });
	it('should render the search stock form ', () => {
		const wrapper = shallow(<SearchComponent />)
		expect(wrapper.find('form[id="form"]').exists()).toBe(true);
	})

	it('should render the search stock input tag', () => {
		const wrapper = shallow(<SearchComponent />)
		expect(wrapper.find('input[name="search"]').exists()).toBe(true);
	})

	it('should render the search button', () => {
		const wrapper = shallow(<SearchComponent />)
		expect(wrapper.find('button[id="searchBtn"]').exists()).toBe(true);
	})
	
	it('the default value should be empty', () => {
		const wrapper = shallow(<SearchComponent />)
		expect(wrapper.find('input[name="search"]').prop('value')).toBe('');
	})
	it('on change of value in the field, the state of that field in the component should be updated', () => {
		const wrapper = shallow(<SearchComponent />)
		expect(wrapper.find('input[name="search"]').simulate('change', {
			target: {
				value: 'test',
			},
		})
		);
		expect(wrapper.find('input[name="search"]').prop('value')).toBe('test');
	})
	
});
