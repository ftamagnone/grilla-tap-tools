export interface Vehicle {
  id: string;
  name: string;
  type: 'truck' | 'van' | 'car';
  status: 'active' | 'maintenance' | 'inactive';
  location: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  driver: string;
  fuelLevel: number;
  nextMaintenance: string;
  mileage: number;
}

export interface Delivery {
  id: string;
  vehicleId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  destination: string;
  eta: string;
  customer: string;
}

export interface SortOption {
  field: keyof Vehicle | string;
  label: string;
}

export interface FilterState {
  status: ('active' | 'maintenance' | 'inactive')[];
  type: ('truck' | 'van' | 'car')[];
  fuelLevel: [number, number];
  mileage: [number, number];
}

export interface ColumnConfig {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface GridCustomization {
  columns: ColumnConfig[];
  rowSize: 'S' | 'M' | 'L';
  showHorizontalLines: boolean;
  showVerticalLines: boolean;
}