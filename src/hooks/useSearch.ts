import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store.ts';
import { setQuery } from '../store/searchSlice.ts';

export const useSearch = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();

  const updateQuery = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  return {
    query,
    updateQuery,
  };
};