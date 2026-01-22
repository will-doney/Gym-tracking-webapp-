import { Link, useLocation } from 'react-router-dom';

function Menu() {
  const location = useLocation();

  const linkStyle = (path) =>
    `flex-1 text-center px-4 py-3 text-sm sm:text-base rounded-md transition-colors ${
      location.pathname === path
        ? 'bg-orange-500 text-gray-100'
        : 'text-gray-200 hover:bg-orange-500'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-gray-700 text-orange-500 rounded-t-xl shadow-lg z-50">
      <ul className="flex justify-between items-center">
        <Link to="/" className={linkStyle('/')}>Workout Log</Link>
        <Link to="/ImagePage" className={linkStyle('/ImagePage')}>Progress</Link>
        <Link to="/restTimer" className={linkStyle('/restTimer')}>Timer</Link>
        <Link to="/structuredWorkoutPage" className={linkStyle('/structuredWorkoutPage')}>Workouts</Link>
      </ul>
    </nav>
  );
}

export default Menu;
