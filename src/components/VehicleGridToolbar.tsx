import React from 'react';
import { Search, Settings, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types/fleet';

interface VehicleGridToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  onFilterClick: () => void;
  onCustomizeClick: () => void;
  totalVehicles: number;
}

export default function VehicleGridToolbar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  onFilterClick,
  onCustomizeClick,
  totalVehicles,
}: VehicleGridToolbarProps) {
  const sortOptions: SortOption[] = [
    { field: 'name', label: 'Name' },
    { field: 'status', label: 'Status' },
    { field: 'fuelLevel', label: 'Fuel Level' },
    { field: 'mileage', label: 'Mileage' },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-200">
            Vehicles
          </h2>
          <span className="px-2 py-1 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {totalVehicles}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search vehicles..."
              className="pl-9 pr-4 py-2 w-64 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
            />
          </div>
          <button
            onClick={onCustomizeClick}
            className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm text-sm font-medium text-gray-900 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Customize
          </button>
          <button
            onClick={onFilterClick}
            className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm text-sm font-medium text-gray-900 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <ArrowUpDown className="w-4 h-4 mr-1" />
          Sort by:
        </span>
        {sortOptions.map((option) => (
          <button
            key={option.field}
            onClick={() => onSortChange(option)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy.field === option.field
                ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}