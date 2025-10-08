import { useState } from 'react';
import './App.css';
import UserWatch from './components/section/user-watch';
import Thumbnail from './components/section/thumbnail';
import SongButton from './components/ui/song-button';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-sm container">
        {isLogin ? (
          <Thumbnail />
        ) : (
          <UserWatch
            onClick={() => {
              setIsLogin(true);
            }}
          />
        )}
        {/* persistent audio control mounted at top-level so music stays alive while tab is open */}
        <SongButton />
      </div>
    </div>
  );
}

export default App;
