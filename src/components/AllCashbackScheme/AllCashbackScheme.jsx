import React, { useEffect ,useState} from 'react'
import "./AllCashbackScheme.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { userRequest } from '../../requestMethod';
import { Autorenew } from '@mui/icons-material';
import BackHome from '../BackHome';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AllCashbackScheme = () => {
  const [pageNumber,setPageNumber] = useState(0);
  const [totalNoOfPages,settotalNoOfPages] = useState(0);
  const [cashbackScheme,setCashbackScheme] = useState([]);

  const handleChange = (event, value) => {
    setPageNumber(value-1);
  };

  useEffect(()=>{
      const fetchData = async()=>{
          try {
            const schemes = await userRequest.post("/cashback/",{pageNumber,pageSize:5});
            console.log(schemes.data.data.content);
            setCashbackScheme(schemes?.data?.data?.content);
            settotalNoOfPages(schemes?.data?.data?.totalNoOfPages);
            console.log(cashbackScheme?.active);
          } catch (error) {
            toast("Error Fetching Data.")
          }
      }
      fetchData();
  },[pageNumber])
  return (
    <div className="allcashbackscheme">
      <div className="allcashbackschemecontainer">
        <BackHome/>
        <h2>All cashback scheme</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">RewardRate</TableCell>
            <TableCell align="right">active</TableCell>
            <TableCell align="right">updateRole</TableCell>
            <TableCell align="right">initiatedBy</TableCell>
            <TableCell align="right">updatedBy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cashbackScheme?.map((cashbackScheme) => (
            <TableRow
              key={cashbackScheme.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {cashbackScheme?.id}
              </TableCell>
              <TableCell align="right">{cashbackScheme?.subject}</TableCell>
              <TableCell align="right">{cashbackScheme?.description}</TableCell>
              <TableCell align="right">{cashbackScheme?.rewardRate}</TableCell>
              <TableCell align="right"><span style={{color:"blue",cursor:'pointer'}}>{String(cashbackScheme?.active)}</span></TableCell>
              <TableCell align="right"><span><Autorenew/></span></TableCell>
              <TableCell align="right">{cashbackScheme?.initiatedBy}</TableCell>
              <TableCell align="right">{cashbackScheme?.updatedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={5} className="adminAllUserStack">
      <Pagination count={totalNoOfPages} page={pageNumber+1} onChange={handleChange} />
    </Stack>
      </div>
      </div>
  )
}

export default AllCashbackScheme