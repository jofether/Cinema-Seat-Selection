import React, { useState } from 'react';
import { MovieShowtimeSelector } from './components/MovieShowtimeSelector';
import { SeatingGrid } from './components/SeatingGrid';
import { SeatingLegend } from './components/SeatingLegend';
import { BookingSummary } from './components/BookingSummary';
import { CheckoutModal } from './components/CheckoutModal';

function App() {
  const [selected, setSelected] = useState([24, 25]);
  const [selectedMovie, setSelectedMovie] = useState('dune-part-2');
  const [selectedShowtime, setSelectedShowtime] = useState('19:00');
  const [showCheckout, setShowCheckout] = useState(false);

  // Enhanced seat data with categories
  const rows = 10;
  const cols = 10;
  
  const seatCategories = {
    regular: [[4, 5, 6, 7], [14, 15, 16, 17], [24, 25, 26, 27], [34, 35, 36, 37], [44, 45, 46, 47], [54, 55, 56, 57], [64, 65, 66, 67], [74, 75, 76, 77]],
    premium: [[8, 9], [18, 19], [28, 29], [38, 39], [48, 49], [58, 59], [68, 69], [78, 79]],
    vip: [[0, 1, 2, 3], [10, 11, 12, 13], [20, 21, 22, 23], [30, 31, 32, 33], [40, 41, 42, 43], [50, 51, 52, 53], [60, 61, 62, 63], [70, 71, 72, 73]],
  };

  const taken = [5, 6, 12, 13, 45, 46, 47, 48, 52, 71, 72, 8, 9, 38];
  
  const movies = [
    { id: 'dune-part-2', name: 'Dune: Part Two', rating: '8.5/10' },
    { id: 'oppenheimer', name: 'Oppenheimer', rating: '8.8/10' },
    { id: 'barbie', name: 'Barbie', rating: '7.9/10' },
    { id: 'killers-of-flower-moon', name: 'Killers of the Flower Moon', rating: '8.3/10' },
  ];

  const showtimes = ['14:00', '16:30', '19:00', '21:30'];

  const getSeatCategory = (id) => {
    if (seatCategories.vip.flat().includes(id)) return 'vip';
    if (seatCategories.premium.flat().includes(id)) return 'premium';
    return 'regular';
  };

  const getPriceByCategory = (category) => {
    const prices = { vip: 18, premium: 16, regular: 12 };
    return prices[category];
  };

  const toggleSeat = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      if (selected.length < 10) {
        setSelected([...selected, id]);
      }
    }
  };

  const getTotalPrice = () => {
    return selected.reduce((sum, seatId) => sum + getPriceByCategory(getSeatCategory(seatId)), 0);
  };

  const clearSelection = () => {
    setSelected([]);
  };

  const movieName = movies.find(m => m.id === selectedMovie)?.name;
  const selectedSeatsInfo = selected.map(id => ({
    id,
    category: getSeatCategory(id),
    price: getPriceByCategory(getSeatCategory(id))
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-8 font-sans text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Cinema Seat Selection
          </h1>
          <p className="text-gray-400">Book your perfect seats</p>
        </div>

        {/* MOVIE & SHOWTIME SELECTION */}
        <MovieShowtimeSelector 
          selectedMovie={selectedMovie}
          onMovieChange={setSelectedMovie}
          selectedShowtime={selectedShowtime}
          onShowtimeChange={setSelectedShowtime}
          movies={movies}
          showtimes={showtimes}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN SEATING AREA */}
          <div className="lg:col-span-2">
            <SeatingGrid 
              rows={rows}
              cols={cols}
              selected={selected}
              taken={taken}
              getSeatCategory={getSeatCategory}
              onToggle={toggleSeat}
            />
            <SeatingLegend />
          </div>

          {/* BOOKING SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <BookingSummary 
              movieName={movieName}
              selectedShowtime={selectedShowtime}
              selected={selected}
              selectedSeatsInfo={selectedSeatsInfo}
              getTotalPrice={getTotalPrice}
              onCheckout={() => setShowCheckout(true)}
              onClearSelection={clearSelection}
              maxSeats={10}
            />
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      <CheckoutModal 
        isOpen={showCheckout}
        movieName={movieName}
        selectedShowtime={selectedShowtime}
        selected={selected}
        totalPrice={getTotalPrice() + (selected.length > 0 ? 2.5 : 0)}
        onConfirm={() => {
          alert('✅ Booking confirmed! Check your email for confirmation.');
          setSelected([]);
          setShowCheckout(false);
        }}
        onClose={() => setShowCheckout(false)}
      />
    </div>
  );
}

export default App;