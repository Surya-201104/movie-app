import { useEffect, useState } from "react";
import { searchMovies } from "../api/omdb";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔹 Load saved state OR default movies */
  useEffect(() => {
    const savedSearch = localStorage.getItem("search");
    const savedType = localStorage.getItem("type");
    const savedPage = localStorage.getItem("page");
    const savedMovies = localStorage.getItem("movies");

    if (savedSearch && savedMovies) {
      setSearch(savedSearch);
      setType(savedType || "");
      setPage(Number(savedPage) || 1);
      setMovies(JSON.parse(savedMovies));
    } else {
      // Default movies on first load
      fetchMovies("avengers", 1, "");
    }
  }, []);

  async function fetchMovies(query = search, p = 1, movieType = type) {
    try {
      setLoading(true);
      const data = await searchMovies(query, p, movieType);

      if (data.Response === "False") {
        setError(data.Error);
        setMovies([]);
        return;
      }

      setMovies(data.Search);
      setError("");
      setPage(p);
      setSearch(query);

      // 🔹 Save state
      localStorage.setItem("search", query);
      localStorage.setItem("type", movieType);
      localStorage.setItem("page", p);
      localStorage.setItem("movies", JSON.stringify(data.Search));
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <SearchBar
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        onSearch={() => fetchMovies(search, 1, type)}
      />

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {movies.length > 0 && (
        <Pagination
          page={page}
          onPageChange={(p) => fetchMovies(search, p, type)}
        />
      )}
    </div>
  );
}
