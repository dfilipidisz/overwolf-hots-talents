import React from 'react';
const Vibrant = require('node-vibrant');

class PageTest extends React.Component {

  constructor(props) {
    super(props);

    this.intervalid = null;

    this.state = {
      url: '',
      vibrant: null
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
            this.setState({vibrant: palett});
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

    //<img src={this.state.url} style={{width: '200px'}} />

    if (this.state.vibrant !== null) {
      return (
        <section>
          <table style={{tableLayout: 'fixed', width: '100%'}}>
            <tbody>
              {Object.keys(this.state.vibrant).map((el) => {
                return (
                  <tr>
                    <td>{el}</td>
                    <td>{this.state.vibrant[el].population}</td>
                    <td><div style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: 'rgb('+this.state.vibrant[el].rgb[0]+', '+this.state.vibrant[el].rgb[1]+', '+this.state.vibrant[el].rgb[2]+')'}} /></td>
                    <td>{Vibrant.Util.rgbDiff(this.state.vibrant[el].rgb, [255, 255, 255])}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </section>
      );
    }

    return (
      <section>
      </section>
    );
  }
};

export default PageTest;
