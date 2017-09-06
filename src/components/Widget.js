import React from 'react';
import AppPopup from './AppPopup';
import { Motion, spring } from 'react-motion';

class MinimizedWidget extends React.Component {
  render () {
    const { closeWidget, openMain, openDetails, isDetailsOpen, openOn } = this.props;

    const toggleProps = {};
    if (openOn === 'hover') {
      toggleProps.onMouseEnter = openDetails;
    } else {
      toggleProps.onClick = openDetails;
    }

    return (
      <div className='mini-widget' style={{ display: isDetailsOpen ? 'none' : 'block'}}>
        <AppPopup
          position='right center'
          title='Open Main Window'
        >
          <div className='main-toggle' onClick={openMain}><i className='fa fa-circle-o' /></div>
        </AppPopup>
        <AppPopup
          position='right center'
          title='Show Build'
        >
          <div className='open-details' {...toggleProps}><i className='fa fa-chevron-right' /></div>
        </AppPopup>
        <AppPopup
          position='right center'
          title='Close In-Game Widget'
        >
          <div className='close-widget' onClick={closeWidget}><i className='fa fa-remove' /></div>
        </AppPopup>
      </div>
    );
  }
};

const levels = ['1', '4', '7', '10', '13', '16', '20'];

class WidgetDetails extends React.Component {
  constructor() {
    super();

    this.callClose = this.callClose.bind(this);

    this.state = {
      timeOpened: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({ timeOpened: Date.now() });
    }
  }

  callClose() {
    // Add a slight no-op window to prevent flip-flopping of opening
    if (Date.now() - this.state.timeOpened > 200) {
      this.props.closeDetails();
    }
  }

  render () {
    const { open, build, opacity, closeOn } = this.props;

    const toggleProps = {};
    if (closeOn === 'hover') {
      toggleProps.onMouseLeave = this.callClose;
    } else {
      toggleProps.onClick = this.callClose;
    }

    return (
      <Motion style={ { x: spring(open ? 0 : -230) } }>
        {({ x }) => (
          <div className='widget-details' {...toggleProps} style={{transform: `translateX(${x}px)`, opacity, cursor: closeOn === 'click' ? 'pointer' : 'default'}}>
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
  }
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
      opacity: 1,
      openOn: 'hover',
      closeOn: 'hover',
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
    switch (payload.id) {
      case 'init-data':
        this.setState({
          mainId: payload.content.mainWindowId,
          opacity: payload.content.settings.opacity,
          openOn: payload.content.settings.openOn,
          closeOn: payload.content.settings.closeOn,
        });
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
      case 'update-settings':
        this.setState({ opacity: payload.content.opacity, openOn: payload.content.openOn, closeOn: payload.content.closeOn });
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
    const { isVisible, isDetailsOpen, build, opacity, openOn, closeOn } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <div style={{backgroundColor: 'transparent', width: '240px', height: '300px', position: 'relative'}}>
        <MinimizedWidget closeWidget={this.closeWidget} openMain={this.openMain} openDetails={this.openDetails} isDetailsOpen={isDetailsOpen} openOn={openOn} />
        <WidgetDetails open={isDetailsOpen} closeDetails={this.closeDetails} build={build} opacity={opacity} closeOn={closeOn} />
      </div>
    );
  }
}

export default Widget;
