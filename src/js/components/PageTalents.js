import React from 'react';
import { connect } from 'react-redux';
import { TALENTS_PAGES } from '../constants';
import SelectHero from './SelectHero';
import TalentTables from './TalentTables';
import Notifications from './Notifications';
import ProBuilds from './ProBuilds';

class PageTalents extends React.Component {

  render() {
    const { page, isFetching } = this.props;

    if (isFetching) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    if (page === TALENTS_PAGES.PROBUILDS) {
      return <ProBuilds />;
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
