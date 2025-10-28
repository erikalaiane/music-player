import { useState, useEffect } from 'react';
import { Search, Mail, Bell, Home, Heart, Music, Disc, Tag, Play, Pause, SkipBack, SkipForward, Shuffle, Share2 } from 'lucide-react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(94);
  const totalTime = 215;

  // Avança o tempo automaticamente quando está tocando
  useEffect(() => {
    if (isPlaying && currentTime < totalTime) {
      const timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentTime, totalTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const categories = ['Kpop', 'Hip Hop', 'Pop', 'Rock', 'Indie...'];
  
  const playlists = [
    { title: 'Kpop Favs', author: 'by Érika', image: 'public/images/img1.jpg' },
    { title: 'For Drive', author: 'by Érika', image: 'public/images/img2.jpg' },
    { title: 'Futuristics', author: 'by Érika', image: 'public/images/img3.jpg' }
  ];

  const favoritePlaylists = [
    { title: 'Moment', songs: '32 songs in this list', image: 'public/images/img4.jpg'},
    { title: 'code playlist', songs: '28 songs in this list', image: 'public/images/img5.jpg'}
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      
      <div className="w-full max-w-7xl bg-gray-200 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">MUSIC PLAYER</h1>
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search for songs, artists"
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={24} className="cursor-pointer hover:text-gray-600" />
            <Bell size={24} className="cursor-pointer hover:text-gray-600" />
            <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold">👤</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 flex flex-col gap-8">
            <Home size={28} className="cursor-pointer hover:text-gray-600" />
            <Heart size={28} className="cursor-pointer hover:text-gray-600" />
            <Music size={28} className="cursor-pointer hover:text-gray-600" />
            <Disc size={28} className="cursor-pointer hover:text-gray-600" />
            <div className="flex flex-col gap-1 cursor-pointer hover:text-gray-600">
              <div className="w-1 h-6 bg-gray-800"></div>
              <div className="w-1 h-6 bg-gray-800"></div>
              <div className="w-1 h-6 bg-gray-800"></div>
            </div>
            <Tag size={28} className="cursor-pointer hover:text-gray-600" />
          </aside>

          {/* Turntable Section */}
          <section className="col-span-5 bg-white rounded-3xl p-8 shadow-lg">
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl shadow-inner mb-6 flex items-center justify-center overflow-hidden">
              {/* Turntable Image */}
              <img 
                src="/images/capa.jpg" 
                alt="Vinyl Record" 
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* Song Info */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">BOUNCE BACK</h2>
                <span className="inline-block px-4 py-1 bg-black text-white text-sm rounded-full">Kpop</span>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <span className="text-2xl">💬</span>
                <span className="font-bold">392</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-bold">{formatTime(currentTime)}</span>
                <div className="flex-1 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center h-full px-2">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 mx-px rounded-full ${
                          i < (currentTime / totalTime) * 50
                            ? 'bg-black h-8'
                            : 'bg-gray-400 h-4'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <span className="font-bold">{formatTime(totalTime)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <Share2 size={24} className="cursor-pointer hover:text-gray-600" />
              <SkipBack size={28} className="cursor-pointer hover:text-gray-600" />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                {isPlaying ? (
                  <Pause size={32} className="text-white" fill="white" />
                ) : (
                  <Play size={32} className="text-white ml-1" fill="white" />
                )}
              </button>
              <SkipForward size={28} className="cursor-pointer hover:text-gray-600" />
              <Shuffle size={24} className="cursor-pointer hover:text-gray-600" />
            </div>
          </section>

          {/* Right Panel */}
          <section className="col-span-6 flex flex-col gap-6">
            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-4xl font-bold">Music<br/>Categories</h2>
                <button className="text-sm font-semibold hover:underline">View all</button>
              </div>
              <div className="flex gap-2 mb-6">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className="px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {/* Playlist Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {playlists.map((playlist, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
                      <img 
                        src={playlist.image} 
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{playlist.title}</h3>
                      <p className="text-sm text-gray-600">{playlist.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Playlists */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Favorite Playlists (4)</h2>
              <div className="space-y-3">
                {favoritePlaylists.map((playlist, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-300">
                        <img 
                          src={playlist.image} 
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{playlist.title}</h3>
                        <p className="text-sm text-gray-600">{playlist.songs}</p>
                      </div>
                    </div>
                    <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                      <Play size={20} className="ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;