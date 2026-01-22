import MMLogo from '../assets/MMLogo.png'; // Adjust the path if needed

function Header() {
  return (
    <header className="w-full bg-orange-600 text-white flex items-center p-4 shadow-md fixed top-0 left-0 z-50">
      <img src={MMLogo} alt="MM Logo" className="h-10 w-auto mr-4" />
      <h1 className="text-xl font-bold">Muscle Max</h1>
    </header>
  );
}

export default Header;