// src/App.jsx
import React, { useState } from 'react';
import { Calendar, ShoppingBag, BarChart2, PlayCircle, Ticket, Menu, X, Search, ChevronRight, User } from 'lucide-react';
import { matches, merchandise, categories } from './data';

// --- Components ---

// 1. Navbar
const Navbar = ({ toggleSidebar }) => (
  <nav className="fixed top-0 w-full bg-brand-card/90 backdrop-blur-md border-b border-gray-700 z-50 h-16 flex items-center justify-between px-4">
    <div className="flex items-center gap-3">
      <button onClick={toggleSidebar} className="lg:hidden text-gray-300">
        <Menu size={24} />
      </button>
      <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        OmniSports
      </div>
    </div>
    <div className="hidden md:flex bg-gray-800 rounded-full px-4 py-2 w-1/3">
      <Search className="text-gray-400" size={18} />
      <input type="text" placeholder="Search team, match or merch..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-white" />
    </div>
    <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
      <User size={20} />
    </button>
  </nav>
);

// 2. Match Card
const MatchCard = ({ match, onSelect }) => {
  const isLive = match.status === "Live";
  
  return (
    <div 
      onClick={() => onSelect(match)}
      className="bg-brand-card rounded-xl p-4 border border-gray-700 hover:border-brand-accent transition cursor-pointer relative overflow-hidden group"
    >
      {isLive && (
        <span className="absolute top-2 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
      
      <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
        <span>{match.sport} • {match.league}</span>
        <span>{new Date(match.date).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center my-4">
        <div className="text-center w-1/3">
          <div className="text-2xl mb-1">🛡️</div>
          <h3 className="font-semibold text-sm truncate">{match.home}</h3>
        </div>
        <div className="text-center w-1/3">
          <div className="text-2xl font-bold font-mono tracking-widest bg-gray-800 rounded px-2 py-1">
            {match.status === "Upcoming" ? "VS" : match.score}
          </div>
          <div className="text-xs text-brand-accent mt-1">{match.status}</div>
        </div>
        <div className="text-center w-1/3">
          <div className="text-2xl mb-1">⚔️</div>
          <h3 className="font-semibold text-sm truncate">{match.away}</h3>
        </div>
      </div>

      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="flex-1 bg-brand-accent text-white text-xs py-2 rounded flex items-center justify-center gap-1">
          <PlayCircle size={14} /> Watch
        </button>
        <button className="flex-1 bg-gray-700 text-white text-xs py-2 rounded flex items-center justify-center gap-1">
          <Ticket size={14} /> Tickets
        </button>
      </div>
    </div>
  );
};

// 3. Match Details Modal (Analysis & Watching)
const MatchModal = ({ match, onClose }) => {
  if (!match) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
      <div className="bg-brand-card w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="h-40 bg-gradient-to-r from-blue-900 to-purple-900 p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/30 p-2 rounded-full hover:bg-white/20">
            <X size={20} />
          </button>
          <div className="flex justify-between items-end h-full text-white pb-2">
            <div className="text-center">
              <div className="text-4xl">🛡️</div>
              <div className="font-bold text-lg mt-2">{match.home}</div>
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">{match.score}</div>
              <div className="text-sm bg-red-500 px-2 rounded">{match.status}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl">⚔️</div>
              <div className="font-bold text-lg mt-2">{match.away}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
              <PlayCircle /> Watch Stream
            </button>
            <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
              <Ticket /> Buy Ticket (${match.ticketPrice})
            </button>
          </div>

          {/* Analysis Section */}
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <h3 className="flex items-center gap-2 font-bold mb-4 text-brand-accent">
              <BarChart2 size={20} /> AI Win Analysis
            </h3>
            <div className="flex items-center gap-1 h-4 rounded-full overflow-hidden">
              <div style={{width: `${match.winProbability.home}%`}} className="bg-blue-500 h-full"></div>
              <div style={{width: `${match.winProbability.draw}%`}} className="bg-gray-500 h-full"></div>
              <div style={{width: `${match.winProbability.away}%`}} className="bg-red-500 h-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Home {match.winProbability.home}%</span>
              <span>Draw {match.winProbability.draw}%</span>
              <span>Away {match.winProbability.away}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Match Info</h3>
            <p className="text-gray-400 text-sm">Venue: Global Stadium Arena</p>
            <p className="text-gray-400 text-sm">Referee: John Doe</p>
            <p className="text-gray-400 text-sm">Weather: 22°C, Clear Sky</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Shop Component
const Shop = () => (
  <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 pb-20">
    {merchandise.map((item) => (
      <div key={item.id} className="bg-brand-card p-4 rounded-xl border border-gray-700 flex flex-col items-center">
        <div className="text-6xl mb-4">{item.image}</div>
        <h3 className="font-semibold text-center text-sm">{item.name}</h3>
        <p className="text-brand-accent font-bold mt-2">${item.price}</p>
        <button className="mt-3 w-full bg-gray-700 hover:bg-white hover:text-black py-2 rounded text-xs font-bold transition">
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);

// --- Main App Logic ---

function App() {
  const [activeTab, setActiveTab] = useState('schedule'); // schedule, shop
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredMatches = matches.filter(m => 
    selectedCategory === 'All' ? true : m.sport === selectedCategory
  );

  return (
    <div className="min-h-screen bg-brand-dark text-white pb-16 md:pb-0">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar / Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      <div className="flex pt-16 min-h-screen">
        {/* Desktop Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-brand-card border-r border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform z-50`}>
          <div className="p-6">
            <h2 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('schedule'); setSidebarOpen(false); }} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'schedule' ? 'bg-brand-accent text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
                  <Calendar size={20} /> Schedule & Live
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); setSidebarOpen(false); }} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'shop' ? 'bg-brand-accent text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
                  <ShoppingBag size={20} /> Merch Store
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'schedule' && (
            <>
              {/* Filter Tabs */}
              <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${selectedCategory === cat ? 'bg-white text-brand-dark' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">
                {selectedCategory === 'All' ? 'Global Sports Feed' : `${selectedCategory} Matches`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.map(match => (
                  <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />
                ))}
              </div>
            </>
          )}

          {activeTab === 'shop' && (
            <>
              <h2 className="text-2xl font-bold mb-4">Official Merchandise</h2>
              <Shop />
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 w-full bg-brand-card border-t border-gray-700 flex justify-around p-3 z-40 safe-area-pb">
        <button onClick={() => setActiveTab('schedule')} className={`flex flex-col items-center text-xs ${activeTab === 'schedule' ? 'text-brand-accent' : 'text-gray-500'}`}>
          <Calendar size={20} />
          <span className="mt-1">Matches</span>
        </button>
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center text-xs ${activeTab === 'shop' ? 'text-brand-accent' : 'text-gray-500'}`}>
          <ShoppingBag size={20} />
          <span className="mt-1">Shop</span>
        </button>
      </div>

      {/* Detail Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}

export default App;