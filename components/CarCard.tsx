
import React from 'react';
import { Car } from '../types';
import { Fuel, Gauge, Settings, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-indigo-600 shadow-sm">
          {car.status.toUpperCase()}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-500">{car.type}</p>
          </div>
          <p className="text-xl font-bold text-indigo-600">
            ${car.price.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 my-4 text-xs text-gray-600">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Fuel size={14} className="mb-1 text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Gauge size={14} className="mb-1 text-gray-400" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Settings size={14} className="mb-1 text-gray-400" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/marketplace/${car.id}`}
            className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            View Details
          </Link>
          <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm">
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
