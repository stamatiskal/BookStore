import { Grid, TextField, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { mutate } from "swr";

export default function BookForm() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [publisher, setPublisher] = useState("");
  const [publisherError, setPublisherError] = useState(false);
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState(false);
  const [numPages, setNumPages] = useState("");
  const [numPagesError, setNumPagesError] = useState(false);
  const [isbn10, setIsbn10] = useState("");
  const [isbn10Error, setIsbn10Error] = useState(false);
  const [isbn13, setIsbn13] = useState("");
  const [isbn13Error, setIsbn13Error] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [options, setOptions] = useState("");
  const [rating, setRating] = useState("");
  const [ratingError, setRatingError] = useState(false);

  const checkFormValidity = () => {
    return !(
      !titleError &&
      !descriptionError &&
      !publisherError &&
      !yearError &&
      !numPagesError &&
      !ratingError &&
      !isbn10Error &&
      !isbn13Error &&
      title.trim() !== "" && // Check for non-empty fields
      description.trim() !== "" &&
      category.trim() !== "" &&
      author.trim() !== "" &&
      publisher.trim() !== "" &&
      year.trim() !== "" &&
      numPages.trim() !== "" &&
      options.trim() !== "" &&
      rating.trim() !== "" &&
      isbn10.trim() !== "" &&
      isbn13.trim() !== ""
    );
  };

  const saveFormData = async () => {
    const formData = {
      title,
      description,
      category,
      author,
      publisher,
      year,
      numPages,
      options,
      rating,
      isbn10,
      isbn13,
    };
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      mutate("../../resources/mocks/stubs/books.json");
      if (!response.ok) {
        throw new Error("Failed to save book");
      }

      // Clear form data on successful save
      setTitle("");
      setDescription("");
      setCategory("");
      setAuthor("");
      setPublisher("");
      setYear("");
      setNumPages("");
      setOptions("");
      setRating("");
      setIsbn10("");
      setIsbn13("");
      setImage(null);
    } catch (error) {
      console.error("Error saving book:", error.message);
    }
  };

  //import the image and changing the status of the placeholder
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //validatation to check for title
  const handleTitleChange = (event) => {
    const title = event.target.value;
    const regex = /^[a-zA-Z0-9@#&*!\s]+$/;
    setTitle(title);
    if (title.length < 10 || title.length > 120 || !regex.test(title)) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  //validatation to check for Description
  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setDescription(description);
    if (description.length > 512 || !/^[A-Z]/.test(description)) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setCategory(category);
  };

  const handleAuthorChange = (event) => {
    const author = event.target.value;
    setAuthor(author);
  };

  //validation to check for Publisher
  const handlePublisherChange = (event) => {
    const value = event.target.value;
    setPublisher(value);
    if (value.length < 5 || value.length > 60) {
      setPublisherError(true);
    } else {
      setPublisherError(false);
    }
  };

  //validation to check for Year i am also checking not to exceed the current year
  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
    if (!/^\d{4}$/.test(value) || value > 2024) {
      setYearError(true);
    } else {
      setYearError(false);
    }
  };

  //validation to check the number of pages
  const handleNumPagesChange = (event) => {
    const value = event.target.value;
    setNumPages(value);
    if (!/^\d{1,4}$/.test(value) || parseInt(value, 10) > 9999) {
      setNumPagesError(true);
    } else {
      setNumPagesError(false);
    }
  };

  const handleOptionsChange = (event) => {
    const options = event.target.value;
    setOptions(options);
  };

  //validatation to check for the Rating
  const handleRatinChange = (event) => {
    const rating = event.target.value;
    setRating(rating);
    if (!/^\d{1}$/.test(rating) || rating > 10) {
      setRatingError(true);
    } else {
      setRatingError(false);
    }
  };

  //validation to check the digits for ISBN-10
  const handleIsbn10Change = (event) => {
    const value = event.target.value;
    setIsbn10(value);
    if (!/^\d{10}$/.test(value)) {
      setIsbn10Error(true);
    } else {
      setIsbn10Error(false);
    }
  };

  //validation to check the digits for ISBN-13
  const handleIsbn13Change = (event) => {
    const value = event.target.value;
    setIsbn13(value);
    if (!/^\d{13}$/.test(value)) {
      setIsbn13Error(true);
    } else {
      setIsbn13Error(false);
    }
  };
  useEffect(() => {
    setFormValid(checkFormValidity());
  }, [
    titleError,
    descriptionError,
    publisherError,
    yearError,
    numPagesError,
    isbn10Error,
    isbn13Error,
    title,
    description,
    publisher,
    year,
    numPages,
    rating,
    isbn10,
    isbn13,
  ]);

  return (
    <>
      <Box
        sx={{ p: 2, border: "2px solid black", width: "60%", margin: "auto" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              required
              value={title}
              onChange={handleTitleChange}
              error={titleError}
              helperText={
                titleError
                  ? "Title must be between 10 and 120 characters and can contain only @, #, &, *, or !"
                  : ""
              }
            />
            <TextField
              label="Description"
              fullWidth
              variant="standard"
              required
              value={description}
              onChange={handleDescriptionChange}
              error={descriptionError}
              helperText={
                descriptionError
                  ? "Description must start with an uppercase letter and have a maximum of 512 characters"
                  : ""
              }
            />
            <TextField
              label="Category"
              fullWidth
              variant="standard"
              value={category}
              onChange={handleCategoryChange}
              required
            />
            <TextField
              label="Author Name"
              fullWidth
              variant="standard"
              value={author}
              onChange={handleAuthorChange}
              required
            />
            <TextField
              label="Publisher"
              fullWidth
              variant="standard"
              required
              value={publisher}
              onChange={handlePublisherChange}
              error={publisherError}
              helperText={
                publisherError
                  ? "Publisher must be between 5 and 60 characters"
                  : ""
              }
            />
            <TextField
              label="Year"
              fullWidth
              variant="standard"
              required
              value={year}
              onChange={handleYearChange}
              error={yearError}
              helperText={yearError ? "Year must be a 4-digit number" : ""}
            />
            <TextField
              label="Page Numbers"
              fullWidth
              variant="standard"
              required
              value={numPages}
              onChange={handleNumPagesChange}
              error={numPagesError}
              helperText={
                numPagesError
                  ? "Number of pages must be a number between 1 and 9999"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                component="span"
                variant="outlined"
                sx={{
                  borderRadius: 0,
                  background: "#eeeeee",
                  margin: "54px",
                  alignContent: "center",
                }}
              >
                {image ? "Change Image" : "Import image"}
              </Button>
            </label>
            <TextField
              label="Options"
              fullWidth
              variant="standard"
              value={options}
              onChange={handleOptionsChange}
              required
            />
            <TextField
              label="Rating"
              fullWidth
              variant="standard"
              value={rating}
              onChange={handleRatinChange}
              error={ratingError}
              helperText={isbn10Error ? "Rating must be from 0 to 9" : ""}
              required
            />
            <TextField
              label="ISBN-10"
              fullWidth
              variant="standard"
              required
              value={isbn10}
              onChange={handleIsbn10Change}
              error={isbn10Error}
              helperText={
                isbn10Error ? "ISBN-10 must be a 10-digit number" : ""
              }
            />
            <TextField
              label="ISBN-13"
              fullWidth
              variant="standard"
              required
              value={isbn13}
              onChange={handleIsbn13Change}
              error={isbn13Error}
              helperText={
                isbn13Error ? "ISBN-13 must be a 13-digit number" : ""
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" paddingTop="30px" justifyContent="center">
        <Button variant="outlined" disabled={formValid} onClick={saveFormData}>
          Save
        </Button>
      </Box>
    </>
  );
}
