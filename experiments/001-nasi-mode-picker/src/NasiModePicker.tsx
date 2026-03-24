const MODES = [
  { id: 'loom',   label: 'Loom',   bg: 'bg-blue-500' },
  { id: 'sprite', label: 'Sprite', bg: 'bg-rose-400'  },
  { id: 'shell',  label: 'Shell',  bg: 'bg-gray-400'  },
] as const;

export default function NasiModePicker() {
  return (
    <div className="max-w-[390px] mx-auto flex flex-col gap-4 p-4">
      <div
        className="rounded-2xl bg-white shadow-md px-6 py-8"
        style={{ animation: 'welcome-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          hello message<br />
          lets pick a vibe<br />
          you can always toggle between modes
        </p>
      </div>

      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => console.log(`Selected mode: ${mode.id}`)}
          className={`${mode.bg} rounded-2xl h-40 w-full flex items-center justify-center cursor-pointer`}
        >
          <span className="text-2xl font-bold text-white">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
