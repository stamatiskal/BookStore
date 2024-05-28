import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  // making a Footer and also having 2 buttons which renders the components that i want to navigate
  return (
    <Box
      position="relative"
      width="100%"
      paddingY={2}
      display="flex"
      justifyContent="flex-end"
    >
      <Box width="90%" margin="auto">
        <Box
          padding={1}
          border={1}
          borderColor="black"
          margin="auto"
          display="flex"
          justifyContent="flex-end"
        >
          <Link to="/Library" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Home</Button>
          </Link>
          <Link to="/NewBook" style={{ textDecoration: "none" }}>
            <Button variant="contained">Add your Book</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
