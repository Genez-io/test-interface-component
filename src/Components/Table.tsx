import React from "react";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

// Define a type for the columns
interface Column<T> {
  Header: string; // The text for the column header
  accessor: keyof T; // The key in the data object
}

// Define the props for the Table component
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey700};
  border-radius: 12px;
  width: 100%;
  overflow: scroll;

  /* Hide scrollbars */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* WebKit browsers (Chrome, Safari) */
  }
`;

// Styled components for the table
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  padding-left: 24px;
  padding-right: 24px;
  height: 64px;
  text-align: left;
  color: #666666;
`;

const StyledTd = styled.td`
  padding-left: 24px;
  padding-right: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey700};
  color: ${({ theme }) => theme.color};
  height: 64px;
  &:hover {
  }
`;

const StyledTr = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.grey200};
  }
`;

const StyledSkeleton = styled(Skeleton)`
  margin: 8px;
  height: 16px;
`;

const Table = <T,>({ columns, data, onRowClick, isLoading = false }: TableProps<T>) => {
  let rows;
  if (!isLoading) {
    rows = data.map((row, rowIndex) => (
      <StyledTr key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
        {columns.map((column, colIndex) => {
          if (React.isValidElement(row[column.accessor])) {
            return <StyledTd key={colIndex}>{row[column.accessor] as React.ReactElement}</StyledTd>;
          } else {
            return <StyledTd key={colIndex}>{String(row[column.accessor])}</StyledTd>;
          }
        })}
      </StyledTr>
    ));
  } else {
    rows = Array.from({ length: 3 }).map((_, rowIndex) => (
      <StyledTr key={rowIndex}>
        {columns.map((_, colIndex) => (
          <StyledTd key={colIndex}>
            <StyledSkeleton />
          </StyledTd>
        ))}
      </StyledTr>
    ));
  }

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <StyledTh key={index}>{column.Header}</StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
