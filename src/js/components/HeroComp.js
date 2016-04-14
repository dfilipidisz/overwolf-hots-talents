const React = require('react');
import { connect } from 'react-redux';
const { compRemoveHero } = require('../actions/teamcomp');

class HeroComp extends React.Component {
  
  render() {
    
    let { comp } = this.props;
    
    return (
      <ul className='hero-comp'>
        <li onClick={() => { this.props.compRemoveHero(comp[0]); }}>{comp[0] === undefined ? '' : <div className={'hero-portrait ' +comp[0]}/>} </li>
        <li onClick={() => { this.props.compRemoveHero(comp[1]); }}>{comp[1] === undefined ? '' : <div className={'hero-portrait ' +comp[1]}/>} </li>
        <li onClick={() => { this.props.compRemoveHero(comp[2]); }}>{comp[2] === undefined ? '' : <div className={'hero-portrait ' +comp[2]}/>} </li>
        <li onClick={() => { this.props.compRemoveHero(comp[3]); }}>{comp[3] === undefined ? '' : <div className={'hero-portrait ' +comp[3]}/>} </li>
        <li onClick={() => { this.props.compRemoveHero(comp[4]); }}>{comp[4] === undefined ? '' : <div className={'hero-portrait ' +comp[4]}/>} </li>
      </ul>
    );
  }
}

module.exports = connect(
  state => ({ comp: state.teamcomp.comp }),
  { compRemoveHero }
)(HeroComp);