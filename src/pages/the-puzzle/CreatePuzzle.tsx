import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { TextareaField } from "@/components/ui/textarea-field";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import Dropzone from "@/components/ui/dropzone";
import { Typography } from "@/components/ui/typography";
import { ArrowLeft, SaveIcon, X, EyeIcon } from "lucide-react";
import api from "@/api/axios";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreatePuzzle: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    grid_size: 2, // Default Easy (2x2)
    time_limit: 0,
    is_publish_immediately: true,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [puzzleImage, setPuzzleImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logika API POST kamu di sini
    console.log("Data dikirim:", formData, thumbnail, puzzleImage);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Buat Puzzle Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Game</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Tingkat Kesulitan (Grid)</label>
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

        <div>
          <label className="block mb-1 font-medium">Upload Gambar Puzzle</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setPuzzleImage(e.target.files?.[0] || null)}
            required 
          />
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Simpan Game
        </button>
      </form>
    </div>
  );
};

export default CreatePuzzle;
