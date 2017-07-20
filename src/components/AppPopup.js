import React from 'react';
import { Popup } from 'semantic-ui-react';

const AppPopup = ({ children, title, position }) => {
  return (
    <Popup
      trigger={children}
      content={title}
      basic
      position={position}
      size='mini'
    />
  );
}

export default AppPopup;
