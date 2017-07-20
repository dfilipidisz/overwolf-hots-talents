import React from 'react';
import AppPopup from './AppPopup';
import { Motion, spring } from 'react-motion';

const MinimizedWidget = ({ closeWidget, openMain, openDetails }) => {
  return (
    <div className='mini-widget'>
      <AppPopup
        position='right center'
        title='Open Main Window'
      >
        <div className='main-toggle' onClick={openMain}><i className='fa fa-circle-o' /></div>
      </AppPopup>
      <div className='open-details' onMouseEnter={openDetails}><i className='fa fa-chevron-right' /></div>
      <AppPopup
        position='right center'
        title='Close In-Game Widget'
      >
        <div className='close-widget' onClick={closeWidget}><i className='fa fa-remove' /></div>
      </AppPopup>
    </div>
  );
};

const levels = ['1', '4', '7', '10', '13', '16', '20'];

const WidgetDetails = ({ open, closeDetails, build }) => {
  return (
    <Motion style={ { x: spring(open ? 0 : -230) } }>
      {({ x }) => (
        <div className='widget-details' onMouseLeave={closeDetails} style={{transform: `translateX(${x}px)`}}>
          <div className='widget-talents'>
            {build && build.talents.map((level, i) => {
              return (
                <div className='talent-row' key={level.id}>
                  <div className='lvl'><span>{levels[i]}</span></div>

                  <div className='talent-holder clearfix'>
                    <div className='img-holder'>
                      <div className={`talent-pic ${build.hero.value} ${level.id}`} />
                    </div>
                    <div className='text-holder'>
                      <p>{level.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Motion>
  );
};

class Widget extends React.Component {
  constructor() {
    super();

    this.closeWidget = this.closeWidget.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.openMain = this.openMain.bind(this);
    this.openDetails = this.openDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);

    this.state = {
      isVisible: false,
      ownId: null,
      mainId: null,
      isDetailsOpen: false,
      build: null,
    };
  }

  componentDidMount() {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.status === "success") {
        // Ensure the correct window size
        this.setState({ ownId: result.window.id });

        overwolf.windows.changeSize(result.window.id, 240, 300);
        overwolf.windows.changePosition(result.window.id, 0, 50);

        overwolf.windows.onMessageReceived.addListener(this.receiveMessage);
      } else {
        // TODO: handle error case
        console.error(result);
      }
    });
  }

  componentWillUnmount() {
    overwolf.windows.onMessageReceived.removeListener(this.receiveMessage);
  }

  receiveMessage(payload) {
    console.log(payload);

    switch (payload.id) {
      case 'init-data':
        this.setState({ mainId: payload.content.mainWindowId });
        break;
      case 'show-yourself':
        this.setState({ isVisible: true });
        break;
      case 'hide-yourself':
        this.setState({ isVisible: false });
        break;
      case 'open-build':
        this.setState({ build: payload.content });
        break;
    }

  }

  closeWidget() {
    overwolf.windows.sendMessage(this.state.mainId, 'request-hide', null, () => {});
  }

  openMain() {
    overwolf.windows.sendMessage(this.state.mainId, 'open-main', null, () => {});
  }

  openDetails() {
    this.setState({ isDetailsOpen: true });
  }

  closeDetails() {
    this.setState({ isDetailsOpen: false });
  }

  render () {
    const { isVisible, isDetailsOpen, build } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <div style={{backgroundColor: 'transparent', width: '240px', height: '300px', position: 'relative'}}>
        <MinimizedWidget closeWidget={this.closeWidget} openMain={this.openMain} openDetails={this.openDetails} />
        <WidgetDetails open={isDetailsOpen} closeDetails={this.closeDetails} build={build} />
      </div>
    );
  }
}

export default Widget;
