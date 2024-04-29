import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const BackArrowButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "20px", padding: "10px" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          onCanPlay={() => navigate("/")}
          variant="contained"
          endIcon={<Icon icon="ion:arrow-back-outline" />}
        >
          Back
        </Button>
      </Link>
    </div>
  );
};

export default BackArrowButton;
