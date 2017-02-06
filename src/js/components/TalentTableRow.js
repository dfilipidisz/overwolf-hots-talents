import React from 'react';
import { connect } from 'react-redux';
import { openTalentLevel, closeTalentLevel } from '../actions/talents';

class TalentTableRow extends React.Component {

  constructor() {
    super();

    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow() {
    if (this.props.isClosed) {
      this.props.openTalentLevel(this.props.lvl);
    } else {
      this.props.closeTalentLevel(this.props.lvl);
    }

    this.props.updateSize();
  }

  render() {
    const { isClosed, lvl, data, hero, type, isFirst, talentCount } = this.props;

    let lvlColumn;

    if (isClosed) {
      lvlColumn = <td className='level'>{lvl}</td>;
    } else if (isFirst && !isClosed) {
      lvlColumn = <td className='level' rowSpan={ talentCount }>{lvl}</td>;
    } else {
      lvlColumn = null;
    }

    return (
      <tr onClick={ this.toggleRow }>
        { lvlColumn }
        <td className='pic'><div className={ `talent-pic ${data.id} ${hero}` } /></td>
        <td className='name'>{data.title}</td>
        <td className='percent'>{data[type]}%</td>
      </tr>
    );
  }
}

TalentTableRow.propTypes = {
  isClosed: React.PropTypes.bool,
  lvl: React.PropTypes.number,
  openTalentLevel: React.PropTypes.func,
  closeTalentLevel: React.PropTypes.func,
  updateSize: React.PropTypes.func,
  data: React.PropTypes.object,
  type: React.PropTypes.string,
  hero: React.PropTypes.string,
  isFirst: React.PropTypes.bool,
  talentCount: React.PropTypes.number,
};

export default connect(
  null,
  { openTalentLevel, closeTalentLevel }
)(TalentTableRow);
