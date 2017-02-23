import React from 'react';
import { connect } from 'react-redux';
import { TALENTS_PAGES } from '../constants';
import SelectHero from './SelectHero';
import TalentTables from './TalentTables';
import Notifications from './Notifications';

class PageTalents extends React.Component {

  openGameTimer() {
    overwolf.windows.obtainDeclaredWindow('GameTimers', (result) => {
      if (result.status === 'success') {
        overwolf.windows.restore(result.window.id);
      }
    });
  }

  render() {
    const { page, isFetching } = this.props;

    if (isFetching) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    let type = 'popularity';

    if (page === TALENTS_PAGES.POPULARITY) {
      type = 'popularity';
    } else if (page === TALENTS_PAGES.WINRATE) {
      type = 'winrate';
    }

    return (
      <section>
        <Notifications />
        <button className='btn btn-primary btn-block open-gametimer' onClick={ this.openGameTimer }>Open Map Timings Helper</button>
        <SelectHero updateSize={ this.props.updateSize } />
        <TalentTables type={ type } updateSize={ this.props.updateSize } />
      </section>
    );
  }
}

PageTalents.propTypes = {
  page: React.PropTypes.string,
  isFetching: React.PropTypes.bool,
  updateSize: React.PropTypes.func,
};

module.exports = connect(
  state => ({ page: state.talents.page, isFetching: state.talents.isFetching })
)(PageTalents);
