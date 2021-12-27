import {
  CLEAR_RECENTLY_CREATED,
  CREATE_SAVED_QUERY,
  CREATE_SAVED_QUERY_FAILED,
  CREATE_SAVED_QUERY_SUCCEEDED,
  DELETE_SAVED_QUERY,
  DELETE_SAVED_QUERY_FAILED,
  DELETE_SAVED_QUERY_SUCCEEDED,
  GET_SAVED_QUERIES,
  GET_SAVED_QUERIES_FAILED,
  GET_SAVED_QUERIES_SUCCEEDED,
  GetSavedQueriesAction,
  RESTORE_SAVED_QUERY,
  RESTORE_SAVED_QUERY_FAILED,
  RESTORE_SAVED_QUERY_SUCCEEDED,
  SavedQueriesState,
  SELECT_SAVED_QUERY,
  SET_USER_HAS_SEEN_SAVED_QUERIES,
  TOGGLE_SAVED_QUERIES,
} from './types';

export const savedQueriesDefaultState: SavedQueriesState = {
  savedQueries: null,
  nextPageToken: '',
  loading: false,
  currentIamDomain: '',
  isOpen: false,
  currentSelection: { uuid: '', params: '', campaignIds: [], flightIds: [] },
  creating: false,
  createSuccess: false,
  recentlyDeleted: [],
  restoring: false,
  deleting: false,
  showNewTag: true,
};

export default function getSavedQueriesReducer(
  state: SavedQueriesState = savedQueriesDefaultState,
  action: GetSavedQueriesAction,
): SavedQueriesState {
  switch (action.type) {
    case GET_SAVED_QUERIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_SAVED_QUERIES:
      return {
        ...state,
        loading: true,
        currentIamDomain: action.payload.iamDomain,
      };

    case GET_SAVED_QUERIES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        savedQueries: action.payload.savedQueries,
        nextPageToken: action.payload.nextPageToken,
        error: undefined,
      };

    case TOGGLE_SAVED_QUERIES:
      return {
        ...state,
        isOpen: action.payload.isOpen,
        savedQueries: !action.payload.isOpen
          ? state.savedQueries?.filter(
              q => !state.recentlyDeleted.includes(q.uuid),
            )
          : state.savedQueries,
        recentlyCreated: !action.payload.isOpen ? '' : state.recentlyCreated,
        recentlyDeleted: !action.payload.isOpen ? [] : state.recentlyDeleted,
      };

    case SELECT_SAVED_QUERY:
      return {
        ...state,
        currentSelection: {
          uuid: action.payload.uuid,
          params: action.payload.params,
          campaignIds: action.payload.campaignIds,
          flightIds: action.payload.flightIds,
        },
      };
    case CREATE_SAVED_QUERY_FAILED:
      return {
        ...state,
        creating: false,
        createSuccess: false,
        createError: action.payload,
        currentSelection: {
          uuid: '',
          params: '',
          campaignIds: [],
          flightIds: [],
        },
      };
    case CREATE_SAVED_QUERY:
      return {
        ...state,
        creating: true,
        createSuccess: false,
        createError: undefined,
        currentSelection: {
          uuid: '',
          params: action.payload.params,
          campaignIds:
            action.payload.savedQuery.campaignParams?.campaignIds || [],
          flightIds: action.payload.savedQuery.flightParams?.flightIds || [],
        },
      };
    case CREATE_SAVED_QUERY_SUCCEEDED:
      return {
        ...state,
        creating: false,
        createSuccess: true,
        createError: undefined,
        recentlyCreated: action.payload.uuid!,
        currentSelection: {
          ...state.currentSelection,
          uuid: action.payload.uuid!,
        },
      };
    case CLEAR_RECENTLY_CREATED:
      return {
        ...state,
        recentlyCreated: '',
      };

    case RESTORE_SAVED_QUERY_FAILED:
      return {
        ...state,
        restoring: false,
        restoreError: action.payload,
      };
    case RESTORE_SAVED_QUERY:
      return {
        ...state,
        restoring: true,
        restoreError: undefined,
      };
    case RESTORE_SAVED_QUERY_SUCCEEDED:
      return {
        ...state,
        restoring: false,
        restoreError: undefined,
        recentlyDeleted: state.recentlyDeleted.filter(
          (uuid: string) => uuid !== action.payload.savedQueryUuid,
        ),
      };
    case DELETE_SAVED_QUERY:
      return {
        ...state,
        deleting: true,
        deleteError: undefined,
      };
    case DELETE_SAVED_QUERY_SUCCEEDED:
      return {
        ...state,
        deleting: false,
        deleteError: undefined,
        recentlyDeleted: state.recentlyDeleted.concat(
          action.payload.savedQueryUuid,
        ),
      };
    case DELETE_SAVED_QUERY_FAILED:
      return {
        ...state,
        deleting: false,
        deleteError: action.payload,
      };
    case SET_USER_HAS_SEEN_SAVED_QUERIES:
      return {
        ...state,
        showNewTag: false,
      };
  }

  return state;
}
