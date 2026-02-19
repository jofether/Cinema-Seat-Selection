export function BookingSummary({ 
  movieName, 
  selectedShowtime, 
  selected, 
  selectedSeatsInfo,
  getTotalPrice,
  onCheckout,
  onClearSelection,
  maxSeats = 10
}) {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xx p-6 sticky top-8 shadow-2xl">
      
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-indigo-400">📽️</span> Booking Summary
      </h3>

      <div className="space-y-4 mb-6 border-b border-gray-700 pb-4 m-10">
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
            <p className="text-gray-400 text-sm font-semibold mb-3">Selected Seats ({selected.length}/{maxSeats})</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedSeatsInfo.map(seat => (
                <div key={seat.id} className="flex justify-between items-center bg-gray-700/50 p-2 rounded border border-gray-600/50">
                  <span className="text-sm text-gray-900">Seat {seat.id} <span className="text-xs text-gray-400 capitalize">({seat.category})</span></span>
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
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-500/30 mb-3 transform hover:scale-105"
          >
            Proceed to Checkout
          </button>

          <button 
            onClick={onClearSelection}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-2 rounded-lg font-semibold transition text-sm"
          >
            Clear Selection
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm mb-2">👉 Select seats to begin</p>
          <p className="text-gray-500 text-xs">Maximum {maxSeats} seats per booking</p>
        </div>
      )}
    </div>
  );
}
