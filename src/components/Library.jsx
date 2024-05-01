import { styled, Typography, InputBase, Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Books from "./Books";
import useSWR from "swr";
import { useState } from "react";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
    textAlign: "center",
  },
  "& .MuiInputBase-input::placeholder": {
    textAlign: "center",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Library() {
  const [query, setQuery] = useState("");

  // using swr to fetch my data from the json file so i can get the title and if it had inside the img
  const { data: booksData, error } = useSWR(
    "../../resources/mocks/stubs/books.json",
    fetcher
  );

  if (error) return <div>Error loading data...</div>;
  if (!booksData) return <div>Loading...</div>;

  //here is the filter according to the data that i want
  const search = (data) => {
    return data.filter((item) => {
      //convert all fields from capital to lowercase incase insensitive search
      const lowerCaseQuery = query.toLowerCase();
      return Object.values(item).some((value) =>
        typeof value === "string"
          ? value.toLowerCase().includes(lowerCaseQuery)
          : false
      );
    });
  };
  return (
    <>
      <Typography
        variant="h6"
        component="h1"
        align="center"
        sx={{ paddingBottom: "20px" }}
      >
        Search to find your new book
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        border="1px solid"
        borderRadius="10px"
        alignItems="center"
        position="relative"
        width="60%"
        margin="auto"
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Box>
          {/* here getting the value according of what the user typed */}
          <StyledInputBase
            placeholder="Search . . ."
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Box>
      {/* passing our data filtered/no filtered to our Books component to render us accordingly and dynamically */}
      <Box paddingTop="70px">
        <Grid container spacing={2}>
          <Books data={search(booksData.books)} />
        </Grid>
      </Box>
    </>
  );
}
