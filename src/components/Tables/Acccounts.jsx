import { Box } from "@mui/material";
import Button from "./Button";
import ResponsiveTable from "./TableRespnsive";
import NumberField from "./NumberField";
import NameField from "./NameField";

export default function Acccounts({ cash, bank, saving }) {
  const accounts = [
    { name: "Cash", money: "$100" },
    { name: "Saving", money: "$200" },
    { name: "Account 3", money: "$300" },
    { name: "Account 4", money: "$100" },
  ];

  return (
    <>
      <h2>
        Cash:{cash} -- Bank:{bank} -- Saving:{saving}
      </h2>
      <h2
        style={{
          color: "#1976d2",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        Accounts
        <Box sx={{ display: "inline-block", marginLeft: "15px" }}>
          <Button
            buttonName={"Add Account"}
            heading={"Add Account"}
            ButtonComponent1={NameField}
            ButtonComponent2={NumberField}
          />
        </Box>
      </h2>
      <div>
        <Box>
          <ResponsiveTable
            data={accounts}
            columns={["Name", "Money"]}
            rowsPerPageOptions={[3, 5, 10]} // Customize rows per page options if needed
          />
        </Box>
      </div>
    </>
  );
}
