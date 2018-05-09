import React, {Component} from 'react';
import {connect} from 'react-redux';
import { SORT_BY_DATE, SORT_BY_SCORE, sortByDate, sortByScore} from "../actions/index";


class SortBy extends Component {
  sortByDate() {
      const {onByDate, onSortByDate} = this.props;
      onSortByDate({type: SORT_BY_DATE});
    if (onByDate) {
      onByDate();
    }
  }

  sortByScore() {
      const {onByScore, onSortByScore} = this.props;
      onSortByScore({type: SORT_BY_SCORE});
    if (onByScore) {
      onByScore();
    }
  }

    change = (event) => {
    switch(event.target.value) {
        case "0":{
          this.sortByScore();
          break;
        }
        case "1":{
            this.sortByDate();
            break;
        }
        default:
    }
  }

  render() {
    return (
        <div className="sort">
          <span>Sort By </span>
          <select onChange={this.change}>
            <option value="0">Vote Score</option>
            <option value="1">Date</option>
          </select>
        </div>
    )
  }
}

function mapStateToProps ({prefrences}) {
  return {prefrences}
}

function mapDispatchToProps (dispatch) {
  return {
    onSortByDate: () => dispatch(sortByDate()),
    onSortByScore: () => dispatch(sortByScore()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
