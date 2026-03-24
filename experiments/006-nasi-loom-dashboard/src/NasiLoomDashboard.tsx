import { useState } from 'react';
import ModeTabBar from './ModeTabBar';

const INSPO_CARDS = [
  'Inspo 1:\nImprove your right hook',
  'Inspo 2:\nTry yourself in poetry',
  'Inspo 3:\nGardening tips 101',
  'Inspo 4:\nNew UI trends',
];

const PREV_PROJECTS = [
  { title: 'Brand identity refresh', date: 'Mar 18' },
  { title: 'Short story draft', date: 'Mar 15' },
  { title: 'Website wireframes', date: 'Mar 10' },
];

export default function NasiLoomDashboard() {
  const [shareText, setShareText] = useState('');

  return (
    <div className="flex flex-col w-[390px] min-h-[844px] bg-gray-50 overflow-y-auto">
      {/* Tab bar — Loom active */}
      <ModeTabBar activeTab="loom" />

      {/* Document header area */}
      <div className="bg-gray-900 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
            L
          </div>
          <div>
            <p className="text-white text-sm font-medium">My Loom workspace</p>
            <p className="text-gray-400 text-xs">3 active projects</p>
          </div>
        </div>
      </div>

      {/* Main prompt card */}
      <div className="px-4 pt-4 pb-2">
        <button className="w-full bg-blue-500 rounded-2xl px-6 py-10 text-center shadow-md active:scale-[0.98] transition-transform">
          <p className="text-white text-xl font-semibold leading-snug">
            What are we working on today?
          </p>
          <p className="text-blue-100 text-sm mt-2">Tap to start a session</p>
        </button>
      </div>

      {/* Inspiration cards — 2×2 grid */}
      <div className="px-4 py-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Inspiration</p>
        <div className="grid grid-cols-2 gap-3">
          {INSPO_CARDS.map((copy, i) => (
            <button
              key={i}
              className="bg-white rounded-2xl border border-gray-200 px-3 py-4 text-left shadow-sm active:bg-gray-50"
            >
              {copy.split('\n').map((line, j) => (
                <p key={j} className={j === 0 ? 'text-xs text-blue-500 font-medium' : 'text-sm text-gray-700 mt-0.5'}>
                  {line}
                </p>
              ))}
            </button>
          ))}
        </div>
      </div>

      {/* Previous projects */}
      <div className="px-4 py-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Previous projects</p>
        <div className="bg-blue-500 rounded-2xl overflow-hidden shadow-md">
          {PREV_PROJECTS.map((proj, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-4 py-3 ${
                i < PREV_PROJECTS.length - 1 ? 'border-b border-blue-400' : ''
              }`}
            >
              <p className="text-white text-sm font-medium">{proj.title}</p>
              <p className="text-blue-100 text-xs">{proj.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share your work */}
      <div className="px-4 py-3">
        <div className="bg-violet-600 rounded-2xl px-4 py-4 shadow-md">
          <p className="text-white text-sm font-semibold mb-2">Share your work</p>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            placeholder="What did you make today?"
            rows={3}
            className="w-full bg-violet-500 rounded-xl px-3 py-2 text-white placeholder-violet-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <button className="mt-2 w-full bg-white text-violet-600 rounded-xl py-2 text-sm font-semibold">
            Share
          </button>
        </div>
      </div>

      {/* Content you follow / endless scroll */}
      <div className="px-4 py-3 pb-8">
        <div className="bg-gray-900 rounded-2xl px-4 py-4 shadow-md">
          <p className="text-white text-sm font-semibold mb-1">Content you follow</p>
          <p className="text-gray-400 text-xs mb-3">endless scroll</p>
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-800 rounded-xl px-3 py-3 mb-2 last:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center font-bold">
                  {n}
                </div>
                <p className="text-gray-300 text-xs font-medium">Creator {n}</p>
              </div>
              <p className="text-gray-400 text-xs">New post from your feed</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
