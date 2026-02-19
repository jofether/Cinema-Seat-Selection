export function SeatingLegend() {
  const legendItems = [
    { color: 'bg-green-500', label: 'Regular ($12)' },
    { color: 'bg-amber-500', label: 'Premium ($16)' },
    { color: 'bg-purple-500', label: 'VIP ($18)' },
    { color: 'bg-gray-700 opacity-40', label: 'Occupied' },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className={`w-5 h-5 ${item.color} rounded-t-sm`}></div>
          <span className="text-gray-900">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
