import { connect } from 'react-redux';
import Results from '../components/results';

const mapStateToProps = (state) => ({
  isBusy: state.concepts.isBusy,
  term: state.concepts.term,
  nodes: state.concepts.nodes,
  edges: state.concepts.edges,
  error: state.concepts.error,
  isEmptyResult: state.concepts.isEmptyResult
});

const ResultsList = connect(mapStateToProps)(Results);

export default ResultsList;
