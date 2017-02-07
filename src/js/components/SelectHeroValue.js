import React from 'react';

const SelectHeroValue = (props) => {
  return (
    <div className='Select-value' title={ props.value.title }>
      <span className='Select-value-label'>
        <div className={ `hero-portrait ${props.value.value}` } />
        {props.children}
      </span>
    </div>
  );
};

SelectHeroValue.propTypes = {
  children: React.PropTypes.node,
  value: React.PropTypes.object,
};

export default SelectHeroValue;
