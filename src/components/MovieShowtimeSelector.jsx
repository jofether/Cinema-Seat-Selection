export function MovieShowtimeSelector({ 
  selectedMovie, 
  onMovieChange, 
  selectedShowtime, 
  onShowtimeChange,
  movies,
  showtimes 
}) {
  return (
    // [BUG - TYPO] 'gap-' is an incomplete/invalid Tailwind class, breaking spacing.
    // [FIX] gap-6
    <div className="grid grid-cols-1 md:grid-cols-2 gap- mb-12 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Select Movie</label>
        <select 
          value={selectedMovie}
          onChange={(e) => onMovieChange(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition"
        >
          {movies.map(movie => (
            <option key={movie.id} value={movie.id}>
              {movie.name} ({movie.rating})
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Select Showtime</label>
        <select 
          value={selectedShowtime}
          onChange={(e) => onShowtimeChange(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition"
        >
          {showtimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
