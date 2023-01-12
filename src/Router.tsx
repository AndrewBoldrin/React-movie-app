import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Index } from "./pages/index/Index";
import { Favorites } from "./pages/favorites/Favorites";
import { Movie } from "./pages/movie/Movie";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />}></Route>
          <Route path="favoritos" element={<Favorites />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
