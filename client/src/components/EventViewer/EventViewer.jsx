import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// import { DataGrid } from "@mui/x-data-grid";

const EventViewer = () => {
  const columns = [
    { field: "type", headerName: "Type", width: 200 },
    { field: "from", headerName: "From", width: 200 },
    { field: "to", headerName: "To", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
  ];

  const rows = useSelector(state => state.events.transactions);
  return (
    <Box style={{ padding: 16 }}>
      <Typography variant="h6" component="div">
        Events
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="left" width={column.width} key={column.field} >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.event}>
                <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.from}</TableCell>
                  <TableCell align="left">{row.to}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EventViewer;
