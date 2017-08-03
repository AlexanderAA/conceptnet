import ConceptNet from 'concept-net';

// This is our local state, only for node/edge tracking,
// and it would be much better (in terms of potential
// functionality of the app at least) to implement it properly with
// react dispatch/getState rather than like this.
let counter = 0;
let nodes = [];
let edges = [];
let MAX_NODES = 35;

// Ensure uniqueness of an array of edges. Each edge is an array.
var uniq = function(arr) {
  var hash = {}
  var uq = [];
  for (var i in arr) {
    var el = arr[i];
    if (!hash.hasOwnProperty(el)) {
      hash[el] = 1;
      uq.push(el);
    }
  }
  return uq;
}

// Extract term from the API JSON response part
var processIsAEdge = function(jsonedge) {
  // Helper data transform function
  try {
    var label = jsonedge.rel.label;
    var nextTerm = jsonedge.end.label;
  } catch (e) {
    return null;
  };
  if (label === 'IsA') {
    return nextTerm;
  } else {
    return null;
  }
};

export const getIsA = (dispatch, conceptNet, currentTerm) => {
  // Adds a new node, runs onDone to add edges (if any) for the node, and increments counter by 1

  if (nodes.indexOf(currentTerm) !== -1) {
    console.log("Seen", nodes, currentTerm);
    return
  }

  console.log("New term", nodes, currentTerm);
  nodes.push(currentTerm);
  counter = counter + 1;

  // API response handler. Adds new edges, calls getIsA on new nodes, then decrements counter by 1
  var onDone = function(err, result) {
    if (err) {
      counter = counter - 1;
      dispatch(receiveError(currentTerm, "ConceptNet request failed", err))
      return
    }
    for (var i in result.edges) {
      var edge = result.edges[i];
      var nextTerm = processIsAEdge(edge);
      if (nextTerm !== null) {
        edges.push([currentTerm, nextTerm]);

        // This is where we "terminate" execution and do not issue any further requests
        if (nodes.length < MAX_NODES) {
          getIsA(dispatch, conceptNet, nextTerm);
        }
      }
    }
    counter = counter - 1;
    // When counter is 0 again, it means we walked though all nodes (limited by MAX_NODES),
    // Note, that actual resulting number of nodes almost always <>MAX_NODES
    if (counter === 0) {
      dispatch(receiveResponse(nodes, edges));
    }
  };

  try {
    // It would make sense to get limit from the UI.
    // At the moment it is just set to a large value, so we get IsA terms almost always.
    conceptNet.lookup('/c/en/'+currentTerm, {'limit':100 }, onDone);
  } catch (e) {
    dispatch(receiveError(currentTerm, "ConceptNet request failed", e))
  };

};

// Term changed in the UI
export const SELECT_TERM = 'SELECT_TERM';
export function selectTerm(term) {
  return {
    type: SELECT_TERM,
    term:term
  };
};


export const START_FETCH = 'START_FETCH';
export function startFetch() {
  return {
    type: START_FETCH,
    isBusy: true,
  };
};


export const FETCH_TERM = 'FETCH_TERM';
export function fetchTerm(term) {
  return (dispatch) => {
    dispatch(startFetch());
    var conceptNet = ConceptNet('conceptnet.netlify.com', '443', '5.4');
    // Nodes and edges should probably be included into the app state.
    // Besides other things, it would be possible to add them to the graph "dynamically"
    // This just needs two-three new actions (ADD_EDGE, ADD_NODE) and corresponding wiring in the app.
    nodes = [];
    edges = [];
    getIsA(dispatch, conceptNet, term);
  };
}


export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export function receiveResponse(nodes, edges) {
  console.log('received response', nodes, edges);
  var uniqueNodes = [...new Set(nodes)];
  var uniqueEdges = uniq(edges);
  nodes = [];
  edges = [];
  return {
    type: RECEIVE_RESPONSE,
    isBusy: false,
    nodes: uniqueNodes,
    edges: uniqueEdges,
    isEmptyResult: false
  };
}


export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export function receiveError(term, message, e) {
  console.log('received error', term, message, e);
  return {
    type: RECEIVE_ERROR,
    isBusy: false,
    nodes: [],
    edges: [],
    error: message
  };
}
