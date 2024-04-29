import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//** The CircularIndeterminate component is a spinner component that displays a circular progress indicator in the center of the screen.
//** This component is used to indicate that the application is loading or processing data. The CircularProgress component is imported from the Material-UI library, which provides a circular progress indicator that spins to indicate that the application is busy. The Box component is used to center the CircularProgress component on the screen by setting the display, justifyContent, alignItems, and height styles. The CircularIndeterminate component is exported as a default component to be used in other parts of the application.
const CircularIndeterminate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularIndeterminate;
