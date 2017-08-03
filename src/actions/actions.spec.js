import * as actions from './actions'

describe('App actions', () => {

  it('selectTerm should create SELECT_TERM action', () => {
    expect(actions.selectTerm('term')).toEqual({
      type: 'SELECT_TERM',
      term: 'term'
    })
  })

  it('startFetch should create START_FETCH action', () => {
    expect(actions.startFetch()).toEqual({
      type: 'START_FETCH',
      isBusy: true
    })
  })

  it('fetchTerm calls RECEIVE_ERROR on complete lookup failure', () => {
    let failingLookup = (url, settings, onDone ) => { throw "Error" };
    let conceptNet = { lookup: failingLookup };
    let dispatch  = (arg) => { expect(arg['type']).toEqual("RECEIVE_ERROR") };
    actions.getIsA(dispatch, conceptNet, "next term");
  })

  it('fetchTerm calls RECEIVE_ERROR on lookup returning error to onDone', () => {
    let errorLookup = (url, settings, onDone ) => { onDone("Error", null) };
    let conceptNet = { lookup: errorLookup };
    let dispatch  = (arg) => { expect(arg['type']).toEqual("RECEIVE_ERROR") };
    actions.getIsA(dispatch, conceptNet, "next term");
  })

  it('fetchTerm calls RECEIVE_RESPONSE on lookup returning results to onDone', () => {
    let successLookup = (url, settings, onDone ) => { onDone(null, {'edges': []}) };
    let conceptNet = { lookup: successLookup };
    let dispatch  = (arg) => { expect(arg['type']).toEqual("RECEIVE_RESPONSE") };
    actions.getIsA(dispatch, conceptNet, "next term");
  })

})
