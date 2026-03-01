'use client';

import { Menu, X } from 'lucide-react';

/**
 * DashboardHeader component
 *
 * Props:
 *  - isSidebarOpen (boolean)  : current sidebar state
 *  - onToggleSidebar (function) : called when hamburger is clicked
 *  - title (string) : heading text (default: 'Bookmaza Dashboard')
 */
export default function DashboardHeader({
  isSidebarOpen,
  onToggleSidebar,
  title = 'Bookmaza Dashboard',
}) {
  return (
    <header className="bg-white shadow-sm p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
    </header>
  );
}
