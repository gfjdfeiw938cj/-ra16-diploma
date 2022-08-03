import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Banner from "./components/Banner";
import Cart from "./pages/Cart";

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/ra16-diploma/" element={<Home />} />
              <Route path="/ra16-diploma/about" element={<About />} />
              <Route path="/ra16-diploma/catalog" element={<Catalog />} />
              <Route path="/ra16-diploma/contacts" element={<Contacts />} />
              <Route path="/ra16-diploma/cart" element={<Cart />} />
              <Route path="/ra16-diploma/products/:id" element={<Product />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
