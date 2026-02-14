export function CheckoutModal({ 
  isOpen, 
  movieName, 
  selectedShowtime, 
  selected, 
  totalPrice,
  onConfirm,
  onClose
}) {
  if (!isOpen) return null;

  return (
    // [BUG - LAYERS] 'z-0' puts modal behind content instead of in front.
    // [FIX] z-50
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-0">
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
            <span className="text-indigo-400">${totalPrice}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Back
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
