import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Star, Lock } from 'lucide-react';

export function Browser() {
  const [url, setUrl] = useState('https://www.example.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.example.com');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(['https://www.example.com']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (newUrl: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentUrl(newUrl);
      const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let urlToNavigate = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      urlToNavigate = 'https://' + url;
    }
    setUrl(urlToNavigate);
    navigate(urlToNavigate);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const newUrl = history[newIndex];
      setCurrentUrl(newUrl);
      setUrl(newUrl);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newUrl = history[newIndex];
      setCurrentUrl(newUrl);
      setUrl(newUrl);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleHome = () => {
    const homeUrl = 'https://www.example.com';
    setUrl(homeUrl);
    navigate(homeUrl);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Navigation Bar */}
      <div className="border-b bg-gray-50 p-2 flex items-center gap-2">
        <button
          onClick={handleBack}
          disabled={historyIndex === 0}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleForward}
          disabled={historyIndex === history.length - 1}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={handleHome}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Home className="w-5 h-5" />
        </button>

        {/* URL Bar */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border rounded-full">
            <Lock className="w-4 h-4 text-green-600" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 outline-none text-sm"
              placeholder="Search or enter website address"
            />
            <Search className="w-4 h-4 text-gray-400" />
          </div>
        </form>

        <button className="p-2 hover:bg-gray-200 rounded">
          <Star className="w-5 h-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <RotateCw className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500" />
              <p className="text-gray-500">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Example Domain</h1>
                <p className="text-gray-600 mb-4">
                  This is a simulated web browser interface.
                </p>
                <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Current URL:</strong> {currentUrl}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
                <p className="text-gray-700 mb-4">
                  This is a simulated browser environment. You can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Navigate using the back and forward buttons</li>
                  <li>Refresh the page with the reload button</li>
                  <li>Go home with the home button</li>
                  <li>Enter URLs in the address bar (simulated navigation)</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold mb-2">Quick Links</h3>
                  <ul className="space-y-1 text-sm text-blue-600">
                    <li><a href="#" className="hover:underline">Example.com</a></li>
                    <li><a href="#" className="hover:underline">Sample Site</a></li>
                    <li><a href="#" className="hover:underline">Demo Page</a></li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold mb-2">Features</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>🔒 Secure browsing</li>
                    <li>🔍 Search functionality</li>
                    <li>⭐ Bookmark support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
