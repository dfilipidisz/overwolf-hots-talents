import React from 'react';
import { HEROES } from '../constants';
import AppPopup from './AppPopup';

const isFrancFilterSet = (filter) => {
  return !Object.keys(filter).every(f => filter[f] === false);
}

const isRoleFilterSet = (filter) => {
  return !Object.keys(filter).every(f => filter[f] === false);
}

const isQueryFilterSet = (filter) => {
  return filter !== null;
}

const HeroGrid = ({ filterFranchises, filterRoles, query, selectHero }) => {

  const filtered = [];
  const isFrancSet = isFrancFilterSet(filterFranchises);
  const isRoleSet = isRoleFilterSet(filterRoles);
  const isQuerySet = isQueryFilterSet(query);

  HEROES.forEach((hero) => {
    if ((isQuerySet && hero.label.toLowerCase().includes(query.label.toLowerCase())) || !isQuerySet) {
      if ((isFrancSet && isRoleSet) &&
          (filterFranchises[hero.franchise] && filterRoles[hero.role])) {
        filtered.push(hero);
      } else if ((isFrancSet && !isRoleSet) &&
          filterFranchises[hero.franchise]) {
        filtered.push(hero);
      } else if ((!isFrancSet && isRoleSet) &&
          filterRoles[hero.role]) {
        filtered.push(hero);
      } else if (!isFrancSet && !isRoleSet) {
        filtered.push(hero);
      }
    }
  });

  return (
    <div className='clearfix' style={{ padding: '10px' }}>
      {filtered.map((hero) => {
        return (
          <AppPopup
            position='bottom center'
            title={hero.label}
            key={hero.value}
          >
            <div className={`hero-pic in-grid ${hero.value}`} data-hero={hero.value} onClick={selectHero} />
          </AppPopup>
        );
      })}
    </div>
  );
}

export default HeroGrid;
