
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}

export const setSearchQuery = (query: string): SetSearchQueryAction => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
