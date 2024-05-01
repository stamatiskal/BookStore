import { Typography, Box } from "@mui/material";
import BookForm from "./BookForm";

export default function NewBook() {
  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        sx={{ paddingBottom: "20px" }}
      >
        Add new Book
      </Typography>
      <Box>
        <BookForm />
      </Box>
    </>
  );
}
