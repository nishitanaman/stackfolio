import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Achievements = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ category: 'certificate', title: '', description: '', date: '' });
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/achievements');
    setItems(res.data);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k,v])=>data.append(k,v));
    if (file) data.append('file', file);
    if (editing) {
      await api.put(`/achievements/${editing._id}`, data);
      setEditing(null);
    } else {
      await api.post('/achievements', data);
    }
    setForm({ category: 'certificate', title: '', description: '', date: '' });
    setFile(null);
    load();
  };

  const handleEdit = (a) => {
    setEditing(a);
    setForm({ category: a.category, title: a.title, description: a.description, date: a.date?.substr(0,10) });
  };

  const handleDelete = async (id) => {
    await api.delete(`/achievements/${id}`);
    load();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Achievements</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
          <option value="certificate">Certificate</option>
          <option value="hackathon">Hackathon</option>
          <option value="competition">Competition</option>
        </select>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="border p-1" />
        <input placeholder="Date" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="border p-1" />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="border p-1" />
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="bg-blue-500 text-white px-2 py-1">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map(a=> (
          <li key={a._id} className="mb-2">
            <strong>{a.title}</strong> ({a.category})
            <button onClick={()=>handleEdit(a)} className="ml-2 text-blue-600">edit</button>
            <button onClick={()=>handleDelete(a._id)} className="ml-2 text-red-600">delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Achievements;
