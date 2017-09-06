import React from 'react';
import { connect } from 'react-redux';
import { Button, Message } from 'semantic-ui-react';
import HeroSelection from './HeroSelection';
import Separator from './Separator';
import { HEROES } from '../constants';
import CreateNewBuild from './CreateNewBuild';
import BuildBox from './BuildBox';
import { openNewBuild, getBuilds } from '../actions/builds';

class PageBuilds extends React.Component {
  constructor() {
    super();

    this.openNewBuild = this.openNewBuild.bind(this);
  }

  componentDidMount() {
    if (!this.props.isLoading) {
      this.props.getBuilds();
    }
  }

  openNewBuild() {
    this.props.openNewBuild(this.props.selectedHero);
  }

  render () {
    const { selectedHero, forceSelection, isCreatingNew, builds, error, isLoading } = this.props;

    if (selectedHero === null || forceSelection) {
      return <HeroSelection />;
    }

    if (isCreatingNew) {
      return (
        <CreateNewBuild heroData={this.props.heroData} />
      );
    }

    const hero = HEROES.find(h => h.value === selectedHero);

    return (
      <div className='page-builds'>
        <Separator title={`Your ${hero.label} Builds`} />

        {isLoading && (
          <p style={{ textAlign: 'center' }}><i className="fa fa-circle-o-notch fa-spin" /></p>
        )}

        {error && (
          <Message negative>
            <Message.Header>
              Error
            </Message.Header>
            <p>{error}</p>
          </Message>
        )}

        <div className="build-box-holder">
          {builds.filter(b => b.hero === selectedHero).map((build) => {
            return (
              <BuildBox key={build.id} data={build} hero={selectedHero} talentData={this.props.heroData[selectedHero]} />
            );
          })}
        </div>

        <div className="builds-add-new">
          <Button fluid compact icon='plus' color="blue" labelPosition='right' content="Create New Build" onClick={this.openNewBuild} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedHero: state.app.selectedHero,
    forceSelection: state.app.forceSelection,
    heroData: state.app.heroData,
    isCreatingNew: state.builds.isCreatingNew,
    builds: state.builds.builds,
    isLoading: state.builds.isLoading,
    error: state.builds.error,
  }),
  {
    openNewBuild,
    getBuilds,
  }
)(PageBuilds);
