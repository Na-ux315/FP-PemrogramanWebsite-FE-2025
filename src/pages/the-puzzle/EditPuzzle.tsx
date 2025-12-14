import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPuzzle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    grid_size: 2,
  });

  useEffect(() => {
    // Simulasi Fetch Data
    // fetch(`/api/puzzle/${id}`).then(res => res.json()).then(data => setFormData(data));
    console.log("Loading data for ID:", id);
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data Berhasil Diperbarui!");
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Edit Puzzle</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Nama Game</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1">Ganti Kesulitan</label>
          <select 
            className="w-full p-2 border rounded"
            value={formData.grid_size}
            onChange={(e) => setFormData({...formData, grid_size: parseInt(e.target.value)})}
          >
            <option value={2}>Easy (2x2)</option>
            <option value={3}>Medium (3x3)</option>
            <option value={4}>Hard (4x4)</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Perbarui
        </button>
      </form>
    </div>
  );
};

export default EditPuzzle;
