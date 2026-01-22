import { useState, useEffect } from 'react';

function WorkoutPage() {
  const [time, setTime] = useState(null);
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [text, setText] = useState('');

  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem('journal');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('journal', JSON.stringify(journal));
  }, [journal]);

  const handleDelete = (time) => {
    const newJournal = journal.filter(entry => entry.time !== time);
    setJournal(newJournal);
  };

  const handleEdit = (entry) => {
    setText(entry.content);
    setSets(entry.sets);
    setReps(entry.reps);
    setWeight(entry.weight);
    setTime(entry.time);
    const newJournal = journal.filter(item => item.time !== entry.time);
    setJournal(newJournal);
  };

  const updateJournal = () => {
    const timestamp = time || Date.now();
    const newEntry = { time: timestamp, content: text, sets, reps, weight };
    const newJournal = [newEntry, ...journal];
    newJournal.sort((a, b) => b.time - a.time);
    setJournal(newJournal);

    setText('');
    setSets('');
    setReps('');
    setWeight('');
    setTime(null);
  };

  const journalJSX = journal.map((entry, index) => {
    const date = new Date(entry.time);
    const dateString = date.toDateString();
    const timeString = date.toLocaleTimeString();

    return (
      <div key={index} className="m-2 p-4 w-full border-2 border-gray-300 rounded-xl bg-gray-100 shadow-md">
        <div className="text-sm text-gray-500">{dateString} at {timeString}</div>
        <div className="text-lg font-semibold">{entry.content}</div>
        <div className="text-md text-orange-900">Sets: {entry.sets}</div>
        <div className="text-md text-orange-900">Reps: {entry.reps}</div>
        <div className="text-md text-orange-900">Weight: {entry.weight} kg</div>
        <div className="mt-2">
          <button
            className="mr-2 px-3 py-1 bg-yellow-100 border rounded"
            onClick={() => handleEdit(entry)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-100 border rounded"
            onClick={() => handleDelete(entry.time)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="p-4 max-w-xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-4">Add Workout</h2>

      <label>Type of exercise:</label>
      <textarea
        className="w-full p-2 border rounded mb-2 bg-gray-100"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <label>Number of sets:</label>
      <input
        type="number"
        className="w-full p-2 border rounded mb-2 bg-gray-100"
        value={sets}
        onChange={e => setSets(e.target.value)}
      />

      <label>Reps (per set):</label>
      <input
        type="number"
        className="w-full p-2 border rounded mb-2 bg-gray-100"
        value={reps}
        onChange={e => setReps(e.target.value)}
      />

      <label>Weight (kg):</label>
      <input
        type="number"
        className="w-full p-2 border rounded mb-4 bg-gray-100"
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />

      <button
        className="w-full bg-orange-500 text-white py-2 rounded mb-6"
        onClick={updateJournal}
      >
        {time ? 'Update Entry' : 'Add Entry'}
      </button>

      <h2 className="text-xl font-semibold mb-2">Workout Log</h2>
      {journal.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        journalJSX
      )}
    </div>
  );
}

export default WorkoutPage;