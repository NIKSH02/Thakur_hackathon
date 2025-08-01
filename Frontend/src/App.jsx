// src/App.jsx

import InfiniteMarquee from './components/InfiniteMarquee';
import './index.css'; // Ensure your Tailwind CSS is imported

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center">
      <InfiniteMarquee />
      {/* You can add other content here */}
    </div>
  );
}

export default App;