import { useState } from 'react';
import { Clock, MapPin, Calendar, Share2, Tv, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

export function MatchCentrePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'Preview' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'stats', label: 'Stats' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'report', label: 'Report' }
  ];

  return (
    <div className="pb-8">
      {/* Match Header */}
      <section className="bg-gradient-to-br from-gray-900 to-red-900 text-white">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
          <div className="text-center mb-6">
            <span className="inline-block bg-yellow-400 text-black text-xs lg:text-sm font-bold px-3 py-1 rounded-full mb-4">
              UPCOMING
            </span>
            <p className="text-sm lg:text-base text-gray-300 uppercase tracking-wide">DStv Premiership</p>
          </div>

          <div className="flex items-center justify-center gap-8 lg:gap-16 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 lg:w-32 lg:h-32 mx-auto mb-3 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-3xl">TSG</span>
              </div>
              <p className="font-bold text-lg lg:text-2xl">TS Galaxy FC</p>
              <p className="text-sm text-gray-300">Home</p>
            </div>

            <div className="text-center">
              <p className="text-5xl lg:text-7xl font-bold mb-2">VS</p>
              <p className="text-xs lg:text-sm text-gray-300">Mbombela Stadium</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 lg:w-32 lg:h-32 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-3xl">OPP</span>
              </div>
              <p className="font-bold text-lg lg:text-2xl">Opponent FC</p>
              <p className="text-sm text-gray-300">Away</p>
            </div>
          </div>

          <div className="text-center space-y-3 mb-8">
            <div className="flex items-center justify-center gap-2 text-lg">
              <Clock className="w-5 h-5" />
              <span>Saturday, 17 May 2026 • 15:00</span>
            </div>
            <div className="bg-red-600 inline-block px-6 py-2 rounded-lg font-bold text-lg">
              3 days 14h 23m until kickoff
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 max-w-md mx-auto">
            <button className="flex-1 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Buy Tickets
            </button>
            <button className="flex-1 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold border border-white/20 flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
              <Calendar className="w-5 h-5" />
              Add to Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 sticky top-16 lg:top-20 bg-white z-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="container mx-auto px-4 lg:px-6 mt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-xl mb-4">Match Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">Venue</p>
                      <p className="text-gray-600">Mbombela Stadium</p>
                      <p className="text-sm text-gray-500">Ka Mhinga St, Mbombela, 1200</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tv className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">Broadcast</p>
                      <p className="text-gray-600">SuperSport PSL, SABC Sport</p>
                      <p className="text-sm text-gray-500">Live coverage from 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">Expected Attendance</p>
                      <p className="text-gray-600">8,500 capacity</p>
                      <p className="text-sm text-gray-500">Tickets selling fast</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-xl mb-4">Matchday Guide</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-600">
                    <strong>Gates Open:</strong> 13:00 (2 hours before kickoff)
                  </p>
                  <p className="text-gray-600">
                    <strong>Parking:</strong> Available at Stadium parking lots A & B
                  </p>
                  <p className="text-gray-600">
                    <strong>Public Transport:</strong> Shuttle services from Mbombela CBD
                  </p>
                  <p className="text-gray-600">
                    <strong>Stadium Shop:</strong> Open from 12:00 for merchandise
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Secure Your Seat</h3>
                <p className="text-sm text-red-100 mb-4">
                  Don't miss The Rockets in action. Limited tickets available.
                </p>
                <button className="w-full bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                  Buy Tickets Now
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Share This Match</h3>
                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share Match
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-xl mb-4">Team News</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="font-semibold">TS Galaxy FC</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Three key players return from injury for this crucial home fixture. The squad trained well this week and morale is high after the recent win.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold">Opponent FC</p>
                  <p className="text-sm text-gray-600 mt-2">
                    The visitors are without their top scorer through suspension. They'll be looking to bounce back from a tough loss last weekend.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-xl mb-4">Recent Form</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                    TS Galaxy FC
                  </p>
                  <div className="flex gap-2">
                    {['W', 'W', 'D', 'W', 'L'].map((result, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm ${
                          result === 'W'
                            ? 'bg-green-100 text-green-700'
                            : result === 'D'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    Opponent FC
                  </p>
                  <div className="flex gap-2">
                    {['L', 'W', 'D', 'L', 'W'].map((result, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm ${
                          result === 'W'
                            ? 'bg-green-100 text-green-700'
                            : result === 'D'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4">Coach's Comments</h3>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="italic mb-2">
                  "We're ready for this challenge. The team has been working hard all week, and we know what we need to do to get the three points at home."
                </p>
                <p className="text-sm text-gray-400">- Head Coach</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lineups' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Team lineups will be available 1 hour before kickoff</p>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Match statistics will be available during the game</p>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((img) => (
              <div key={img} className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
            ))}
          </div>
        )}

        {activeTab === 'report' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center py-12">
            <p className="text-gray-500 font-semibold">Match report will be available after full-time</p>
          </div>
        )}
      </section>

      {/* Full-Time Result Preview */}
      <section className="container mx-auto px-4 lg:px-6 mt-12">
        <h3 className="font-bold text-xl mb-4 text-gray-500">After Match Preview:</h3>
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-xl p-8">
          <div className="text-center mb-6">
            <span className="inline-block bg-white text-green-800 text-sm font-bold px-3 py-1 rounded-full mb-4">
              FULL TIME
            </span>
          </div>

          <div className="flex items-center justify-center gap-12 mb-6">
            <div className="text-center">
              <p className="font-bold text-lg mb-2">TS Galaxy FC</p>
              <p className="text-6xl font-bold">2</p>
            </div>
            <div className="text-3xl font-bold">-</div>
            <div className="text-center">
              <p className="font-bold text-lg mb-2">Opponent FC</p>
              <p className="text-6xl font-bold">1</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-6">
            <p className="font-semibold mb-2">Goal Scorers</p>
            <p className="text-sm">15' Player Name • 67' Player Name</p>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-white text-green-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Read Match Report
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold border border-white/40 hover:bg-white/30 transition-colors">
              View Highlights
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
