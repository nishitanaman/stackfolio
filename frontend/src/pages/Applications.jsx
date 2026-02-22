import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ companyName: '', role: '', appliedDate: '', status: 'Applied' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/applications');
    setApps(res.data);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/applications/${editing._1}`, form);
      setEditing(null);
    } else {
      await api.post('/applications', form);
    }
    setForm({ companyName: '', role: '', appliedDate: '', status: 'Applied' });
    load();
  };

  const handleEdit = (a) => {
    setEditing(a);
    setForm({ companyName: a.companyName, role: a.role, appliedDate: a.appliedDate?.substr(0,10), status: a.status });
  };

  const handleDelete = async (id) => {
    await api.delete(`/applications/${id}`);
    load();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Internship Applications</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <input placeholder="Company" value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})} className="border p-1" />
        <input placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="border p-1" />
        <input type="date" value={form.appliedDate} onChange={e=>setForm({...form,appliedDate:e.target.value})} className="border p-1" />
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="border p-1">
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>
        <button className="bg-blue-500 text-white px-2 py-1">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {apps.map(a=> (
          <li key={a._id} className="mb-2">
            <strong>{a.companyName}</strong> - {a.role} ({a.status})
            <button onClick={()=>handleEdit(a)} className="ml-2 text-blue-600">edit</button>
            <button onClick={()=>handleDelete(a._id)} className="ml-2 text-red-600">delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Applications;
