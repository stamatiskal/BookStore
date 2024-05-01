import { Box, Typography, AppBar } from "@mui/material";

export default function Header() {
  return (
    <>
      {/* i implent the appBar from material to have an header */}
      <AppBar position="static" color="transparent">
        <Box padding={1} width="90%" margin="auto" bgcolor="white">
          <Typography variant="h3" component="h1" align="center">
            Bookstore
          </Typography>
        </Box>
      </AppBar>
      <Box paddingBottom="50px"></Box>
    </>
  );
}
