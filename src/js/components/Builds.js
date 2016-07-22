import React from 'react';
import { connect } from 'react-redux';
import FavoriteBuilds from './FavoriteBuilds';
import AddNewBuild from './AddNewBuild';
import CommunityBuilds from './CommunityBuilds';
import MyBuilds from './MyBuilds';
import { loadUserBuilds } from '../actions/builds';

class Builds extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      tab: 'addnew'
    }
  }

  componentDidMount () {
    this.props.loadUserBuilds();
  }

  render () {
    if (this.props.loading) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    let { data, selectedHero } = this.props;

    if (selectedHero !== null) {
      let hero = data[selectedHero];

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
            ? <AddNewBuild hero={selectedHero} data={hero} />
            : null}

          {this.state.tab === 'community'
            ? <CommunityBuilds />
            : null}
        </div>
      );
    }

    return <div className='no-hero-selected-padding'><p>Please select a hero to see builds.</p></div>;
  }
}

export default connect(
  state => ({ selectedHero: state.talents.selectedHero, data: state.talents.data, loading: state.builds.loading }),
  { loadUserBuilds }
)(Builds);
