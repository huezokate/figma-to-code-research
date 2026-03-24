import { useState } from 'react';
import ModeTabBar from './ModeTabBar';
import AppTile from './AppTile';

const APPS = [
  { id: 'apple-music', label: 'Apple Music', icon: '🎵' },
  { id: 'imessage', label: 'iMessage', icon: '💬' },
  { id: 'instagram', label: 'Instagram', icon: '📷' },
  { id: 'spotify', label: 'Spotify', icon: '🎧' },
  { id: 'podcast', label: 'Podcast', icon: '🎙️' },
  { id: 'pinterest', label: 'Pinterest', icon: '📌' },
  { id: 'x', label: 'X', icon: '𝕏' },
  { id: 'wattpad', label: 'Wattpad', icon: '📖' },
  { id: 'tiktok', label: 'TikTok', icon: '🎬' },
  { id: 'oura', label: 'Oura', icon: '💍' },
  { id: 'gallery', label: 'Picture Gallery', icon: '🖼️' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'disney', label: 'Disney', icon: '🏰' },
] as const;

export default function NasiAppConnect() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleApp(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <ModeTabBar activeTab="sprite" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Let's get you set up and connected
        </h1>
        <p className="text-sm text-gray-600 mb-5">
          Select the apps you would like give Sprite access to (include those for Loom and Shell?)
        </p>

        <div className="grid grid-cols-3 gap-3">
          {APPS.map((app) => (
            <AppTile
              key={app.id}
              label={app.label}
              icon={app.icon}
              selected={selected.has(app.id)}
              onToggle={() => toggleApp(app.id)}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white text-xs px-4 py-4 text-center">
        Ideally a super message on security and never selling or using data for evil?
      </div>
    </div>
  );
}
