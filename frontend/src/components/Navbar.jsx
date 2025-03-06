import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const handleHomeClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };
  
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <Link 
        to="/" 
        className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
        onClick={handleHomeClick}
      >
        SvT-FileShare
      </Link>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="https://github.com/sanjivthapasvt" className="text-gray-600 hover:text-gray-800" target="_blank">
          GitHub
        </a>
        <a href="https://instagram.com/sanjivthapasvt1" className="text-gray-600 hover:text-gray-800" target="_blank">
          Instagram
        </a>
      </div>
    </nav>
  );
};

export default Navbar;