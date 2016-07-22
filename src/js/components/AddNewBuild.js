import React from 'react';
import { connect } from 'react-redux';
import TalentDropdown from './TalentDropdown';

class AddNewBuild extends React.Component {

  constructor (props) {
    super(props);

    this.changeName = this._changeName.bind(this);
    this.changeTalent = this._changeTalent.bind(this)

    this.state = {
      name: '',
      description: '',
      talents: [null, null, null, null, null, null, null]
    }
  }

  _changeName (e) {
    this.setState({name: e.target.value});
  }

  _changeTalent (lvl, value) {
    const newTalents = this.state.talents.slice(0);

    newTalents[parseInt(lvl, 10)] = value;
    this.setState({talents: newTalents});
  }

  render () {
    const { data } = this.props;

    return (
      <div className='row'>
        <h4 style={{marginTop: '5px', marginBottom: '5px'}}>Create New Build for {this.props.hero}</h4>
        <input type='text' className='form-control oht-input' placeholder='Build Name' value={this.state.name} onChange={this.changeName} />
        <textarea  rows='4' className='form-control oht-input' placeholder='Build Description (optional)' value={this.state.description} />
        <TalentDropdown data={data} lvl='1' value={this.state.talents[0]} onChange={this.changeTalent.bind(this, 0)} />
        <TalentDropdown data={data} lvl='4' value={this.state.talents[1]} onChange={this.changeTalent.bind(this, 1)} />
        <TalentDropdown data={data} lvl='7' value={this.state.talents[2]} onChange={this.changeTalent.bind(this, 2)} />
        <TalentDropdown data={data} lvl='10' value={this.state.talents[3]} onChange={this.changeTalent.bind(this, 3)} />
        <TalentDropdown data={data} lvl='13' value={this.state.talents[4]} onChange={this.changeTalent.bind(this, 4)} />
        <TalentDropdown data={data} lvl='16' value={this.state.talents[5]} onChange={this.changeTalent.bind(this, 5)} />
        <TalentDropdown data={data} lvl='20' value={this.state.talents[6]} onChange={this.changeTalent.bind(this, 6)} />
      </div>
    );
  }
}

export default connect(
  state => ({ builds: state.builds.builds })
)(AddNewBuild);
