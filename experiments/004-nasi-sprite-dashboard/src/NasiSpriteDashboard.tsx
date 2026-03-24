import ModeTabBar from '../../002-nasi-app-connect/src/ModeTabBar';

const CARDS = [
  { id: 'daily-mix',    emoji: '🎵', label: 'Daily Mix: Indie Vibes',   wide: true,  tall: true,  from: 'from-violet-400', to: 'to-pink-500'    },
  { id: 'midnight',     emoji: '📖', label: 'The Midnight Library',      wide: false, tall: false, from: 'from-amber-300',  to: 'to-orange-400'  },
  { id: 'netflix-top',  emoji: '🎬', label: 'Top 10 on Netflix',         wide: false, tall: false, from: 'from-red-400',    to: 'to-rose-500'    },
  { id: 'aesthetic',    emoji: '📌', label: 'Aesthetic Inspo',           wide: true,  tall: true,  from: 'from-pink-300',   to: 'to-fuchsia-400' },
  { id: 'crime-junkie', emoji: '🎙️', label: 'Crime Junkie: Latest Ep', wide: false, tall: false, from: 'from-purple-400', to: 'to-violet-500'  },
  { id: 'booktok',      emoji: '📖', label: 'BookTok Picks',             wide: false, tall: false, from: 'from-yellow-300', to: 'to-amber-400'   },
  { id: 'films',        emoji: '🎬', label: 'Films Like Your Favs',      wide: true,  tall: true,  from: 'from-sky-400',    to: 'to-blue-500'    },
  { id: 'room-inspo',   emoji: '📌', label: 'Room Inspo 2026',           wide: false, tall: false, from: 'from-rose-300',   to: 'to-pink-400'    },
  { id: 'artist-radio', emoji: '🎵', label: 'Artist Radio: Lana',        wide: false, tall: false, from: 'from-indigo-400', to: 'to-purple-500'  },
  { id: 'new-drops',    emoji: '🎬', label: 'New Drops This Week',       wide: true,  tall: true,  from: 'from-orange-400', to: 'to-red-500'     },
] as const;

export default function NasiSpriteDashboard() {
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <ModeTabBar activeTab="sprite" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-pink-500">Chaos Curated</h1>
          <p className="text-xs text-gray-400">your AI-curated feed</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={[
                'rounded-2xl bg-gradient-to-br flex flex-col justify-between p-3',
                card.from,
                card.to,
                card.wide ? 'col-span-2' : 'col-span-1',
                card.tall ? 'h-32' : 'h-24',
              ].join(' ')}
            >
              <span className="text-2xl">{card.emoji}</span>
              <p className="text-white text-xs font-medium leading-tight">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
