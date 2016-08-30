import React, { Component } from 'react';
import * as constants from '../constants';
import { connect } from 'react-redux';
import { ledChangeKey } from '../actions/led';

class KeynameSelector extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <select className='form-control input-sm' value={this.props.value} onChange={(e) => {this.props.ledChangeKey(this.props.command, e.target.value);}}>
        <option value='none'>Select Key...</option>
        {constants.KeyboardNames.map((key) => {
          return <option key={key} value={key}>{key}</option>
        })}
      </select>
    );
  }
}

export default connect(
  null,
  { ledChangeKey }
)( KeynameSelector);
