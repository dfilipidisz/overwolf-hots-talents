import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants';
import { ledChangeKey } from '../actions/led';

class KeynameSelector extends Component {

  render() {
    return (
      <select className='form-control input-sm' value={ this.props.value } onChange={ (e) => { this.props.ledChangeKey(this.props.command, e.target.value); } }>
        <option value='none'>Select Key...</option>
        {constants.KeyboardNames.map((key) => {
          return <option key={ key } value={ key }>{key}</option>;
        })}
      </select>
    );
  }
}

KeynameSelector.propTypes = {
  value: React.PropTypes.string,
  ledChangeKey: React.PropTypes.func,
  command: React.PropTypes.string,
};

export default connect(
  null,
  { ledChangeKey }
)(KeynameSelector);
