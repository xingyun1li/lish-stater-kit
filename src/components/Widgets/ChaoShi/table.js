/* eslint-disable react/forbid-prop-types,react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { connect } from 'react-redux';


const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'center' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label }) => {
    const { headerHeight, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align="center"
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
            {columns.map(({ dataKey, ...other }, index) => (
              <Column
                key={dataKey}
                headerRenderer={headerProps =>
                  this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const Today = ({ data }) => (
  <Paper style={{ height: 430, width: '100%' }}>
    <VirtualizedTable
      rowCount={data.length}
      rowGetter={({ index }) => data[index]}
      columns={[
        {
          width: 200,
          label: 'RDM编号',
          dataKey: 'rdm-id',
        },
        {
          width: 300,
          label: '需求标题',
          dataKey: 'miaoshu',
        },
        {
          width: 200,
          label: '提出部门',
          dataKey: 'bumen',
        },
        {
          width: 200,
          label: '提出时间',
          dataKey: 'tichushijian',
        },
        {
          width: 200,
          label: 'WIP时长',
          dataKey: 'wip',
        },
        {
          width: 200,
          label: '需求状态',
          dataKey: 'zhuangtai',
        },
        {
          width: 200,
          label: '分析人',
          dataKey: 'fenxiren',
        },
      ]}
    />
  </Paper>
);

Today.propTypes = {
  data: PropTypes.array,
};

Today.defaultProps = {
  data: [],
};

const mapStateToProps = state => ({
  data: state.xuqiu.xuqiuCurrent,
});

export default connect(mapStateToProps)(Today);
