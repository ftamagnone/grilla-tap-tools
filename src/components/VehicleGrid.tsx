import React, { useState, useMemo } from 'react';
import { Battery, Calendar, Navigation, Car, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { Vehicle, SortOption, GridCustomization } from '../types/fleet';
import VehicleGridToolbar from './VehicleGridToolbar';
import CustomizeModal from './CustomizeModal';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const vehicleIcons = {
  car: Car,
  truck: Truck,
  van: Truck,
};

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>({ field: 'name', label: 'Name' });
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customization, setCustomization] = useState<GridCustomization>({
    columns: [
      { id: 'vehicle', label: 'Vehicle', enabled: true, order: 1 },
      { id: 'info', label: 'Info', enabled: true, order: 2 },
      { id: 'status', label: 'Status', enabled: true, order: 3 },
      { id: 'fuel', label: 'Fuel', enabled: true, order: 4 },
      { id: 'lastUpdate', label: 'Last Update', enabled: true, order: 5 },
      { id: 'serviceDate', label: 'Service Date', enabled: true, order: 6 },
      { id: 'mileage', label: 'Mileage', enabled: true, order: 7 },
    ],
    rowSize: 'M',
    showHorizontalLines: true,
    showVerticalLines: true,
  });

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        vehicle =>
          vehicle.name.toLowerCase().includes(searchLower) ||
          vehicle.driver.toLowerCase().includes(searchLower) ||
          vehicle.id.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortBy.field as keyof Vehicle];
      const bValue = b[sortBy.field as keyof Vehicle];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }
      return 0;
    });

    return result;
  }, [vehicles, search, sortBy]);

  const handleFilterClick = () => {
    // Implement filter functionality
  };

  const getRowSizeClass = () => {
    switch (customization.rowSize) {
      case 'S':
        return 'py-2';
      case 'L':
        return 'py-4';
      default:
        return 'py-3';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400';
      case 'maintenance':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'inactive':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-400/10';
      case 'maintenance':
        return 'bg-yellow-100 dark:bg-yellow-400/10';
      case 'inactive':
        return 'bg-red-100 dark:bg-red-400/10';
      default:
        return 'bg-gray-100 dark:bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <VehicleGridToolbar
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onFilterClick={handleFilterClick}
        onCustomizeClick={() => setIsCustomizeOpen(true)}
        totalVehicles={filteredVehicles.length}
      />
      
      <div className="overflow-x-auto">
        <table className={`w-full border-separate border-spacing-0 ${
          !customization.showHorizontalLines ? 'divide-y-0' : 'divide-y divide-gray-200 dark:divide-gray-800'
        }`}>
          <thead>
            <tr>
              {customization.columns
                .filter(col => col.enabled)
                .sort((a, b) => a.order - b.order)
                .map(column => (
                  <th
                    key={column.id}
                    className={`sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 first:rounded-tl-lg last:rounded-tr-lg ${
                      customization.showVerticalLines ? 'border-r border-gray-200 dark:border-gray-800 last:border-r-0' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredVehicles.map((vehicle) => {
              const Icon = vehicleIcons[vehicle.type];
              const needsMaintenance = new Date(vehicle.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              
              return (
                <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {customization.columns
                    .filter(col => col.enabled)
                    .sort((a, b) => a.order - b.order)
                    .map(column => {
                      const cellClass = `px-4 ${getRowSizeClass()} ${
                        customization.showVerticalLines ? 'border-r border-gray-200 dark:border-gray-800 last:border-r-0' : ''
                      }`;

                      switch (column.id) {
                        case 'vehicle':
                          return (
                            <td key={column.id} className={cellClass}>
                              <div className="flex items-center">
                                <div className={`p-2 rounded-lg ${getStatusBg(vehicle.status)}`}>
                                  <Icon className={`w-5 h-5 ${getStatusColor(vehicle.status)}`} />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{vehicle.name}</div>
                                  <div className="text-sm text-gray-500">{vehicle.driver}</div>
                                </div>
                              </div>
                            </td>
                          );
                        case 'info':
                          return (
                            <td key={column.id} className={cellClass}>
                              <div className="text-sm text-gray-600 dark:text-gray-400">ID: {vehicle.id}</div>
                              <div className="text-sm text-gray-500">Type: {vehicle.type}</div>
                            </td>
                          );
                        case 'status':
                          return (
                            <td key={column.id} className={cellClass}>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBg(vehicle.status)} ${getStatusColor(vehicle.status)}`}>
                                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                              </span>
                            </td>
                          );
                        case 'fuel':
                          return (
                            <td key={column.id} className={cellClass}>
                              <div className="flex items-center text-sm">
                                <Battery className="w-4 h-4 mr-1.5 text-gray-500" />
                                <span className="text-gray-900 dark:text-gray-200">{vehicle.fuelLevel}%</span>
                              </div>
                            </td>
                          );
                        case 'lastUpdate':
                          return (
                            <td key={column.id} className={cellClass}>
                              <div className="flex items-center text-sm">
                                <Navigation className="w-4 h-4 mr-1.5 text-gray-500" />
                                <span className="text-gray-900 dark:text-gray-200">
                                  {format(new Date(vehicle.location.lastUpdated), 'HH:mm')}
                                </span>
                              </div>
                            </td>
                          );
                        case 'serviceDate':
                          return (
                            <td key={column.id} className={cellClass}>
                              <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-1.5 text-gray-500" />
                                <span className={needsMaintenance ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-gray-200'}>
                                  {format(new Date(vehicle.nextMaintenance), 'MMM dd')}
                                </span>
                              </div>
                            </td>
                          );
                        case 'mileage':
                          return (
                            <td key={column.id} className={cellClass}>
                              <span className="text-sm text-gray-900 dark:text-gray-200">
                                {vehicle.mileage.toLocaleString()} mi
                              </span>
                            </td>
                          );
                        default:
                          return null;
                      }
                    })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        customization={customization}
        onSave={setCustomization}
      />
    </div>
  );
}