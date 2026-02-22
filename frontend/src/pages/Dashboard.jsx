import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    };
    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      {stats && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded">Projects: {stats.projectCount}</div>
          <div className="p-4 bg-gray-100 rounded">Achievements: {stats.achCount}</div>
          <div className="p-4 bg-gray-100 rounded">Applications: {stats.appCount}</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
