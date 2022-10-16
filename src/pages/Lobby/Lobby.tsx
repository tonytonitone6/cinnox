import { FC, Fragment } from 'react';
import styled from '@emotion/styled';

import SearchBar from '@components/SearchBar/SearchBar';
import Reports from '@containers/reports';

const ReportContainer = styled('div')`
  margin-top: 20px;
`;

const Lobby: FC = () => {
  return (
    <Fragment>
      <SearchBar />
      <ReportContainer>
        <Reports />
      </ReportContainer>
    </Fragment>
  );
};

export default Lobby;
