import React from 'react';
import { connect } from 'react-redux';
import { checkStatus, makeFetchInit } from '../utility';
const getSimpleTalentName = require('../utilities/getSimpleTalentName');
import * as constants from '../constants';
import moment from 'moment';
import { updateBuild, deleteBuild, favoriteBuild, unFavoriteBuild } from '../actions/builds';

class BuildBox extends React.Component {

  constructor (props) {
    super(props);

    this.updateBuild = this._updateBuild.bind(this);
    this.changePublicState = this._changePublicState.bind(this);
    this.changeAnonState = this._changeAnonState.bind(this);
    this.deleteBuild = this._deleteBuild.bind(this);
    this.favorite = this._favorite.bind(this);
    this.unFavorite = this._unFavorite.bind(this);
    this.isFavorite = this._isFavorite.bind(this);

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
          this.props.updateBuild(this.state.build._id, part);
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

  _deleteBuild (e) {
    e.preventDefault();

    const fetchInit = makeFetchInit(undefined, undefined, {
      username: this.props.username,
      id: this.state.build._id
    });

    fetch(`${constants.SERVER_URL}/api/delete-build`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          this.props.deleteBuild(this.state.build._id, res.favorites);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _isFavorite (id) {
    if (this.props.favorites === null) {
      return false;
    }

    return this.props.favorites.some((favorite) => {
      return favorite === id;
    });
  }

  _favorite () {
    const fetchInit = makeFetchInit(undefined, undefined, {
      username: this.props.username,
      buildid: this.state.build._id
    });

    fetch(`${constants.SERVER_URL}/api/add-favorite-build`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          this.props.favoriteBuild(this.state.build._id, res.favorites);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _unFavorite () {
    const fetchInit = makeFetchInit(undefined, undefined, {
      username: this.props.username,
      buildid: this.state.build._id
    });

    fetch(`${constants.SERVER_URL}/api/remove-favorite-build`, fetchInit)
      .then(checkStatus)
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          this.props.unFavoriteBuild(this.state.build._id, res.favorites);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    const { build } = this.state;

    return (
      <div className='build-box'>
        <div className='header'>
          <div className={'hero-portrait ' + build.hero} />
          <span>{build.name}</span>
          <i className={'favorite fa fa-star' + (this.isFavorite(build._id) ? ' active' : '') + (this.props.hideSettings || build.creator !== this.props.username ? ' moveRight' : '')}
            onClick={() => {
              if (this.isFavorite(build._id)) {
                this.unFavorite();
              }
              else {
                this.favorite();
              }
            }}/>
          {this.props.hideSettings || build.creator !== this.props.username
            ? null
            :
              <i className='settings-toggle fa fa-cog active'
                onClick={() => {
                  this.setState({isSettingsOpen: !this.state.isSettingsOpen});
                }} />
          }
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
                    <button className='pure-button button-error button-xsmall' onClick={this.deleteBuild}>Delete</button>
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
          <div className='parcel hint--right' data-hint={build.talents[0]}><div className={`talent-pic ${getSimpleTalentName(build.talents[0], this.props.selectedHero)}`} /></div>
          <div className='parcel hint--right' data-hint={build.talents[1]}><div className={`talent-pic ${getSimpleTalentName(build.talents[1], this.props.selectedHero)}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[2]}><div className={`talent-pic ${getSimpleTalentName(build.talents[2], this.props.selectedHero)}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[3]}><div className={`talent-pic ${getSimpleTalentName(build.talents[3], this.props.selectedHero)}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[4]}><div className={`talent-pic ${getSimpleTalentName(build.talents[4], this.props.selectedHero)}`} /></div>
          <div className='parcel hint--left' data-hint={build.talents[5]}><div className={`talent-pic ${getSimpleTalentName(build.talents[5], this.props.selectedHero)}`} /></div>
          <div className='parcel hint--left' data-hint={build.talents[6]}><div className={`talent-pic ${getSimpleTalentName(build.talents[6], this.props.selectedHero)}`} /></div>
        </div>
        <div className='footer'>
          <span className='left'>{moment(build.createdAt).fromNow()} by {build.creator}</span>
          {build.description === ''
            ? null
            : (<span className='right' onClick={() => {
                this.setState({isDescriptionOpen: !this.state.isDescriptionOpen});
              }}>{this.state.isDescriptionOpen ? 'Hide description' : 'Show description'}</span>
            )}
          {build.description === ''
            ? null
            : (this.state.isDescriptionOpen
              ?
                <div style={{marginTop: '5px'}} dangerouslySetInnerHTML={{__html: build.description}} />
              : null)}
        </div>
      </div>
    );
  }
}

BuildBox.propTypes = {
  build: React.PropTypes.object.isRequired,
  favorites: React.PropTypes.array.isRequired,
  hideSettings: React.PropTypes.bool
};

export default connect (
  state => ({ username: state.user.username, selectedHero: state.talents.selectedHero }),
  { updateBuild, deleteBuild, favoriteBuild, unFavoriteBuild }
)(BuildBox);
