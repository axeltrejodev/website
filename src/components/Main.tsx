import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
const Portfolio = lazy(() => import("../pages/Portfolio"));
const ShoppingCart = lazy(() => import("../pages/ShoppingCart"));
const MovieFinder = lazy(() => import("../pages/MovieFinder"));
const Translator = lazy(() => import("../pages/Translator"));
const Shortener = lazy(() => import("../pages/Shortener"));
const ToDo = lazy(() => import("../pages/ToDo"));
const TicTacToe = lazy(() => import("../pages/TicTacToe"));
const NotFound = lazy(() => import("../pages/NotFound"));

function Main() {
  return (
    <main>
      <Suspense fallback={<div className="spinner" />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/movie-finder" element={<MovieFinder />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/shortener" element={<Shortener />} />
          <Route path="/to-do" element={<ToDo />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default Main;
