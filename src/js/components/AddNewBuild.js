import React from 'react';
import { connect } from 'react-redux';
import TalentDropdown from './TalentDropdown';
import * as constants from '../constants';
import { checkStatus, makeFetchInit } from '../utility';
import { addNewBuild } from '../actions/builds';
import { loadAllBuilds } from '../actions/builds';

class AddNewBuild extends React.Component {

  constructor (props) {
    super(props);

    this.changeName = this._changeName.bind(this);
    this.changeDescription = this._changeDescription.bind(this);
    this.changeTalent = this._changeTalent.bind(this);
    this.checkBuild = this._checkBuild.bind(this);
    this.resetFields = this._resetFields.bind(this);

    this.state = {
      name: '',
      description: '',
      talents: [null, null, null, null, null, null, null],
      isPublic: true,
      isAnonymous: false,
      isLastOpen: false,
      warning: null,
      formLoading: false
    }
  }

  componentDidMount () {
    if (this.props.builds === null) {
      this.props.loadAllBuilds();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.selectedHero !== this.props.selectedHero) {
      this.resetFields();
    }
  }

  _resetFields () {
    this.setState({
      name: '',
      description: '',
      talents: [null, null, null, null, null, null, null],
      isPublic: true,
      isAnonymous: false,
      isLastOpen: false,
      warning: null,
      formLoading: false
    });
  }

  _changeName (e) {
    this.setState({name: e.target.value});
  }

  _changeDescription (e) {
    this.setState({description: e.target.value});
  }

  _changeTalent (lvl, value) {
    const newTalents = this.state.talents.slice(0);

    newTalents[parseInt(lvl, 10)] = value;
    this.setState({talents: newTalents});
  }

