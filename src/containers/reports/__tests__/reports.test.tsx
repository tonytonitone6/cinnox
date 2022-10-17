import { render, screen } from '@testing-library/react';

import { GlobalContext, StatusType } from '@contexts/GlobalContext';
import Reports from '@containers/reports';

describe('<GlobalProvider />', () => {
  beforeEach(() => {
    const state = {
      state: {
        searchWords: '',
        isLoading: true,
        data: {
          temp_max: [{ value: 294, date: '2022-10-16' }]
        } as StatusType
      },
      dispatch: () => ({})
    };
    render(
      <GlobalContext.Provider value={state}>
        <Reports />
      </GlobalContext.Provider>
    );
  });
  test('check reports in document', () => {
    const reportsComp = screen.getByTestId('reports');
    expect(reportsComp).toBeInTheDocument();
  });
});
