import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('<SearchBar />', () => {
  test('search bar input field', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'taipei' } });
    expect(input.value).toBe('taipei');
  });
});
