import React from 'react';
import { Car } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Car className="w-8 h-8 text-violet-600" />
        <div className="absolute inset-0 mix-blend-multiply">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 via-cyan-400 to-cyan-300 opacity-50 rounded-lg" />
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-700 bg-clip-text text-transparent">
          VEC
        </span>
        <span className="text-2xl font-light bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent ml-1">
          fleet
        </span>
      </div>
    </div>
  );
}