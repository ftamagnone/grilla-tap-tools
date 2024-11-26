import React from 'react';
import { Car, Truck, Battery, Navigation as NavigationIcon, Calendar, AlertCircle, MoreVertical } from 'lucide-react';
import { Vehicle } from '../types/fleet';
import { format } from 'date-fns';

interface VehicleGridCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

const vehicleIcons = {
  car: Car,
  truck: Truck,
  van: Truck,
};

export default function VehicleGridCard({ vehicle, onSelect }: VehicleGridCardProps) {
  const Icon = vehicleIcons[vehicle.type];
  const needsMaintenance = new Date(vehicle.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'maintenance':
        return 'text-yellow-400';
      case 'inactive':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-400/10';
      case 'maintenance':
        return 'bg-yellow-400/10';
      case 'inactive':
        return 'bg-red-400/10';
      default:
        return 'bg-gray-400/10';
    }
  };

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-gray-700/50 transition-all cursor-pointer overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`p-2.5 rounded-lg ${getStatusBg(vehicle.status)} transition-colors`}>
              <Icon className={`w-5 h-5 ${getStatusColor(vehicle.status)}`} />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-200 group-hover:text-violet-400 transition-colors">
                {vehicle.name}
              </h3>
              <p className="text-sm text-gray-500">{vehicle.driver}</p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-800">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <Battery className="w-4 h-4 mr-1.5" />
              Fuel
            </div>
            <div className="font-medium text-gray-200">
              {vehicle.fuelLevel}%
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <NavigationIcon className="w-4 h-4 mr-1.5" />
              Updated
            </div>
            <div className="font-medium text-gray-200">
              {format(new Date(vehicle.location.lastUpdated), 'HH:mm')}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <Calendar className="w-4 h-4 mr-1.5" />
              Service
            </div>
            <div className="flex items-center">
              {needsMaintenance && (
                <AlertCircle className="w-4 h-4 text-yellow-400 mr-1" />
              )}
              <span className={`font-medium ${needsMaintenance ? 'text-yellow-400' : 'text-gray-200'}`}>
                {format(new Date(vehicle.nextMaintenance), 'MMM dd')}
              </span>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-2.5">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <span className="w-4 h-4 mr-1.5">mi</span>
              Mileage
            </div>
            <div className="font-medium text-gray-200">
              {vehicle.mileage.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-gray-800/50 bg-gray-800/25">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBg(vehicle.status)} ${getStatusColor(vehicle.status)}`}>
            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
          </span>
          <span className="text-sm text-gray-400">
            ID: {vehicle.id}
          </span>
        </div>
      </div>
    </div>
  );
}