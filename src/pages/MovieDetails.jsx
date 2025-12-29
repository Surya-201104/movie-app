import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getMovieDetails(id);
        if (data.Response === "False") {
          setError(data.Error);
          return;
        }
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
      }
    }
    fetchDetails();
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="details">
      <img src={movie.Poster} alt={movie.Title} />

      <div>
        <Link to="/" className="back-link">← Back</Link>
        <h1>{movie.Title}</h1>
        <p>{movie.Plot}</p>
        <p><b>Year:</b> {movie.Year}</p>
        <p><b>Genre:</b> {movie.Genre}</p>
        <p><b>Cast:</b> {movie.Actors}</p>
        <p><b>IMDB:</b> ⭐ {movie.imdbRating}</p>
      </div>
    </div>
  );
}
