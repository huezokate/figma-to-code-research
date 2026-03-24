export interface ModeTabBarProps {
  activeTab?: 'sprite' | 'loom' | 'shell';
}

const TABS: { id: 'sprite' | 'loom' | 'shell'; label: string }[] = [
  { id: 'sprite', label: 'Sprite' },
  { id: 'loom', label: 'Loom' },
  { id: 'shell', label: 'Shell' },
];

export default function ModeTabBar({ activeTab = 'sprite' }: ModeTabBarProps) {
  return (
    <nav className="flex gap-2 px-4 py-3 bg-white border-b border-gray-200">
      {TABS.map((tab) =>
        tab.id === activeTab ? (
          <span
            key={tab.id}
            className="bg-pink-500 text-white rounded-full px-4 py-1.5 text-sm font-medium"
          >
            {tab.label}
          </span>
        ) : (
          <span
            key={tab.id}
            className="text-gray-400 px-4 py-1.5 text-sm"
          >
            {tab.label}
          </span>
        )
      )}
    </nav>
  );
}
