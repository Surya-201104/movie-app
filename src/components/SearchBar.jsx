/* eslint-disable */
export default function SearchBar({
  search,
  setSearch,
  type,
  setType,
  onSearch,
}) {
  return (
    <div className="search-bar">
      <input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>

      <button onClick={onSearch}>Search</button>
    </div>
  );
}
