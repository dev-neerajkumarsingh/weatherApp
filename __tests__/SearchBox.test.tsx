import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBox } from '../src/components/SearchBox';

describe('SearchBox', () => {
  it('calls onSearch with correct city name', () => {
    const mockOnSearch = jest.fn();
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBox value="" onChangeText={mockOnChangeText} onSearch={mockOnSearch} />
    );

    const input = getByPlaceholderText('Enter City Name');
    const button = getByTestId('get-weather-button');

    fireEvent.changeText(input, 'London');
    fireEvent.press(button);

    expect(mockOnChangeText).toHaveBeenCalledWith('London');
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
