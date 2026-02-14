import { Seat } from './Seat';

export function SeatingGrid({ 
  rows, 
  cols, 
  selected, 
  taken, 
  getSeatCategory, 
  onToggle 
}) {
  return (
    <div>
      {/* SCREEN */}
      <div className="mb-12 relative">
        <div className="h-6 bg-gradient-to-r from-white/5 via-white/30 to-white/5 rounded-full blur-lg mb-4 shadow-2xl"></div>
        <div className="text-center text-gray-400 text-sm tracking-widest uppercase font-semibold">Screen</div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-white/10 to-transparent blur-3xl -z-10 rounded-full"></div>
      </div>

      {/* SEATING GRID */}
      // [BUG - LAYOUT] 'grid-cols-4' breaks the expected column count, seating arrangement becomes jumbled.
      // [FIX] grid-cols-10 or flex layout
      <div className="grid grid-cols-4 items-center gap-4 bg-gray-800/30 p-8 rounded-xl border border-gray-700/50">
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
                        onToggle={onToggle}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
