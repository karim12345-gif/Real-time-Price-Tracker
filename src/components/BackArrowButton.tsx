// ** MUI imports
import { Button } from "@mui/material";

// ** React imports
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

//**  The component is used to navigate back to the home page when clicked.
const BackArrowButton = () => {
  return (
    <div style={{ marginTop: "20px", padding: "10px" }}>
      <Button
        role="button"
        component={Link}
        to={"/"}
        variant="contained"
        endIcon={<Icon icon="ion:arrow-back-outline" />}
      >
        Back
      </Button>
    </div>
  );
};

export default BackArrowButton;
