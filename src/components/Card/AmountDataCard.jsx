import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const style = {
  py: 0,
  width: "20%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "black",
  justifyContent: "center",
  color:"white",
  display: "flex",
  cursor: "pointer",
  "&:hover": {
    borderColor: "white",
    color: "blue",
    borderColor: "blue",
    bgcolor: "aliceBlue",
  },
  margin: "auto", // Center the component horizontally
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center", // Center the content vertically
};

export default function AmountDataCard({
  name,
  amount,
}) {
  return (
    <List sx={style}>
      <ListItem sx={listItemStyle}>
        <div style={{ display: "flex", justifyContent:"center"}}>
          <ListItemText primary={name}  secondary={amount}/>
        </div>
      </ListItem>
      <Divider />
    </List>
  );
}
