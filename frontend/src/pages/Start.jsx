import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Files <span className="text-indigo-600">Securely</span> and <span className="text-indigo-600">Easily</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload, share, and manage your files with secure authentication and expiration dates.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="cursor-pointer bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
              <p className="text-gray-600">
                Share your files with confidence using JWT authentication and secure links.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Expiration Control</h3>
              <p className="text-gray-600">
                Set expiration dates for your shared files to maintain control over access.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Track Downloads</h3>
              <p className="text-gray-600">
                Monitor how many times your shared files have been downloaded.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4">
                <div className="text-2xl mb-2">1️⃣</div>
                <h3 className="font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600">Create your free account</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">2️⃣</div>
                <h3 className="font-semibold mb-2">Upload</h3>
                <p className="text-gray-600">Upload your files</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">3️⃣</div>
                <h3 className="font-semibold mb-2">Share</h3>
                <p className="text-gray-600">Share the generated link</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">4️⃣</div>
                <h3 className="font-semibold mb-2">Track</h3>
                <p className="text-gray-600">Monitor file downloads</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600 border-t pt-8">
            <p>© 2025 Sanjiv Thapa. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;