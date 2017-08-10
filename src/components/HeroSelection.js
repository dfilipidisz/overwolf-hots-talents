import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Grid } from 'semantic-ui-react';
import { HEROES, FRANCHISES, ROLES } from '../constants';
import { toggleRole, toggleFranchise, changeQuery } from '../actions/heroes';
import { selectHero } from '../actions/app';
import { Scrollbars } from 'react-custom-scrollbars';
import HeroGrid from './HeroGrid';
import Separator from './Separator';

const RoleFilterItem = ({ role, select, isActive }) => {
  return (
    <div className={`filter ${role} ${isActive ? 'active' : ''}`} data-role={role} onClick={select} />
  );
};

const FranchiseFilterItem = ({ franchise, select, isActive }) => {
  return (
    <div className={`filter ${franchise} ${isActive ? 'active' : ''}`} data-franchise={franchise} onClick={select} />
  );
};

class HeroSelection extends React.Component {
  constructor () {
    super();

    this.toggleRole = this.toggleRole.bind(this);
    this.toggleFranchise = this.toggleFranchise.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }

  toggleRole (e) {
    this.props.toggleRole(e.target.dataset.role);
  }

  toggleFranchise (e) {
    this.props.toggleFranchise(e.target.dataset.franchise);
  }

  changeQuery(value) {
    this.props.changeQuery(value);
  }

  render () {
    const { filterRoles, filterFranchises, query } = this.props;

    return (
      <div className='hero-selection'>
        <div className='hero-filter'>
          <Grid columns={16}>
            <Grid.Column width={6} className='filter-left-part'>
              <div className='filter-box'>
                <Select
                  options={HEROES}
                  value={query}
                  placeholder={ <span>Search heroes</span> }
                  onChange={this.changeQuery}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid columns={16}>
                <Grid.Column width={8}>
                  <div className='filter-box'>
                    {ROLES.map((r) => {
                      return <RoleFilterItem key={r} role={r} select={this.toggleRole} isActive={filterRoles[r]} />;
                    })}
                  </div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <div className='filter-box'>
                    {FRANCHISES.map((f) => {
                      return <FranchiseFilterItem key={f} franchise={f} select={this.toggleFranchise} isActive={filterFranchises[f]} />;
                    })}
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
        <Separator title='Select a hero' />
        <div className='heroes-grid'>
          <Scrollbars
            style={{ height: '100%' }}
            renderThumbVertical={({ style, ...props }) =>
              <div {...props} style={{ ...style, backgroundColor: '#1f1f51', borderRadius: '2px' }}/>
            }
          >
            <HeroGrid
              filterFranchises={filterFranchises}
              filterRoles={filterRoles}
              query={query}
              selectHero={this.props.selectHero}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    filterRoles: state.heroes.filterRoles,
    filterFranchises: state.heroes.filterFranchises,
    query: state.heroes.query,
  }),
  { toggleRole, toggleFranchise, changeQuery, selectHero }
)(HeroSelection);
