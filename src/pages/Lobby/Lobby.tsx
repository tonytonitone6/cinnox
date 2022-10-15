import { FC, Fragment } from 'react';

import SearchBar from '@components/SearchBar/SearchBar';
import Reports from '@containers/reports';

const Lobby: FC = () => {
  return (
    <Fragment>
      <SearchBar />
      <Reports />
    </Fragment>
  );
};

export default Lobby;
