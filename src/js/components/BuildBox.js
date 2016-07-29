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
          this.props.deleteBuild(this.state.build._id);
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

    return this.props.favorites.some((fav) => {
      return fav._id === id;
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
          console.log(res.builds);
          this.props.favoriteBuild(res.builds);
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
          console.log(res.builds);
          this.props.unFavoriteBuild(res.builds);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    const { build } = this.state;
//(this.isFavorite(build._id) ? this.unFavorite : this.favorite)
    return (
      <div className='build-box'>
        <div className='header'>
          <div className={'hero-portrait ' + build.hero} />
          <span>{build.name}</span>
          <i className={'favorite fa fa-star' + (this.isFavorite(build._id) ? ' active' : '')}
            onClick={() => {
              if (this.isFavorite(build._id)) {
                this.unFavorite();
              }
              else {
                this.favorite();
              }
            }}/>
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
          <div className='parcel hint--right' data-hint={build.talents[0]}><div className={`talent-pic ${getSimpleTalentName(build.talents[0])}`} /></div>
          <div className='parcel hint--right' data-hint={build.talents[1]}><div className={`talent-pic ${getSimpleTalentName(build.talents[1])}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[2]}><div className={`talent-pic ${getSimpleTalentName(build.talents[2])}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[3]}><div className={`talent-pic ${getSimpleTalentName(build.talents[3])}`} /></div>
          <div className='parcel hint--bottom' data-hint={build.talents[4]}><div className={`talent-pic ${getSimpleTalentName(build.talents[4])}`} /></div>
          <div className='parcel hint--left' data-hint={build.talents[5]}><div className={`talent-pic ${getSimpleTalentName(build.talents[5])}`} /></div>
          <div className='parcel hint--left' data-hint={build.talents[6]}><div className={`talent-pic ${getSimpleTalentName(build.talents[6])}`} /></div>
        </div>
        <div className='footer'>
          <span className='left'>{moment(build.createdAt).fromNow()} by {build.creator}</span>
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

export default connect (
  state => ({ username: state.user.username }),
  { updateBuild, deleteBuild, favoriteBuild, unFavoriteBuild }
)(BuildBox);
