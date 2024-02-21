import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ResponsiveTable({
  data,
  columns,
  rowsPerPageOptions = [3, 5, 10, 25],
  handleDelete,
}) {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "aliceBlue",
          width: isSmallScreen ? "100%" : "93%",
          mx: 5,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.12)" }}>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography variant="h6" fontWeight="bold">
                    {column}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.12)" }}
                >
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <TableCell key={colIndex}>
                      {key === "Remove" ? (
                        <IconButton onClick={() => handleDelete(value)}>
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        value
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
