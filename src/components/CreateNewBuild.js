import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import cn from 'classnames';
import TalentDropdown from './TalentDropdown';
import { closeNewBuild } from '../actions/builds';
import { changeName, saveNewBuild } from '../actions/newBuild';

const lvls = ['1', '4', '7', '10', '13', '16', '20'];

class NewBuildTalentChooser extends React.Component {
  constructor() {
    super();

    this.changeOpenLvl = this.changeOpenLvl.bind(this);

    this.state = {
      openLvl: null,
    };
  }

  changeOpenLvl(lvl) {
    this.setState({ openLvl: lvl });
  }

  render() {
    const { hero, heroData, talents } = this.props;
    const { openLvl } = this.state;

    return (
      <div className="new-build-talent-chooser">
        {lvls.map((lvl) => {
          return (
            <TalentDropdown key={lvl} lvl={lvl} openLvl={openLvl} hero={hero} talents={heroData[hero][`lvl${lvl}`]} onOpen={this.changeOpenLvl} selectedTalents={talents} />
          );
        })}
      </div>
    );
  }
}

class CreateNewBuild extends React.Component {
  render() {
    const { newBuild } = this.props;
    return (
      <div className='page-builds'>
        <Form>
          <Form.Input label='Build Name' value={newBuild.name} onChange={this.props.changeName} />
          <Form.Field>
            <label>Select Talents</label>
            <NewBuildTalentChooser hero={newBuild.hero} heroData={this.props.heroData} talents={newBuild.talents} />
          </Form.Field>
        </Form>

        {newBuild.error && (
          <Message negative>
            <Message.Header>
              Error
            </Message.Header>
            <p>{newBuild.error}</p>
          </Message>
        )}

        <div className="new-build-save">
          <Button fluid compact icon='save' color="green" labelPosition='right' content="Save New Build" onClick={this.props.saveNewBuild} />
        </div>
        <div className="new-build-cancel">
          <Button fluid compact icon='remove' color="red" labelPosition='right' content="Cancel" onClick={this.props.closeNewBuild} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    newBuild: state.newBuild,
  }),
  {
    closeNewBuild,
    changeName,
    saveNewBuild,
  }
)(CreateNewBuild);
