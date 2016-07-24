import React from 'react';
import { checkStatus, makeFetchInit } from '../utility';
const getSimpleTalentName = require('../utilities/getSimpleTalentName');
import * as constants from '../constants';

class BuildBox extends React.Component {

  constructor (props) {
    super(props);

    this.updateBuild = this._updateBuild.bind(this);
    this.changePublicState = this._changePublicState.bind(this);
    this.changeAnonState = this._changeAnonState.bind(this);

    this.state = {
      isSettingsOpen: false,
      isDescriptionOpen: false,
      build: Object.assign({}, this.props.build)
    }
  }

  _updateBuild (part) {
    const fetchInit = makeFetchInit(undefined, undefined, {
      id: this.state.build._id,
      part
    });

    fetch(`${constants.SERVER_URL}/api/update-build`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          /* this.resetFields();
          this.props.addNewBuild(res.build);*/
        }
        else {
          this.setState({ build: Object.assign({}, this.props.build) });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ build: Object.assign({}, this.props.build) });
      });
  }

  _changePublicState () {
    this.setState({
      build: Object.assign({}, this.state.build, {public: !this.state.build.public})
    });

    this.updateBuild({public: !this.state.build.public});
  }

  _changeAnonState () {
    this.setState({
      build: Object.assign({}, this.state.build, {anon: !this.state.build.anon})
    });

    this.updateBuild({anon: !this.state.build.anon});
  }

  render () {
    const { build } = this.state;

    return (
      <div className='build-box'>
        <div className='header'>
          <div className={'hero-portrait ' + build.hero} />
          <span>{build.name}</span>
          <i className='favorite fa fa-star' />
          <i className='settings-toggle fa fa-cog active'
            onClick={() => {
              this.setState({isSettingsOpen: !this.state.isSettingsOpen});
            }} />
        </div>
        {this.state.isSettingsOpen
          ?
            <div className='settings'>
              <form className='form-horizontal'>
                <div className="form-group">
                  <div className="col-xs-4 col-xs-offset-2">
                    <div className="checkbox">
                      <label><input type="checkbox" checked={build.public} onChange={this.changePublicState} /> Public</label>
                    </div>
                  </div>
                  <div className="col-xs-4 col-xs-offset-2">
                    <button className='pure-button button-error button-xsmall'>Delete</button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-4 col-xs-offset-2">
                    <div className="checkbox">
                      <label><input type="checkbox" checked={build.anon} onChange={this.changeAnonState} /> Anonymous</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          : null}
        <div className='talents'>
          <div className='parcel hint--right' data-hint={build.talents[0]}><div className={`talent-pic ${getSimpleTalentName(build.talents[0])}`} /></div>
          <div className='parcel hint--right' data-hint={build.talents[1]}><div className={`talent-pic ${getSimpleTalentName(build.talents[1])}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[2]}><div className={`talent-pic ${getSimpleTalentName(build.talents[2])}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[3]}><div className={`talent-pic ${getSimpleTalentName(build.talents[3])}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[4]}><div className={`talent-pic ${getSimpleTalentName(build.talents[4])}`} /></div>
          <div className='parcel hint--left' data-hint={build.talents[5]}><div className={`talent-pic ${getSimpleTalentName(build.talents[5])}`} /></div>
          <div className='parcel hint--left' data-hint={build.talents[6]}><div className={`talent-pic ${getSimpleTalentName(build.talents[6])}`} /></div>
        </div>
        <div className='footer'>
          <span className='left'>12 days ago by {build.creator}</span>
          <span className='right' onClick={() => {
            this.setState({isDescriptionOpen: !this.state.isDescriptionOpen});
          }}>{this.state.isDescriptionOpen ? 'Hide description' : 'Show description'}</span>
          {this.state.isDescriptionOpen
            ?
              <div style={{marginTop: '5px'}} dangerouslySetInnerHTML={{__html: build.description}} />
            : null}
        </div>
      </div>
    );
  }

}

export default BuildBox;
