import {
  SELECT_TERM,
  START_FETCH,
  FETCH_TERM,
  RECEIVE_RESPONSE,
  RECEIVE_ERROR,
  ADD_NODE
} from '../actions/actions';

const concepts = (state = {isBusy: false, isEmptyResult: false, term: '', nodes: [], edges: [], error: ''}, action) => {
  switch (action.type) {
    case SELECT_TERM:
      return { ...state, term: action.term  }
    case START_FETCH:
      return { ...state, isBusy: true, edges: [], nodes: []  }
    case FETCH_TERM:
      return {...state, ...action}
    case RECEIVE_RESPONSE:
      console.log(RECEIVE_RESPONSE, state, action)
      return { ...state,
        isBusy: false,
        isEmptyResult: action.isEmptyResult,
        nodes:action.nodes,
        edges:action.edges
      }
    case RECEIVE_ERROR:
      console.log(RECEIVE_ERROR, state, action)
      return { ...state, isBusy: false, error: action.error };
    default:
      console.log("DEFAULT AT", action)
      return state;
  }
};

export default concepts;
