// ** MUI imports
import { Button } from "@mui/material";

// ** React imports
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

//**  The component is used to navigate back to the home page when clicked.
const LivePricesButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: "40px" }}>
      <Button
        variant="contained"
        onClick={() => navigate("/detailsPage")}
        endIcon={<Icon icon="fa6-solid:chart-line" />}
      >
        Check Live Prices
      </Button>
    </div>
  );
};

export default LivePricesButton;
