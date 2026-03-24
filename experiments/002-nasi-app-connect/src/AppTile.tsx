export interface AppTileProps {
  label: string;
  icon: string;
  selected: boolean;
  onToggle: () => void;
}

export default function AppTile({ label, icon, selected, onToggle }: AppTileProps) {
  return (
    <button
      onClick={onToggle}
      className="flex flex-col items-center w-full"
      type="button"
    >
      <div
        className={[
          'rounded-2xl w-full aspect-square flex items-center justify-center text-2xl transition-colors',
          selected
            ? 'bg-pink-50 border-2 border-pink-400'
            : 'bg-gray-100 border-2 border-transparent',
        ].join(' ')}
      >
        {icon}
      </div>
      <span className="text-xs text-center mt-1.5 text-gray-700 leading-tight w-full">
        {label}
      </span>
    </button>
  );
}
