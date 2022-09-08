import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";


const TableContainer = ({
  columns,
  data,
  isGlobalSearch,
  customPageSize,
  tableClass,
  theadClass,
  thClass,
  divClass,
  setFilteredData,
  isExtraFeature,
  maxLength,
  filteredLength
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: customPageSize },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const [labelAll, setLabelAll] = React.useState("");

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    if(event.target.value === "All") {
        setLabelAll("All");
        setPageSize(Number(maxLength));
    } else {
        setLabelAll("");
        setPageSize(Number(event.target.value));
    }
  };
  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  useEffect(() => {
    setFilteredData(page);
  }, [state]);

  const entriesCalculation = pageSize*(pageOptions.length-(pageIndex));

  const from = filteredLength===0?0:(filteredLength - (entriesCalculation - ((pageSize*pageOptions.length)-filteredLength)) + 1);

  const to = filteredLength - (entriesCalculation - ((pageSize*pageOptions.length)-filteredLength)) + pageSize;

  return (
    <Fragment>
        {isExtraFeature && (
          <Row className="mb-2">
            {isGlobalSearch && (
              <Col md={1} className="mt-3">
                <select
                  className="form-select"
                  value={(labelAll==="")?pageSize:"All"}
                  onChange={onChangeInSelect}
                >
                  {[10, 25, 50, 100, 200, 500, 1000, "All"].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </Col>
            )}
          </Row>
        )}

      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={`${theadClass} table-light`}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className={thClass} {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
          
          {
            ( filteredLength === 0 ) ?
            <tfoot>
              <tr>
                  <td className="text-center" colSpan="6">No Data Found</td>
              </tr>
            </tfoot> :
            <tfoot>
              
            </tfoot>
          }

        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center pe-2">
        <Col>
          <h6>Showing {from} to {(to>filteredLength?filteredLength:to)} of {filteredLength} entries</h6>
        </Col>
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
