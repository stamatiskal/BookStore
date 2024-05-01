import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Library from "./components/Library";
import Footer from "./components/Footer";
import NewBook from "./components/NewBook";
import BookDetails from "./components/BookDetails";

function App() {
  //having a Router to navigate
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/library" element={<Library />} />
          <Route path="/newBook" element={<NewBook />} />
          <Route path="/bookDetails/:isbn" element={<BookDetails />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
