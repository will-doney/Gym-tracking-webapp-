import { useState, useEffect } from 'react';

function StructuredWorkoutPage() {
  const [journal, setJournal] = useState([]);
  const [expandedDays, setExpandedDays] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('journal') || '[]');
      setJournal(stored);
    } catch (err) {
      console.error('Invalid journal data', err);
    }
  }, []);

  const grouped = journal.reduce((acc, entry) => {
    const date = new Date(entry.time);
    if (!isNaN(date)) {
      const day = date.toDateString();
      acc[day] = acc[day] || [];
      acc[day].push(entry);
    }
    return acc;
  }, {});

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const filteredGroupKeys = Object.keys(grouped).filter((date) => {
    const lowerSearch = search.toLowerCase();
    const matchesDate = date.toLowerCase().includes(lowerSearch);
    const matchesExercise = grouped[date].some(entry =>
      entry.content?.toLowerCase().includes(lowerSearch)
    );
    return matchesDate || matchesExercise;
  });

  return (
    <div className="p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Structured Workout Log</h1>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search by date or exercise"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 border rounded w-full sm:w-96 bg-gray-100"
      />

      {/* Grouped workout entries */}
      {filteredGroupKeys.length === 0 ? (
        <p className="text-gray-500">No matching entries found.</p>
      ) : (
        filteredGroupKeys.map((date) => (
          <div key={date} className="my-4 p-4 border rounded bg-gray-100 shadow">
            <button
              className="w-full text-left text-lg font-semibold text-orange-600"
              onClick={() => toggleDay(date)}
            >
              {expandedDays[date] ? '▼' : '▶'} {date}
            </button>
            {expandedDays[date] && (
              <div className="mt-2 orange-600">
                {grouped[date]
                  .filter(entry =>
                    entry.content?.toLowerCase().includes(search.toLowerCase()) ||
                    date.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((entry, i) => (
                    <div key={i} className="p-2 border-b last:border-b-0 text-gray-700">
                      <strong>{entry.content || 'Unnamed'}</strong> — {entry.sets} sets, {entry.reps} reps, {entry.weight} kg
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StructuredWorkoutPage;
