import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import InputSection from "../../components/inputSection";
import Adapter from "enzyme-adapter-react-15";
Enzyme.configure({adapter: new Adapter});

describe('OutputSection', () => {
  it('renders without crashing', () => {
    const testRenderer = shallow( <InputSection />, );
    expect(testRenderer).toMatchSnapshot();
  });
});