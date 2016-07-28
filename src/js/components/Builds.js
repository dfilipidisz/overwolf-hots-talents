import React from 'react';
import FavoriteBuilds from './FavoriteBuilds';
import AddNewBuild from './AddNewBuild';
import CommunityBuilds from './CommunityBuilds';
import MyBuilds from './MyBuilds';
import { connect } from 'react-redux';

class Builds extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      tab: 'favorites'
    }
  }

  render () {
    if (this.props.username === null) {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <p>Please Sign in to Overwolf to use the Community Builds functionality.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <ul className="builds-menu">
          <li
            className={this.state.tab === 'favorites' ? 'active hint--bottom' : 'hint--bottom'}
            onClick={() => {this.setState({tab: 'favorites'});}}
            aria-label='Favorites'>
            <i className='fa fa-star' /></li>
          <li
            className={this.state.tab === 'mybuilds' ? 'active hint--bottom' : 'hint--bottom'}
            onClick={() => {this.setState({tab: 'mybuilds'});}}
            aria-label='My Builds'>
            <i className='fa fa-book' /></li>
          <li
            className={this.state.tab === 'addnew' ? 'active hint--bottom' : 'hint--bottom'}
            onClick={() => {this.setState({tab: 'addnew'});}}
            aria-label='Create New Build'>
            <i className='fa fa-plus' /></li>
          <li
            className={this.state.tab === 'community' ? 'active hint--bottom' : 'hint--bottom'}
            onClick={() => {this.setState({tab: 'community'});}}
            aria-label='Community Builds'>
            <i className='fa fa-users' /></li>
        </ul>

        {this.state.tab === 'favorites'
          ? <FavoriteBuilds />
          : null}

        {this.state.tab === 'mybuilds'
          ? <MyBuilds />
          : null}

        {this.state.tab === 'addnew'
          ? <AddNewBuild />
          : null}

        {this.state.tab === 'community'
          ? <CommunityBuilds />
          : null}
      </div>
    );
  }
}

export default connect(
  state => ({ username: state.user.username })
)(Builds);
