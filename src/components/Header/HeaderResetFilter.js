import React from 'react';
import { connect } from 'react-redux';
import HeaderTextButton from './HeaderTextButton';
import { resetFilter, searchRequest } from '../../actions/search';

class HeaderResetFilter extends React.Component {
  render() {
    return (
      <HeaderTextButton
        onPress={() => {
          this.props.dispatch(resetFilter());
          this.props.dispatch(searchRequest());
        }}
        title={'Reset'}
      />
    );
  }
}

export default connect()(HeaderResetFilter);
