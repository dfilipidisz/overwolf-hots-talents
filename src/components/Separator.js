import React from 'react';

const Separator = ({ title }) => {
  return (
    <div className='separator'>
      <div className='line' />
      <span className='title'>{title}</span>
    </div>
  );
};

export default Separator;
