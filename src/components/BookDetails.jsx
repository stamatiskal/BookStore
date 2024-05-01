import { Box, Button, Grid, Typography, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const fetcher = (url) => fetch(url).then((res) => res.json());

//we are fetching our data from the json file and having as a parameter the isbn which is for us the unique key
export default function BookDetails() {
  const { isbn } = useParams();

  const { data: bookDetails, error } = useSWR(
    "../../resources/mocks/stubs/books.json",
    fetcher
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!bookDetails) {
    return <div>Loading...</div>;
  }
  //Here looks the same isbn of the book that we clicked to render us its specific data that it has
  const selectedBook = bookDetails.books.find((book) => book.isbn === isbn);

  if (!selectedBook) {
    return <div>Book not found</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
  };
  return (
    <>
      <Box style={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Box textAlign="center">
              <img
                src={`../../public/beginning-react-book.jpeg`}
                alt="Book Cover"
                style={{ width: "100%", height: "auto", maxWidth: "400px" }}
              />
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bold",
                  paddingBottom: "16px",
                  paddingTop: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccountCircleSharpIcon />
                {selectedBook.author}
              </Typography>
              <Typography component="legend">
                <Rating name="read-only" size="large" readOnly />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", marginBottom: "8px" }}
            >
              {selectedBook.title}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "smaller" }}>
              {selectedBook.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                marginTop: "16px",
                marginBottom: "8px",
              }}
            >
              <Button variant="outlined" size="small" startIcon={<StarIcon />}>
                Favorite
              </Button>
              <Button variant="outlined" size="small" startIcon={<ShareIcon />}>
                Share
              </Button>
            </Box>

            <Box
              sx={{
                marginTop: "16px",
                marginBottom: "8px",
                "& > *": {
                  fontSize: "smaller",
                },
              }}
            >
              <Typography>
                Category: Educational{selectedBook.category}
              </Typography>
              <Typography>Year: 1997 {selectedBook.year}</Typography>
              <Typography>Number of Pages: {selectedBook.pages}</Typography>
            </Box>
            <Box
              sx={{
                "& > *": {
                  fontSize: "smaller",
                },
              }}
            >
              <Typography style={{ marginBottom: "8px" }}>
                Publisher: {selectedBook.publisher}
              </Typography>
              <Typography>
                ISBN-10: {selectedBook.isbn} {selectedBook.isbn10}
              </Typography>
              <Typography style={{ marginBottom: "24px" }}>
                ISBN-13: 13digit {selectedBook.isbn13}
              </Typography>
            </Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                style={{ width: "250px" }}
                startIcon={<LocalMallIcon />}
              >
                BUY
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "42px" }}>
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            marginTop: "40px",
            marginLeft: "100px",
            marginBottom: "20px",
          }}
        >
          Other Books you may like
        </Typography>

        <Slider {...sliderSettings}>
          {bookDetails.books
            .filter((book) => book.isbn !== isbn)
            .map((book) => (
              <Box key={book.isbn} textAlign="center">
                <Button component={Link} to={`/bookDetails/${book.isbn}`}>
                  <img
                    src={`../../public/beginning-react-book.jpeg`}
                    alt={book.title}
                    style={{
                      width: "200px",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </Button>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1">{book.title}</Typography>
                </Box>
              </Box>
            ))}
        </Slider>
      </Box>
    </>
  );
}
