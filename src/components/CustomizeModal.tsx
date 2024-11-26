import React, { useState } from 'react';
import { X, GripVertical, MoreHorizontal } from 'lucide-react';
import { ColumnConfig, GridCustomization } from '../types/fleet';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: GridCustomization;
  onSave: (customization: GridCustomization) => void;
}

export default function CustomizeModal({
  isOpen,
  onClose,
  customization,
  onSave,
}: CustomizeModalProps) {
  const [localCustomization, setLocalCustomization] = useState<GridCustomization>(customization);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDragStart = (columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === columnId) return;

    const draggedIdx = localCustomization.columns.findIndex(col => col.id === draggedColumn);
    const targetIdx = localCustomization.columns.findIndex(col => col.id === columnId);
    
    if (draggedIdx === -1 || targetIdx === -1) return;

    const newColumns = [...localCustomization.columns];
    const [draggedCol] = newColumns.splice(draggedIdx, 1);
    newColumns.splice(targetIdx, 0, draggedCol);
    
    // Update order numbers
    const updatedColumns = newColumns.map((col, idx) => ({
      ...col,
      order: idx + 1,
    }));

    setLocalCustomization(prev => ({
      ...prev,
      columns: updatedColumns,
    }));
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
  };

  const handleColumnToggle = (columnId: string) => {
    setLocalCustomization(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, enabled: !col.enabled } : col
      ),
    }));
  };

  const handleReset = () => {
    setLocalCustomization({
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
  };

  const handleSave = () => {
    onSave(localCustomization);
    onClose();
  };

  const enabledColumns = localCustomization.columns.filter(col => col.enabled);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-medium text-gray-200">Customize Layout</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Draggable Column Order Preview */}
          <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {enabledColumns
                .sort((a, b) => a.order - b.order)
                .map((column, index) => (
                  <div
                    key={column.id}
                    draggable
                    onDragStart={() => handleDragStart(column.id)}
                    onDragOver={(e) => handleDragOver(e, column.id)}
                    onDragEnd={handleDragEnd}
                    className="group flex items-center space-x-2 bg-gray-900 rounded-lg px-3 py-2 cursor-move"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-800 text-xs text-gray-400">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">{column.label}</span>
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </div>
                ))}
            </div>
          </div>

          {/* Available Columns */}
          <div className="grid grid-cols-4 gap-2">
            {localCustomization.columns.map((column) => (
              <button
                key={column.id}
                onClick={() => handleColumnToggle(column.id)}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  column.enabled
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/20'
                    : 'bg-gray-800/50 text-gray-400 border border-transparent hover:bg-gray-800'
                }`}
              >
                {column.label}
              </button>
            ))}
          </div>

          {/* Display Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Row size</span>
              <div className="flex space-x-2">
                {(['S', 'M', 'L'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setLocalCustomization(prev => ({ ...prev, rowSize: size }))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      localCustomization.rowSize === size
                        ? 'bg-violet-500/20 text-violet-400 border border-violet-500/20'
                        : 'text-gray-400 hover:bg-gray-800/50 border border-transparent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Grid lines</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localCustomization.showHorizontalLines}
                    onChange={() => setLocalCustomization(prev => ({
                      ...prev,
                      showHorizontalLines: !prev.showHorizontalLines,
                    }))}
                    className="rounded border-gray-700 bg-gray-800 text-violet-500 focus:ring-violet-500/20"
                  />
                  <span className="text-sm text-gray-300">H-gridlines</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localCustomization.showVerticalLines}
                    onChange={() => setLocalCustomization(prev => ({
                      ...prev,
                      showVerticalLines: !prev.showVerticalLines,
                    }))}
                    className="rounded border-gray-700 bg-gray-800 text-violet-500 focus:ring-violet-500/20"
                  />
                  <span className="text-sm text-gray-300">V-gridlines</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-800">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}