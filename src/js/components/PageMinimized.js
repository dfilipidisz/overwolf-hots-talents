const React = require('react');
import { PAGES, ANALYTICS_URL } from '../constants';
import { connect } from 'react-redux';
const { receiveSessionid } = require('../actions/analytics');

/*module.exports = */class PageMinimized extends React.Component {
  
  componentWillMount () {
    this.props.fetchTalentData();
    
    let fetchInit = {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event: "start-app"})
    };
      
    return fetch(ANALYTICS_URL, fetchInit)
      .then(response => response.json())  //parse json
      .then((res) => { 
        console.log('Got sessionid');
        console.log(res);
        
        this.props.receiveSessionid(res.sessionid);
      });

  }
  
  render() {
    return (
      <div id='page-minimized' onClick={ (e) => { this.props.navigateTo(PAGES.TALENTS); } }>
        <img src='img/Icon.png' width='50' height='50' />
      </div>
    );
  }
};

module.exports = connect(
  state => ({  }),
  { receiveSessionid }
)(PageMinimized);