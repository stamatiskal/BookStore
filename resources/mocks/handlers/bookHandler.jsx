import { http, HttpResponse } from "msw";

import BooksData from "../stubs/books.json";

let NewBooksData = BooksData.books;

export const bookHandler = [
  http.get("/api/books", () => {
    return HttpResponse(BooksData);
  }),

  http.post("/api/books", async ({ request }) => {
    try {
      const newBook = await request.json();
      NewBooksData.push(newBook);
      console.log(NewBooksData);
      return HttpResponse.json(NewBooksData);
    } catch (error) {
      return HttpResponse.error();
    }
  }),
];
