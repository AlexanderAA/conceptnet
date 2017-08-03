import * as results from './results'


describe('Data conversions', () => {

  it('does basics of node format conversion for SigmaJS', () => {
    let r = results.convertNodes(['abc'])
    expect(r[0]['id']).toEqual('abc');
    expect(r[0]['label']).toEqual('abc');
  });

  it('does basics of edge format conversion for SigmaJS', () => {
    let r = results.convertEdges([['abc', 'bac']])
    expect(r[0]['id']).toEqual('abcbac');
    expect(r[0]['source']).toEqual('abc');
    expect(r[0]['target']).toEqual('bac');
  });

});

describe('UI functionality', () => {

  // TBA

});

