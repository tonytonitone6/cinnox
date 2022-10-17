import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import SearchBar from '../SearchBar';

describe('<SearchBar />', () => {
  test('search bar input field', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    user.type(input, 'taipei');

    expect(input.value).toBe('taipei');
  });
});
