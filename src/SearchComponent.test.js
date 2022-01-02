import React from 'react';
import SearchComponent from './SearchComponent';
import Enzyme from 'enzyme';
import {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("Button test", () => {
	it("testing submitting button", () => {
		const onSubmit = jest.fn();
		const fakeEvent = { preventDefault: () => console.log('preventDefault') };
		const wrapper = mount(<SearchComponent onSubmit={onSubmit}/>);
		const instance = wrapper.instance();
		const submitBtn = wrapper.find('#searchBtn')
		submitBtn.simulate('click', fakeEvent)
		expect(onSubmit).toHaveBeenCalled();
	});
});
