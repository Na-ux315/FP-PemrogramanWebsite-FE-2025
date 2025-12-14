import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Tile {
  id: number;
  currentPos: number | null; // null jika masih di samping
  correctPos: number;
}

const PlayPuzzle: React.FC = () => {
  const { id } = useParams();
  const [gridSize, setGridSize] = useState(3); // Contoh default Medium
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [shuffledTiles, setShuffledTiles] = useState<Tile[]>([]);
  const [gridSlots, setGridSlots] = useState<(Tile | null)[]>([]);
  const [imageUrl, setImageUrl] = useState("https://placekitten.com/600/600"); // Ganti dengan URL API
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const totalTiles = gridSize * gridSize;
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => ({
      id: i,
      currentPos: null,
      correctPos: i
    }));
    
    setTiles(initialTiles);
    setShuffledTiles([...initialTiles].sort(() => Math.random() - 0.5));
    setGridSlots(Array(totalTiles).fill(null));
  }, [gridSize]);

  const onDragStart = (e: React.DragEvent, tile: Tile, origin: 'side' | 'grid', index?: number) => {
    e.dataTransfer.setData("tileId", tile.id.toString());
    e.dataTransfer.setData("origin", origin);
    if (index !== undefined) e.dataTransfer.setData("originIndex", index.toString());
  };

  const onDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const tileId = parseInt(e.dataTransfer.getData("tileId"));
    const origin = e.dataTransfer.getData("origin");
    
    if (gridSlots[targetIndex]) return; // Slot sudah terisi

    const movingTile = tiles.find(t => t.id === tileId)!;
    const newGridSlots = [...gridSlots];

    // Jika pindah dari slot grid lain, kosongkan slot lama
    if (origin === 'grid') {
      const oldIndex = parseInt(e.dataTransfer.getData("originIndex"));
      newGridSlots[oldIndex] = null;
    } else {
      // Jika dari samping, hapus dari daftar samping
      setShuffledTiles(prev => prev.filter(t => t.id !== tileId));
    }

    newGridSlots[targetIndex] = movingTile;
    setGridSlots(newGridSlots);
    checkWin(newGridSlots);
  };

  const checkWin = (currentSlots: (Tile | null)[]) => {
    const win = currentSlots.every((slot, index) => slot?.correctPos === index);
    if (win) setIsWin(true);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-purple-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Puzzle Game</h1>
      
      <div className="flex gap-8 bg-purple-800 p-6 rounded-xl shadow-2xl">
        {/* GRID UTAMA */}
        <div 
          className="grid gap-1 bg-purple-700 p-2"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: '400px', height: '400px'
          }}
        >
          {gridSlots.map((tile, index) => (
            <div
              key={index}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, index)}
              className="bg-purple-600/30 border border-purple-500 flex items-center justify-center text-purple-300 relative"
            >
              {tile ? (
                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, tile, 'grid', index)}
                  className="w-full h-full cursor-move"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: `${gridSize * 100}%`,
                    backgroundPosition: `${(tile.id % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(tile.id / gridSize) * (100 / (gridSize - 1))}%`
                  }}
                />
              ) : (index + 1)}
            </div>
          ))}
        </div>

        {/* POTONGAN PUZZLE (SAMPING) */}
        <div className="w-64 bg-purple-950 p-4 rounded-lg overflow-y-auto" style={{ maxHeight: '400px' }}>
          <h3 className="text-center mb-4 font-bold border-b pb-2">Potongan Puzzle</h3>
          <div className="flex flex-wrap gap-2">
            {shuffledTiles.map((tile) => (
              <div
                key={tile.id}
                draggable
                onDragStart={(e) => onDragStart(e, tile, 'side')}
                className="w-20 h-20 border-2 border-white cursor-move hover:scale-105 transition-transform"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${gridSize * 100}%`,
                  backgroundPosition: `${(tile.id % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(tile.id / gridSize) * (100 / (gridSize - 1))}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {isWin && (
        <div className="mt-8 p-6 bg-yellow-400 text-purple-900 rounded-lg text-center animate-bounce">
          <h2 className="text-4xl font-black">LUAR BIASA!</h2>
          <p>Kamu berhasil menyelesaikan puzzle!</p>
        </div>
      )}
    </div>
  );
};

export default PlayPuzzle;
