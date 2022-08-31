import {
  Table,
  TableCaption,
  TableContainer,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props extends React.PropsWithChildren {
  columns: Array<string>;
  rows: Array<Array<ReactNode>>;
  caption?: string;
  props?: TableProps;
}

const CustomTable: React.FC<Props> = ({ props, caption, rows, columns }) => {
  return (
    <TableContainer whiteSpace="normal">
      <Table {...props}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr>
              {row.map((column) => (
                <Td>{column}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
