import ModeTabBar from '../../002-nasi-app-connect/src/ModeTabBar';

const CARDS = [
  { id: 'daily-mix',   emoji: '🎵', label: 'Daily Mix: Indie Vibes',  from: 'from-slate-400',  to: 'to-gray-500'  },
  { id: 'reading',     emoji: '📖', label: 'Reading List',             from: 'from-stone-400',  to: 'to-zinc-500'  },
  { id: 'watchlist',   emoji: '🎬', label: 'Watchlist',                from: 'from-gray-400',   to: 'to-slate-500' },
  { id: 'podcasts',    emoji: '🎙️', label: 'Podcast Queue',           from: 'from-zinc-400',   to: 'to-gray-500'  },
  { id: 'saved',       emoji: '📌', label: 'Saved Boards',             from: 'from-slate-300',  to: 'to-gray-400'  },
  { id: 'continue',    emoji: '📖', label: 'Continue Reading',         from: 'from-stone-300',  to: 'to-slate-400' },
] as const;

export default function NasiShellDashboard() {
  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <ModeTabBar activeTab="shell" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-600">Chaos Toned Down</h1>
          <p className="text-xs text-gray-400">calmer. cleaner. still yours.</p>
        </div>

        <div className="flex flex-col gap-4">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl bg-gradient-to-br ${card.from} ${card.to} h-28 flex flex-col justify-between p-4`}
            >
              <span className="text-2xl">{card.emoji}</span>
              <p className="text-white text-sm font-medium">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
