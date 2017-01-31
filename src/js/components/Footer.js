import RogIcon from '../../img/rog.png';

const React = require('react');

module.exports = function Footer() {
  return (
    <footer>
      <p>Data provided by <a href='http://www.hotslogs.com' target='_blank'>hotslogs.com</a><span className='divider'>|</span><img src={RogIcon} width='50' /></p>
    </footer>
  );
}
