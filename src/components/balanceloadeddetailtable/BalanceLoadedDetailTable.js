import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const BalanceLoadedDetailTable = ({balanceloadedDetail}) => {
  console.log("table data:: ",balanceloadedDetail)
  
  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">loadedBy</TableCell>
            <TableCell align="right">loadedFrom</TableCell>
            <TableCell align="right">amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceloadedDetail?.map((loadedDetail) => (
            <TableRow
              key={loadedDetail.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {loadedDetail?.id}
              </TableCell>
              <TableCell align="right">{loadedDetail?.loadedBy}</TableCell>
              <TableCell align="right">{loadedDetail?.loadedFrom}</TableCell>
              <TableCell align="right">{loadedDetail?.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default BalanceLoadedDetailTable