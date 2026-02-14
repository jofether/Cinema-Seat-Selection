export function Seat({ status, id, category, onToggle }) {
  // [BUG - SPACING] '-m-2' creates negative margin causing overlap with adjacent seats.
  // [FIX] Remove '-m-2' or use 'm-0'
  const baseClass = "-m-2 w-8 h-8 rounded-t-lg text-xs flex items-center justify-center font-bold transition-all transform hover:scale-125 shadow-sm cursor-pointer duration-200";
  
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
    // [BUG - LAYERS] 'relative -top-4' causes seats to overlap rows above them.
    // [FIX] Remove 'relative -top-4' or use 'relative top-0'
    <div 
      onClick={() => status !== 'taken' && onToggle(id)}
      className={`relative -top-4 ${baseClass} ${getColorClass()}`}
      title={`Seat ${id} - ${category.toUpperCase()}`}
    >
      {id}
    </div>
  );
}
