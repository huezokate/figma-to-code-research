export default function NasiGlowUp() {
  return (
    <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center gap-8">
      {/* Glow circle */}
      <div
        className="w-60 h-60 rounded-full bg-rose-400 flex items-center justify-center"
        style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
      >
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-pink-300 to-rose-500 opacity-80" />
      </div>

      {/* Avatar placeholder */}
      <div className="w-32 h-40 rounded-2xl bg-gradient-to-b from-pink-300 to-rose-500 flex items-center justify-center">
        <span className="text-4xl">✨</span>
      </div>

      {/* Loading text */}
      <p className="text-rose-300 text-sm tracking-wide animate-pulse">
        Sprite is getting to know you…
      </p>
    </div>
  );
}
