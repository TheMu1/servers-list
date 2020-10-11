import React from 'react';
import {shallow} from 'enzyme';
import ServersList from '../Components/List/listPage';

const servers = [
    {
        name: 'Lithuania #1',
        distance: 1
    }
];

describe('Servers list table test', () => {
    test('should show loader', () => {
        const wrapper = shallow(<ServersList/>);
        const showLoader = wrapper.find('.loader');
        expect(showLoader.exists()).toBe(true);
    });
    test('should show table', () => {
        const wrapper = shallow(<ServersList servers={servers}/>);
        wrapper.setState({loading: false});
        const showTable = wrapper.find('Table');
        expect(showTable.exists()).toBe(true);
    });
});