import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import ImagePage from './components/ImagePage';
import WorkoutPage from './components/WorkoutPage';
import RestTimerPage from './components/RestTimer';
import StructuredWorkoutPage from './components/StructuredWorkoutPage';

function App() {
  return (
    <div className="p-4">
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
        <Route path="/imagePage" element={<ImagePage />} />
        <Route path="/restTimer" element={<RestTimerPage />} />
        <Route path="/structuredWorkoutPage" element={<StructuredWorkoutPage />} />
      </Routes>
    </div>
  );
}

export default App;