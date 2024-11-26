import React from 'react';
import { LayoutDashboard, Grid } from 'lucide-react';

interface NavigationProps {
  currentView: 'dashboard' | 'grid';
  onViewChange: (view: 'dashboard' | 'grid') => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="flex space-x-2 mb-6">
      <button
        onClick={() => onViewChange('dashboard')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          currentView === 'dashboard'
            ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
      >
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          currentView === 'grid'
            ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
      >
        <Grid className="w-4 h-4 mr-2" />
        Vehicles Grid
      </button>
    </div>
  );
}