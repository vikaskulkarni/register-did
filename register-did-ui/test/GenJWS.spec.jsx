import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import GenJWS from '../client/components/GenJWS.jsx'

test('renders GenJWS as expected', () => {
   const resetHandler = (value) => {
      expect(value).toBe(true);
   }
   const tree = renderer.create(<GenJWS jwsValue="dummy data" resetNextButton={resetHandler} />).toJSON();
   expect(tree).toMatchSnapshot();
});

test('when no jwt value, does not allow copy and rest', () => {
   const resetHandler = jest.fn();
   const {getByTestId} = render(<GenJWS resetNextButton={resetHandler} />);
   expect(getByTestId('copy-icon')).toHaveAttribute('class', 'copy-icon-disabled');
});

test('clicking on copy icon calls reset handler once', () => {
   document.execCommand = jest.fn();
   const resetHandler = jest.fn();
   const {getByTestId} = render(<GenJWS jwsValue="dummy data" resetNextButton={resetHandler} />);
   fireEvent.click(getByTestId('copy-icon'));
   expect(resetHandler).toBeCalledTimes(1);
});
