import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleAutoClose } from '../actions/settings';

class PageSettings extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <ul className="nav nav-tabs">
              <li className="active"><a href="#">General</a></li>
              <li className='disabled'><a href="#">Logitech LED</a></li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <div className='settings-tab-box' >

              <form className="form-horizontal">
                <div className="form-group">
                  <label className="col-xs-4 control-label">Window Auto Close</label>
                  <div class="col-xs-8">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={this.props.autoClose} onChange={() => {this.props.toggleAutoClose();}} />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({autoClose: state.settings.autoClose}),
  { toggleAutoClose }
)(PageSettings);
