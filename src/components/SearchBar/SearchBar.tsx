import { FC, useRef, ChangeEvent, KeyboardEvent } from 'react';

import { useStore, updateSearchWords } from '@contexts/GlobalContext';
import useEventCallback from '@hooks/useEventCallback';
import { SearchBarWrap, Input, SearchBtn } from './SearchBar.style';

const SearchBar: FC = (): JSX.Element => {
  const textRef = useRef<string>('');
  const { dispatch } = useStore();

  const updateSearchText = (e: ChangeEvent<HTMLInputElement>) =>
    (textRef.current = e.target.value);

  const handleSearchText = useEventCallback(
    () => updateSearchWords(dispatch, textRef.current),
    []
  );

  const keyDownPress = useEventCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') updateSearchWords(dispatch, textRef.current);
    },
    []
  );

  return (
    <SearchBarWrap>
      <Input onChange={updateSearchText} onKeyDown={keyDownPress} />
      <SearchBtn onClick={handleSearchText}>Search</SearchBtn>
    </SearchBarWrap>
  );
};

export default SearchBar;
