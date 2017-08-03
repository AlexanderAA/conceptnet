import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectTerm, fetchTerm } from '../actions/actions';


let SearchBar = ({ dispatch, isBusy, term, nodes, edges, error, isEmptyResult }) => {
  let input;

  var onChange = function (e) {
    dispatch(selectTerm(e.target.value));
  }

  return (
    <div className="row">
      <form  className="form-inline" onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(fetchTerm(term))
      }}>

        <div className="input-group">
          <input type="text" className="form-control" onChange={onChange} ref={node => {input = node}}  placeholder='Try "node"?'/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <i className="glyphicon glyphicon-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
  )
};

SearchBar.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  term: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isEmptyResult: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isBusy: state.concepts.isBusy,
  term: state.concepts.term,
  nodes: state.concepts.nodes,
  edges: state.concepts.edges,
  error: state.concepts.error,
  isEmptyResult: state.concepts.isEmptyResult
});

SearchBar = connect(mapStateToProps)(SearchBar);

export default SearchBar;
