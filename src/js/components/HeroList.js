const React = require('react');
import { HEROES } from '../constants';
import { connect } from 'react-redux';
const { compAddHero } = require('../actions/teamcomp');

class HeroList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.isInComp = this.isInComp.bind(this);
  }
  
  isInComp(hero) {
    return this.props.comp.indexOf(hero) > -1 ? true: false;
  }
  
  render() {
    let items = [];
    
    HEROES.forEach((hero) => {
      if (this.props.filter !== '') {
        if (hero.label.toLowerCase().indexOf(this.props.filter.toLowerCase()) > -1 ) {
          if (!this.isInComp(hero.label)) {
            items.push(
              <div key={hero.value} className='hero-list-item' onClick={() => {this.props.compAddHero(hero.label)}}>
                {hero.label}
              </div>
            );  
          } 
        }  
      }
      else {
        if (!this.isInComp(hero.label)) {
          items.push(
            <div key={hero.value} className='hero-list-item' onClick={() => {this.props.compAddHero(hero.label)}}>
              {hero.label}
            </div>
          );
        }
      }
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