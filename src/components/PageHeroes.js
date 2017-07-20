import React from 'react';
import { connect } from 'react-redux';
import HeroSelection from './HeroSelection';
import { Grid } from 'semantic-ui-react';
import Separator from './Separator';
import TalentStats from './TalentStats';
import TalentTypeChooser from './TalentTypeChooser';
import { Button } from 'semantic-ui-react';
import { HEROES } from '../constants';
import StatDetails from './StatDetails';

class PageHeroes extends React.Component {
  constructor() {
    super();

    this.openBuild = this.openBuild.bind(this);
    this.composeBuild = this.composeBuild.bind(this);
    this.openStatDetails = this.openStatDetails.bind(this);
    this.closeStatDetails = this.closeStatDetails.bind(this);

    this.state = {
      isStatDetailsOpen: false,
      statDetailsLvl: null,
    };
  }

  composeBuild() {
    const data = this.props.heroData;
    const { selectedHero, heroTalentFilter } = this.props;
    const hero = data[selectedHero];
    const lvls = ['1', '4', '7', '10', '13', '16', '20'];

    const build = [];

    lvls.forEach((lvl) => {
      let topTalent = null;

      let topp = 0;
      hero[`lvl${lvl}`].forEach((talent) => {
        if (parseFloat(talent[heroTalentFilter]) > topp) {
          topp = parseFloat(talent[heroTalentFilter]);
          topTalent = Object.assign({}, talent);
        }
      });

      build.push(topTalent);
    });

    return {
      talents: build,
      hero: HEROES.find(h => h.value === selectedHero),
      buildName: heroTalentFilter === 'popularity' ? 'Popular Build (HotsLogs)' : 'Winrate Build (HotsLogs)',
    };
  }

  openBuild() {
    overwolf.windows.sendMessage(this.props.widgetWindowid, 'show-yourself', null, () => {});
    overwolf.windows.sendMessage(this.props.widgetWindowid, 'open-build', this.composeBuild(), (e) => {console.log('send', e);});
  }

  openStatDetails(lvl) {
    this.setState({ isStatDetailsOpen: true, statDetailsLvl: lvl });
  }

  closeStatDetails() {
    this.setState({ isStatDetailsOpen: false, statDetailsLvl: null });
  }

  render () {
    const { selectedHero, forceSelection } = this.props;

    if (selectedHero === null || forceSelection) {
      return <HeroSelection />;
    }


    return (
      <div className='page-heroes'>
        <Grid columns={16}>
          <Grid.Column width={8}>
            <Separator title='Individual Talent Stats' />
            <TalentTypeChooser />
            <TalentStats data={this.props.heroData} selectedHero={selectedHero} openStatDetails={this.openStatDetails} />
            <div style={{ padding: '0 10px', marginTop: '11px' }}>
              <Button secondary fluid compact icon='external' labelPosition='right' content="Show this build in-game" onClick={this.openBuild} />
            </div>
          </Grid.Column>
          <Grid.Column width={8} style={{paddingLeft: 0}}>
            <StatDetails open={this.state.isStatDetailsOpen} close={this.closeStatDetails} lvl={this.state.statDetailsLvl} data={this.props.heroData} selectedHero={selectedHero} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedHero: state.app.selectedHero,
    forceSelection: state.app.forceSelection,
    heroData: state.app.heroData,
    widgetWindowid: state.app.widgetWindowid,
    windowid: state.app.windowid,
    heroTalentFilter: state.app.heroTalentFilter,
  })
)(PageHeroes);
