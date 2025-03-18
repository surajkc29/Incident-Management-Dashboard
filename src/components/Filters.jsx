import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/incidentsSlice';
import { Filter, Search } from 'lucide-react';

export const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.incidents.filters);

  return (
    <div className="p-4 border-b border-gray-700 bg-gray-800/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter className="h-5 w-5" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex flex-1 flex-wrap gap-4">
          <select
            value={filters.severity || ''}
            onChange={(e) => dispatch(setFilters({ ...filters, severity: e.target.value || undefined }))}
            className="rounded-lg border-gray-600 bg-gray-700 text-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 min-w-[140px]"
          >
            <option value="">All Severities</option>
            {['Low', 'Medium', 'High', 'Critical'].map((severity) => (
              <option key={severity} value={severity}>{severity}</option>
            ))}
          </select>

          <select
            value={filters.status || ''}
            onChange={(e) => dispatch(setFilters({ ...filters, status: e.target.value || undefined }))}
            className="rounded-lg border-gray-600 bg-gray-700 text-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 min-w-[140px]"
          >
            <option value="">All Statuses</option>
            {['Open', 'In Progress', 'Resolved'].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={filters.searchQuery || ''}
              onChange={(e) => dispatch(setFilters({ ...filters, searchQuery: e.target.value }))}
              className="pl-10 w-full rounded-lg border-gray-600 bg-gray-700 text-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};