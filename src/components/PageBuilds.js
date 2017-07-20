import React from 'react';
import { Message } from 'semantic-ui-react';

class PageBuilds extends React.Component {
  render () {
    return (
      <div style={{ padding: '15px' }}>
        <Message info>
          <Message.Header>Coming Soon!</Message.Header>
          <p>The builds section of the app is under re-construction, it will be available again soon!</p>
        </Message>
      </div>
    );
  }
}

export default PageBuilds;
