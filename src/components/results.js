import React from 'react';
import PropTypes from 'prop-types';
import {Sigma, RandomizeNodePositions, RelativeSize, ForceAtlas2, ForceLink } from 'react-sigma';

// For SigmaJS display
export const convertNodes = (( nodes ) =>
  (nodes.map( (word, i) => {return {'id':word, 'label':word}} )))

// For SigmaJS display
export const convertEdges = (( edges ) =>
  (edges.map((lnk, i) =>
    {return {'id':lnk[0]+lnk[1], 'source':lnk[0], 'target':lnk[1], 'label':'IaS', 'type':'arrow'}})))


const Results = ({ isBusy, term, nodes, edges, error, isEmptyResult }) => (
  <div className="row">
    {(isBusy) ? (<div className="alert alert-success" role="alert">Loading data for "{term}"... This will take around one minute. Open your browser console (F12 or Ctrl+Shift+I) and enjoy watching the progress!</div>) : (<div/>)}
    {console.log("GRAPH", error, term, {nodes:convertNodes(nodes), edges:convertEdges(edges)})}

    {(error !== '') ? (<div className="alert alert-error" role="error">Error happened ({error}). Please retry your request.</div>)
      :((term === '') ? (<div/>)
        :(<div className="panel panel-default">
          {(nodes.length === 0)?<div/>:
            <Sigma graph={{nodes:convertNodes(nodes), edges:convertEdges(edges)}}
              settings={{drawEdges: true, clone: false}}>
              <RelativeSize initialSize={1}/>
              <ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode timeout={700}/>
              <RandomizeNodePositions/>
            </Sigma>
          }
          <ul className="list-group">
            {edges.map((edge, i) => <li className="list-group-item" key={i}>{i}.&nbsp;{edge[0]} ⟶ {edge[1]}</li>)}
          </ul>
        </div>
        )
      )
    }
  </div>
);

Results.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  term: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isEmptyResult: PropTypes.bool.isRequired
};

export default Results;
