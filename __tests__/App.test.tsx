import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {App} from '../src/screens/App';
import {act} from 'react-test-renderer';

test('renders correctly', async () => {
  await act(async () => {
    ReactTestRenderer.create(<App />);
  });
});