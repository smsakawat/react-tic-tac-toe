export default function Cell({ value, onCellClick }) {
  return (
    <button
      onClick={onCellClick}
      className="bg-indigo-200 h-20 w-20 border-2 border-slate-400 hover:bg-indigo-300 transition text-3xl font-semibold rounded m-1"
    >
      {value}
    </button>
  );
}
