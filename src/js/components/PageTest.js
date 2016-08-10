import React from 'react';
const Vibrant = require('node-vibrant');

class PageTest extends React.Component {

  constructor(props) {
    super(props);

    this.intervalid = null;

    this.state = {
      url: ''
    };
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('UPDATE');
    console.log(nextState);
  }

  componentDidMount () {
    this.intervalid = setInterval(() => {
      overwolf.media.getScreenshotUrl({
        roundAwayFromZero: 'true',
        crop: {
          x: -0.45,
          y: -0.025,
          width: -0.1,
          height: -0.15
        },
        rescale: {
          width: 100,
          height: 100
        }
      }, (result) => {
        if (result.status === 'success') {
          //this.setState({url: u});
          const V = new Vibrant(result.url);
          V.getPalette((err, palett) => {
            console.log(err);
            console.log(palett);
          });
        }
        else {
          console.log('ERROR');
          console.log(result);
        }
      });
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.intervalid);
  }

  render() {
    return (
      <section>
        <img src={this.state.url} style={{width: '200px'}} />
      </section>
    );
  }
};

export default PageTest;
