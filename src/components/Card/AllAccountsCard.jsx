import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { accountDelete } from "../../firebase/Account";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function AllAccountsCard({ account, deleteBtn, id }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const swalWithMuiButtons = Swal.mixin({
    });

    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          accountDelete(id, dispatch).then(() => {
            swalWithMuiButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithMuiButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <Card
      sx={{ minWidth: 275, background:
        "linear-gradient(to right, rgb(118 127 137), rgb(25 118 210))",
      color: "white", borderRadius: 5, p: 2 }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {account.accountName}
        </Typography>
        <Typography variant="h5" component="div">
          {account.accountName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2">{account.amount}</Typography>
      </CardContent>
      <CardActions>
        {deleteBtn && (
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
