// ** MUI imports
import { Button } from "@mui/material";

// ** React imports
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

//**  The component is used to navigate back to the home page when clicked.
const BackArrowButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "20px", padding: "10px" }}>
      <Button
        role="button"
        onClick={() => navigate("/")}
        variant="contained"
        endIcon={<Icon icon="ion:arrow-back-outline" />}
      >
        Back
      </Button>
    </div>
  );
};

export default BackArrowButton;
