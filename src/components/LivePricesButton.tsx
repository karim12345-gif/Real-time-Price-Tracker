// ** MUI imports
import { Button } from "@mui/material";

// ** React imports
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

//**  The component is used to navigate back to the home page when clicked.
const LivePricesButton = () => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <Button
        variant="contained"
        endIcon={<Icon icon="fa6-solid:chart-line" />}
        sx={{ textDecoration: "none", marginBottom: "20px" }}
        component={Link}
        to={"/detailsPage"}
      >
        Check Live Prices
      </Button>
    </div>
  );
};

export default LivePricesButton;
