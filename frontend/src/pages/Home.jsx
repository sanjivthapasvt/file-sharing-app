import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE = `${apiUrl}/api`;

const FileShare = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_BASE}/files/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      console.log("Files response:", response.data);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage("Please select a file");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    // Add expiry date if provided
    if (expiryDate) {
      formData.append("expires_at", new Date(expiryDate).toISOString());
    }
    
    // Add custom share link if provided
    if (customLink) {
      formData.append("share_link", customLink);
    }
    
    try {
      await axios.post(`${API_BASE}/files/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchFiles();
      setSelectedFile(null);
      setExpiryDate("");
      setCustomLink("");
    } catch (error) {
      console.error("Upload failed", error);
      setErrorMessage(error.response?.data?.error || "Upload failed. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (fileId) => {
    if (window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      try {
        await axios.delete(`${API_BASE}/files/${fileId}/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        
        // Update the files list after successful deletion
        setFiles(files.filter(file => file.id !== fileId));
      } catch (error) {
        console.error("Delete failed", error);
        setErrorMessage(error.response?.data?.error || "Failed to delete file. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">FileShare</h1>
        
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{errorMessage}</p>
          </div>
        )}
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select File
            </label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (Optional)
            </label>
            <input 
              type="datetime-local" 
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="cursor-pointer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty for default two days
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Link ID (Optional)
            </label>
            <input 
              type="text" 
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
              placeholder="my-custom-link"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty for auto-generated UUID
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </form>
        
        <h2 className="text-xl font-semibold mt-8">Uploaded Files</h2>
        
        {files.length === 0 ? (
          <p className="text-gray-500 mt-4">No files uploaded yet</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Share Link
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`${API_BASE}/download/${file.share_link}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {file.file.split("/").pop()}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{file.share_link}</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(`${API_BASE}/download/${file.share_link}/`)}
                          className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(file.expires_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileShare;