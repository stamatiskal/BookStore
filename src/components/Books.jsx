import { Grid, Box, Rating, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

//i am getting the data as prop so they will render also according to the filter
export default function Books({ data }) {
  return (
    <>
      {/* we are doing a map to go through everything according to props that we passed incase we had used the search */}
      {data.map((book) => (
        <Grid
          key={book.isbn}
          item
          xs={10}
          sm={6}
          md={4}
          lg={3}
          paddingBottom={5}
        >
          <Box textAlign="center">
            <Button component={Link} to={`/bookDetails/${book.isbn}`}>
              <img
                src={`../../public/beginning-react-book.jpeg`}
                alt="Book Cover"
                style={{ width: "300px", height: "auto" }}
              />
            </Button>
            <Typography variant="body2">{book.title}</Typography>
            {/* i am having the Rating here as read-only since user cant decide the Raiting of the other books only to watch them */}
            <Typography component="legend">
              <Rating name="read-only" readOnly />
            </Typography>
          </Box>
        </Grid>
      ))}
    </>
  );
}
