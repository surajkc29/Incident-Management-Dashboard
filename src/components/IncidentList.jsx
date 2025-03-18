import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIncident, updateIncident } from '../store/incidentsSlice';
import { IncidentForm } from './IncidentForm';
import { format } from 'date-fns';
import { Edit2, Trash2, MessageSquare } from 'lucide-react';

export const IncidentList = () => {
  const dispatch = useDispatch();
  const { incidents, filters } = useSelector((state) => state.incidents);
  const [editingIncident, setEditingIncident] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  const filteredIncidents = incidents.filter(incident => {
    if (filters.severity && incident.severity !== filters.severity) return false;
    if (filters.status && incident.status !== filters.status) return false;
    if (filters.searchQuery) {
      const search = filters.searchQuery.toLowerCase();
      return (
        incident.title.toLowerCase().includes(search) ||
        incident.description.toLowerCase().includes(search) ||
        incident.assignedTo?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const handleStatusChange = (incident, newStatus) => {
    dispatch(updateIncident({
      ...incident,
      status: newStatus,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSeverityChange = (incident, newSeverity) => {
    dispatch(updateIncident({
      ...incident,
      severity: newSeverity,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleCommentChange = (incident, newComment) => {
    dispatch(updateIncident({
      ...incident,
      comments: newComment,
      updatedAt: new Date().toISOString()
    }));
    setEditingComment(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-green-900 text-green-200';
      case 'Medium': return 'bg-yellow-900 text-yellow-200';
      case 'High': return 'bg-orange-900 text-orange-200';
      case 'Critical': return 'bg-red-900 text-red-200';
      default: return 'bg-gray-900 text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-900 text-red-200';
      case 'In Progress': return 'bg-yellow-900 text-yellow-200';
      case 'Resolved': return 'bg-green-900 text-green-200';
      default: return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Incident Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Comments
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Severity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {filteredIncidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-gray-700 transition-colors duration-150 hover-trigger">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-200">{incident.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-300 max-w-md">{incident.description}</div>
              </td>
              <td className="px-6 py-4">
                {editingComment === incident.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={incident.comments || ''}
                      onBlur={(e) => handleCommentChange(incident, e.target.value)}
                      className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setEditingComment(incident.id)}
                    className="text-sm text-gray-300 cursor-pointer hover:text-white flex items-center gap-2"
                  >
                    {incident.comments || <MessageSquare className="h-4 w-4" />}
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <select
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident, e.target.value)}
                  className={`rounded-md text-xs font-semibold px-2 py-1 ${getStatusColor(incident.status)} border-0 cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-opacity-50`}
                >
                  {['Open', 'In Progress', 'Resolved'].map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4">
                <select
                  value={incident.severity}
                  onChange={(e) => handleSeverityChange(incident, e.target.value)}
                  className={`rounded-md text-xs font-semibold px-2 py-1 ${getSeverityColor(incident.severity)} border-0 cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-opacity-50`}
                >
                  {['Low', 'Medium', 'High', 'Critical'].map((severity) => (
                    <option key={severity} value={severity}>{severity}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {incident.assignedTo || '-'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {format(new Date(incident.createdAt), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingIncident(incident.id)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-150"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dispatch(deleteIncident(incident.id))}
                    className="text-red-400 hover:text-red-300 transition-colors duration-150"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIncident && (
        <IncidentForm
          incident={incidents.find(i => i.id === editingIncident)}
          onClose={() => setEditingIncident(null)}
        />
      )}
    </div>
  );
};