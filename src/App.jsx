import React, { useState } from 'react';

function Seat({ status, id, category, onToggle }) {
  const baseClass = "w-8 h-8 rounded-t-lg text-xs flex items-center justify-center font-bold transition-all transform hover:scale-125 shadow-sm cursor-pointer duration-200";
  
  const colors = {
    available: {
      regular: "bg-green-500 text-white hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50",
      premium: "bg-amber-500 text-white hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/50",
      vip: "bg-purple-500 text-white hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/50",
    },
    taken: "bg-gray-700 text-gray-500 cursor-not-allowed opacity-40",
    selected: {
      regular: "bg-green-600 text-white shadow-lg shadow-green-500/60 scale-125 border-2 border-green-300",
      premium: "bg-amber-600 text-white shadow-lg shadow-amber-500/60 scale-125 border-2 border-amber-300",
      vip: "bg-purple-600 text-white shadow-lg shadow-purple-500/60 scale-125 border-2 border-purple-300",
    },
  };

  const getColorClass = () => {
    if (status === 'taken') return colors.taken;
    if (status === 'selected') return colors.selected[category];
    return colors.available[category];
  };

  return (
    <div 
      onClick={() => status !== 'taken' && onToggle(id)}
      className={`${baseClass} ${getColorClass()}`}
      title={`Seat ${id} - ${category.toUpperCase()}`}
    >
      {id}
    </div>
  );
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Select Movie</label>
            <select 
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
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
              onChange={(e) => setSelectedShowtime(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition"
            >
              {showtimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN SEATING AREA */}
          <div className="lg:col-span-2">
            
            {/* SCREEN */}
            <div className="mb-12 relative">
              <div className="h-6 bg-gradient-to-r from-white/5 via-white/30 to-white/5 rounded-full blur-lg mb-4 shadow-2xl"></div>
              <div className="text-center text-gray-400 text-sm tracking-widest uppercase font-semibold">Screen</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-white/10 to-transparent blur-3xl -z-10 rounded-full"></div>
            </div>

            {/* SEATING GRID */}
            <div className="flex flex-col items-center gap-4 bg-gray-800/30 p-8 rounded-xl border border-gray-700/50">
              <div className="text-xs text-gray-500 mb-4 font-mono">Row Indicator</div>
              {Array.from({ length: rows }).map((_, r) => (
                <div key={r} className="flex gap-3 items-center">
                  <span className="text-gray-500 text-xs font-bold w-4">{String.fromCharCode(65 + r)}</span>
                  <div className="flex gap-2">
                    {Array.from({ length: cols }).map((_, c) => {
                      const id = r * cols + c;
                      const isAisle = c === 5;
                      
                      return (
                        <div key={id} className={isAisle ? "mx-4" : ""}>
                          {!isAisle && (
                            <Seat 
                              id={id + 1}
                              category={getSeatCategory(id + 1)}
                              status={taken.includes(id + 1) ? 'taken' : selected.includes(id + 1) ? 'selected' : 'available'}
                              onToggle={toggleSeat}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* LEGEND */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-t-sm"></div>
                <span className="text-gray-300">Regular ($12)</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="w-5 h-5 bg-amber-500 rounded-t-sm"></div>
                <span className="text-gray-300">Premium ($16)</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="w-5 h-5 bg-purple-500 rounded-t-sm"></div>
                <span className="text-gray-300">VIP ($18)</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="w-5 h-5 bg-gray-700 rounded-t-sm opacity-40"></div>
                <span className="text-gray-400">Occupied</span>
              </div>
            </div>
          </div>

          {/* BOOKING SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 sticky top-8 shadow-2xl">
              
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-400">📽️</span> Booking Summary
              </h3>

              <div className="space-y-4 mb-6 border-b border-gray-700 pb-4">
                <div>
                  <p className="text-gray-400 text-sm">Movie</p>
                  <p className="font-semibold text-white truncate">{movieName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Showtime</p>
                  <p className="font-semibold text-white">{selectedShowtime}</p>
                </div>
              </div>

              {selected.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm font-semibold mb-3">Selected Seats ({selected.length}/10)</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedSeatsInfo.map(seat => (
                        <div key={seat.id} className="flex justify-between items-center bg-gray-700/50 p-2 rounded border border-gray-600/50">
                          <span className="text-sm">Seat {seat.id} <span className="text-xs text-gray-400 capitalize">({seat.category})</span></span>
                          <span className="text-green-400 font-semibold">${seat.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4 mb-6 border border-gray-600/50">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Subtotal</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300 mb-3">
                      <span>Processing Fee</span>
                      <span>${selected.length > 0 ? 2.5 : 0}</span>
                    </div>
                    <div className="border-t border-gray-600 pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-indigo-400">${getTotalPrice() + (selected.length > 0 ? 2.5 : 0)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-500/30 mb-3 transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>

                  <button 
                    onClick={clearSelection}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-2 rounded-lg font-semibold transition text-sm"
                  >
                    Clear Selection
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm mb-2">👉 Select seats to begin</p>
                  <p className="text-gray-500 text-xs">Maximum 10 seats per booking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>
            
            <div className="space-y-4 mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-300">Movie:</span>
                <span className="font-semibold">{movieName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Time:</span>
                <span className="font-semibold">{selectedShowtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Seats:</span>
                <span className="font-semibold">{selected.sort((a, b) => a - b).join(', ')}</span>
              </div>
              <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-indigo-400">${getTotalPrice() + (selected.length > 0 ? 2.5 : 0)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Back
              </button>
              <button 
                onClick={() => {
                  alert('✅ Booking confirmed! Check your email for confirmation.');
                  setSelected([]);
                  setShowCheckout(false);
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
