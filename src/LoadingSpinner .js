// src/LoadingSpinner.js
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
