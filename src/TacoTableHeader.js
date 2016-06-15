import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classNames from 'classnames';
import DataType from './DataType';

const propTypes = {
  /* The column definition */
  column: React.PropTypes.object.isRequired,

  /** Whether this column is highlighted or not */
  highlightedColumn: React.PropTypes.bool,

  /* Callback when clicked. Gets passed `column.id` */
  onClick: React.PropTypes.func,

  /* Whether the table is sortable or not */
  sortableTable: React.PropTypes.bool,
};

const defaultProps = {

};

/** TODO: Add your class def here */
class TacoTableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClick() {
    const { column, onClick } = this.props;
    if (onClick) {
      onClick(column.id);
    }
  }

  render() {
    const { column, sortableTable, highlightedColumn } = this.props;
    const { className, thClassName, header, id, width, type } = column;

    const contents = header == null ? id : header;

    // this is a sortable column if it is in a sortable table and it has a datatype and
    // sortValue isn't explicitly set to null (undefined is ok).
    const sortable = sortableTable && column.type !== DataType.None && column.sortValue !== null;

    let onClick;
    if (sortable) {
      onClick = this.handleClick;
    }

    // add in a fixed width if specified
    let style;
    if (width != null) {
      style = { width };
    }

    return (
      <th
        className={classNames(className, thClassName, `data-type-${type}`, {
          sortable,
          'column-highlight': highlightedColumn,
        })}
        onClick={onClick}
        style={style}
      >
        {contents}
      </th>
    );
  }
}

TacoTableHeader.propTypes = propTypes;
TacoTableHeader.defaultProps = defaultProps;

export default TacoTableHeader;
