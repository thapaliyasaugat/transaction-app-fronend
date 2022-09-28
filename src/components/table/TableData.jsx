import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const TableData = ({transactions}) => {
  console.log("table data:: ",transactions)
  
  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">code</TableCell>
            <TableCell align="right">Sender</TableCell>
            <TableCell align="right">Receiver</TableCell>
            <TableCell align="right">amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow
              key={transaction.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction?.id}
              </TableCell>
              <TableCell align="right">{transaction?.code}</TableCell>
              <TableCell align="right">{transaction?.customer_from?.userName}</TableCell>
              <TableCell align="right">{transaction?.customer_to?.userName}</TableCell>
              <TableCell align="right">{transaction?.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TableData