  _checkBuild (e) {
    e.preventDefault();

    this.setState({formLoading: true});

    let fieldsMissing = [];

    if (this.state.name === '') { fieldsMissing.push('Build Name');}
    this.state.talents.forEach((tier, tierIndex) => {
      if (tier === null) {
        let lvl = 0;
        switch (tierIndex) {
          case 0: lvl = 1; break;
          case 1: lvl = 4; break;
          case 2: lvl = 7; break;
          case 3: lvl = 10; break;
          case 4: lvl = 13; break;
          case 5: lvl = 16; break;
          case 6: lvl = 20; break;
        }
        fieldsMissing.push(`Lvl ${lvl} Talent`);
      }
    });

    if (fieldsMissing.length !== 0) {
      this.setState({warning: (<p style={{marginTop: '0px'}}>
        Please make sure the following fields are filled out:
        {fieldsMissing.map((field, index) => {
          if (index === fieldsMissing.length - 1) {
            return <b key={field}> {field}</b>;
          }
          return <b key={field}> {field},</b>;
        })}
      </p>),
      formLoading: false});
    }
    else {

      if (this.props.username === null || this.props.username === undefined) {
        this.setState({
          warning: <p style={{marginTop: '0px'}}>Please make sure you are signed in to Overwolf to use this feature.</p>,
          formLoading: false
        });
      }
      else {
        // Save the build to server

        const fetchInit = makeFetchInit(undefined, undefined, {
          name: this.state.name,
          description: this.state.description,
          talents: this.state.talents,
          isPublic: this.state.isPublic,
          isAnonymous: this.state.isAnonymous,
          username: this.props.username,
          hero: this.props.selectedHero
        });

        fetch(`${constants.SERVER_URL}/api/save-build`, fetchInit)
          .then(checkStatus)
          .then(response => response.json())
          .then((res) => {
            if (res.success) {
              this.resetFields();
              this.props.addNewBuild(res.build);
            }
            else {
              this.setState({
                warning: <p style={{marginTop: '0px'}}>{res.error}</p>,
                formLoading: false
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              warning: <p style={{marginTop: '0px'}}>Server error. Please try again later.</p>,
              formLoading: false
            });
          });
      }
    }
  }

  render () {
    if (this.props.builds === null) {
      return (
        <section className='loading'>
          <i className='fa fa-circle-o-notch fa-spin' />
        </section>
      );
    }

    if (this.props.selectedHero === null) {
      return <div className='no-hero-selected-padding'><p>Please select a hero to add a new build.</p></div>;
    }

    const data = this.props.data[this.props.selectedHero];
    const heroName = constants.HEROES.find((el) => {return el.value === this.props.selectedHero;});

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <h3 style={{marginTop: '5px', marginBottom: '5px'}}>Create New Build for {heroName.label}</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
            <input type='text' className='form-control oht-input' placeholder='Build Name' value={this.state.name} onChange={this.changeName} />
            <textarea rows='11' className='form-control oht-input' placeholder='Build Description (optional)' value={this.state.description} onChange={this.changeDescription} />
          </div>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='talent-dropdown-container'>
              <span className='lvl'>1</span>
              <TalentDropdown data={data} lvl='1' value={this.state.talents[0]} onChange={this.changeTalent.bind(this, 0)} />
            </div>
            <div className='talent-dropdown-container'>
              <span className='lvl'>4</span>
              <TalentDropdown data={data} lvl='4' value={this.state.talents[1]} onChange={this.changeTalent.bind(this, 1)} />
            </div>
            <div className='talent-dropdown-container'>
              <span className='lvl'>7</span>
              <TalentDropdown data={data} lvl='7' value={this.state.talents[2]} onChange={this.changeTalent.bind(this, 2)} />
            </div>
            <div className='talent-dropdown-container'>
              <span className='lvl'>10</span>
              <TalentDropdown data={data} lvl='10' value={this.state.talents[3]} onChange={this.changeTalent.bind(this, 3)} />
            </div>
            <div className='talent-dropdown-container'>
              <span className='lvl'>13</span>
              <TalentDropdown data={data} lvl='13' value={this.state.talents[4]} onChange={this.changeTalent.bind(this, 4)}
                onOpen={() => {this.setState({isLastOpen: true});}}
                onClose={() => {this.setState({isLastOpen: false});}} />
            </div>
            <div className='talent-dropdown-container'>
              <span className='lvl'>16</span>
              <TalentDropdown data={data} lvl='16' value={this.state.talents[5]} onChange={this.changeTalent.bind(this, 5)}
                onOpen={() => {this.setState({isLastOpen: true});}}
                onClose={() => {this.setState({isLastOpen: false});}}/>
            </div>
            <div className='talent-dropdown-container'>
              <span className='lvl'>20</span>
              <TalentDropdown data={data} lvl='20' value={this.state.talents[6]} onChange={this.changeTalent.bind(this, 6)}
                onOpen={() => {this.setState({isLastOpen: true});}}
                onClose={() => {this.setState({isLastOpen: false});}}/>
            </div>
            {this.state.isLastOpen
              ? <div className='no-hero-selected-padding'></div>
              : null}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
            {this.state.warning
              ?
                <div className='alert alert-warning' style={{borderRadius: '0px'}}>
                  {this.state.warning}
                </div>
              : null}
          </div>
          <div className='col-xs-12 col-sm-5 col-md-5 col-lg-5'>
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.state.isPublic}
                  onChange={() => {this.setState({isPublic: !this.state.isPublic});}} />
                  Public <small>(can be seen by everyone)</small>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.state.isAnonymous}
                  disabled={!this.state.isPublic}
                  onChange={() => {this.setState({isAnonymous: !this.state.isAnonymous});}}/> Anonymous <small>(hides your name)</small>
              </label>
            </div>
            <button className='pure-button pure-button-primary'
              style={{borderRadius: '0px'}}
              onClick={this.checkBuild}
              disabled={this.state.formLoading}>{this.state.formLoading ? <i className='fa fa-circle-o-notch fa-spin' /> : 'Save New Build'}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({builds: state.builds.builds, data: state.talents.data, username: state.user.username, selectedHero: state.talents.selectedHero }),
  { addNewBuild }
)(AddNewBuild);
