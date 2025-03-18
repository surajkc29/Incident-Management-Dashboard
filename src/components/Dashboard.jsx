import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IncidentList } from './IncidentList';
import { IncidentForm } from './IncidentForm';
import { Filters } from './Filters';
import { Statistics } from './Statistics';
import { Plus } from 'lucide-react';

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const incidents = useSelector((state) => state.incidents.incidents);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Incident Dashboard</h1>
            <p className="mt-1 text-gray-400">Track and manage incidents in real-time</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Incident
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
              <Filters />
              <IncidentList />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Statistics incidents={incidents} />
            </div>
          </div>
        </div>

        {showForm && <IncidentForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
};