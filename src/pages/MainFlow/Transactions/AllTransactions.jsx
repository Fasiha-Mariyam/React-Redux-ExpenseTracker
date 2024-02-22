import React, { useEffect, useState } from "react";
import ResponsiveTable from "../../../components/Tables/TableRespnsive";
import Selected from "../../../components/FormFields/Selected";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { transactionDelete } from "../../../firebase/Transaction";

export default function AllTransactions() {
  const dispatch = useDispatch();
  const Loader = useSelector((state) => state.transactions.isLoading);
  const transactions = useSelector((state) => state.transactions.transaction);
  const [filterValue, setFilterValue] = useState("All");
  const [transformedData, setTransformedData] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const handleDelete = (id) => {
    const swalWithMuiButtons = Swal.mixin({});
  
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      })
      .then(async (result) => {
        try {
          if (result.isConfirmed) {
            await transactionDelete(id, dispatch);
            const updatedTransactions = transactions.filter(
              (transaction) => transaction.id !== id
            );
            setSortedTransactions(updatedTransactions);
            swalWithMuiButtons.fire({
              title: "Deleted!",
              text: "Your transaction has been deleted.",
              icon: "success",
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithMuiButtons.fire({
              title: "Cancelled",
              text: "Your transaction is safe :)",
              icon: "info",
            });
          }
        } catch (error) {
          console.error("Error deleting transaction:", error);
          swalWithMuiButtons.fire({
            title: "Error",
            text: "An error occurred while deleting the transaction.",
            icon: "error",
          });
        }
      });
  
    console.log("Deleting row with ID:", id);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  useEffect(() => {
    const updatedData = transactions
      .map((transaction) => ({
        Account: transaction.data.account,
        Amount: transaction.data.amount,
        Type: transaction.data.type,
        Date: transaction.data.date,
        Category: transaction.data.category,
        Remove: transaction.id,
      }))
      .filter((transaction) => {
        if (filterValue === "All") {
          return true;
        } else {
          return transaction.Type === filterValue;
        }
      });
    setTransformedData(updatedData);
  }, [sortedTransactions, filterValue]);

  const filterOptions = ["All", "Income", "Expense"];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mx: 5,
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <h1>All Transactions</h1>
        <Selected
          heading=""
          valuesArray={filterOptions}
          value={filterValue}
          Change={handleFilterChange}
          defaultValue={"Select Filter"}
        />
      </Box>
      {Loader ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : transformedData.length === 0 ? (
        <h3
          style={{ display: "flex", justifyContent: "center", color: "blue" }}
        >
          No transactions to display.
        </h3>
      ) : (
        <ResponsiveTable
          data={transformedData}
          handleDelete={handleDelete}
          columns={["Account", "Amount", "Type", "Date", "Category", "Remove"]}
          rowsPerPageOptions={[5, 10, 15]}
        />
      )}
    </>
  );
}
