import { useState, useEffect } from 'react';

function ImagePage() {
  const [imageList, setImageList] = useState(() => {
    const saved = localStorage.getItem('images');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareSelection, setCompareSelection] = useState([]);

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(imageList));
  }, [imageList]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const maxSize = 250000;

    if (file && file.size > maxSize) {
      alert("Image must be smaller than 250KB");
      return;
    }

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const newImage = {
          src: reader.result,
          timestamp: Date.now()
        };
        setImageList(prev => [newImage, ...prev]);
      };
    }
  };

  const handleDelete = (timestamp) => {
    const filtered = imageList.filter(img => img.timestamp !== timestamp);
    setImageList(filtered);
    setCompareSelection(prev => prev.filter(ts => ts !== timestamp));
  };

  const toggleCompare = (timestamp) => {
    setCompareSelection(prev => {
      if (prev.includes(timestamp)) {
        return prev.filter(ts => ts !== timestamp);
      } else if (prev.length < 2) {
        return [...prev, timestamp];
      } else {
        return [prev[1], timestamp];
      }
    });
  };

  // Sort images by timestamp (from newest to oldest)
  const sortedImages = [...imageList].sort((a, b) => b.timestamp - a.timestamp);

  const selectedImages = imageList.filter(img => compareSelection.includes(img.timestamp));

  return (
    <div className="p-4 mt-16"> {/* Added mt-16 to add margin-top to prevent overlap with the menu */}
      <h2 className="text-2xl font-bold mb-4">Progress Pictures</h2>

      <label className="inline-block bg-orange-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-700 transition">
        Upload Image
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      {/* If there are two images selected for comparison, show the comparison view */}
      {compareSelection.length === 2 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Comparison</h3>
          <div className="flex justify-center gap-8"> {/* Flexbox to align images horizontally */}
            {selectedImages.map((img, i) => (
              <div key={i} className="border p-4 rounded bg-gray-100 shadow">
                <img src={img.src} alt={`Compare ${i}`} className="w-full rounded mb-2" />
                <div className="text-sm text-gray-600">{new Date(img.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        {/* Images are sorted by date, but not grouped */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedImages.map((img, index) => (
            <div key={index} className="border p-4 rounded shadow bg-gray-100 flex flex-col justify-between h-full"> {/* Make sure it takes up full height */}
              <img src={img.src} alt={`Upload ${index}`} className="w-full rounded mb-2" />
              
              {/* Buttons underneath the image, inside the same box */}
              <div className="flex flex-col sm:flex-row gap-2 mt-2">

                <button
                  onClick={() => handleDelete(img.timestamp)}
                  className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-600 text-xs w-full"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleCompare(img.timestamp)}
                  className={`px-2 py-1 text-xs rounded w-full ${
                    compareSelection.includes(img.timestamp)
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {compareSelection.includes(img.timestamp) ? 'Selected' : 'Compare'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagePage;
