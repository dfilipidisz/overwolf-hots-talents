const React = require('react');
import { HEROES } from '../constants';
import { connect } from 'react-redux';
const { compAddHero } = require('../actions/teamcomp');

class HeroList extends React.Component {

  constructor(props) {
    super(props);

    this.isInComp = this.isInComp.bind(this);
    this.buildHeroesList = this.buildHeroesList.bind(this);
  }

  buildHeroesList() {
    let heroes = [];

    //Copy all heroes, except the one that are in comp or filtered out
    HEROES.forEach((hero) => {
      if (this.props.filter !== '') {
        if (hero.label.toLowerCase().indexOf(this.props.filter.toLowerCase()) > -1 ) {
          if (!this.isInComp(hero.value)) {
            heroes.push({value: hero.value, label: hero.label, winrate: 0});
          }
        }
      }
      else {
        if (!this.isInComp(hero.value)) {
          heroes.push({value: hero.value, label: hero.label, winrate: 0});
        }
      }
    });

    //Search highest winrates for these heroes from the provided comp list
    let i;
    heroes.forEach((hero) => {
      //Look for the highest winrate comp this hero is in
      for (i = 0; i < this.props.list.length; i++) {
        if (this.props.list[i].heroes.indexOf(hero.label) > -1) {
          hero.winrate = this.props.list[i].winp;
          break;
        }
      }
    });

    //Sort by winrate
    heroes = heroes.sort((a, b) => {
      if (parseFloat(a.winrate) > parseFloat(b.winrate)) { return -1; }
      if (parseFloat(a.winrate) < parseFloat(b.winrate)) { return 1; }
      return 0;
    });
    
    return heroes;
  }

  isInComp(hero) {
    return this.props.comp.indexOf(hero) > -1 ? true: false;
  }

  render() {
    let items = [];

    /*HEROES.forEach((hero) => {
      if (this.props.filter !== '') {
        if (hero.label.toLowerCase().indexOf(this.props.filter.toLowerCase()) > -1 ) {
          if (!this.isInComp(hero.value)) {
            items.push(
              <div key={hero.value} className='hero-list-item' onClick={() => {this.props.compAddHero(hero.value)}}>
                {hero.label}
              </div>
            );
          }
        }
      }
      else {
        if (!this.isInComp(hero.label)) {
          items.push(
            <div key={hero.value} className='hero-list-item' onClick={() => {this.props.compAddHero(hero.value)}}>
              {hero.label}
            </div>
          );
        }
      }
    });*/

    let heroes = this.buildHeroesList();
    heroes.forEach((hero) => {
      items.push(
        <div key={hero.value} className='hero-list-item' onClick={() => {this.props.compAddHero(hero.value)}}>
          {hero.label} - {hero.winrate}
        </div>
      );
    });

    return (
      <div className='hero-list'>
        {items}
      </div>
    );
  }
}

module.exports = connect(
  state => ({ filter: state.teamcomp.filter, comp: state.teamcomp.comp }),
  { compAddHero }
)(HeroList);
