import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', techStack: '', description: '', githubLink: '', status: 'ongoing' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/projects');
    setProjects(res.data);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, techStack: form.techStack.split(',').map(s => s.trim()) };
    if (editing) {
      await api.put(`/projects/${editing._id}`, payload);
      setEditing(null);
    } else {
      await api.post('/projects', payload);
    }
    setForm({ title: '', techStack: '', description: '', githubLink: '', status: 'ongoing' });
    load();
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title,
      techStack: p.techStack.join(', '),
      description: p.description,
      githubLink: p.githubLink,
      status: p.status
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Projects</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="border p-1 mr-2" />
        <input placeholder="Tech stack (comma)" value={form.techStack} onChange={e=>setForm({...form,techStack:e.target.value})} className="border p-1 mr-2" />
        <input placeholder="GitHub link" value={form.githubLink} onChange={e=>setForm({...form,githubLink:e.target.value})} className="border p-1 mr-2" />
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="border p-1 mr-2">
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button className="bg-blue-500 text-white px-2 py-1">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {projects.map(p=> (
          <li key={p._id} className="mb-2">
            <strong>{p.title}</strong> ({p.status})
            <button onClick={()=>handleEdit(p)} className="ml-2 text-blue-600">edit</button>
            <button onClick={()=>handleDelete(p._id)} className="ml-2 text-red-600">delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Projects;
