import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Trophy, ChevronRight, Target } from 'lucide-react';
import { useStore, GameInfo } from '../store';

export default function Esports() {
  const { state } = useStore();
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationGame, setApplicationGame] = useState('');

  if (selectedGame) {
    return (
      <GameDetail
        game={selectedGame}
        onBack={() => setSelectedGame(null)}
        onApply={() => { setApplicationGame(selectedGame.name); setShowApplication(true); }}
      />
    );
  }

  return (
    <div className="page-enter pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            VEXORA ESPORTS
          </h1>
          <p className="font-display text-lg sm:text-xl text-violet-400 tracking-wider">
            COMPETE WITH THE BEST.
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.games.map(game => (
            <div
              key={game.id}
              className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover cursor-pointer group"
              onClick={() => setSelectedGame(game)}
            >
              {/* Game Image */}
              <div className="h-48 bg-gradient-to-br from-violet-900/40 to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="text-violet-500/30 group-hover:text-violet-500/50 transition-colors" size={64} />
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded ${
                    game.status === 'Active Roster' ? 'bg-green-500/20 text-green-400' :
                    game.status === 'Recruiting' ? 'bg-yellow-500/20 text-yellow-400' :
                    game.status === 'Building Roster' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-violet-500/20 text-violet-400'
                  }`}>
                    {game.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-white text-xl mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Users size={14} />
                    <span>{game.players.length} players</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setApplicationGame(game.name); setShowApplication(true); }}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold tracking-wider rounded transition-all"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {showApplication && (
        <ApplicationModal
          game={applicationGame}
          games={state.games}
          onClose={() => setShowApplication(false)}
        />
      )}
    </div>
  );
}

function GameDetail({ game, onBack, onApply }: { game: GameInfo; onBack: () => void; onApply: () => void }) {
  return (
    <div className="page-enter pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Games</span>
        </button>

        {/* Game Header */}
        <div className="bg-gray-900/50 border border-white/5 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">{game.name}</h1>
              <p className="text-gray-400 text-sm">{game.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 text-xs font-bold rounded ${
                game.status === 'Active Roster' ? 'bg-green-500/20 text-green-400' :
                game.status === 'Recruiting' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-violet-500/20 text-violet-400'
              }`}>
                {game.status}
              </span>
              <button
                onClick={onApply}
                className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold tracking-wider rounded transition-all"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Roster */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-violet-400" />
            CURRENT ROSTER
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {game.players.map((player, i) => (
              <div key={i} className="bg-gray-900/50 border border-white/5 rounded-lg p-4 card-hover">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center">
                    <span className="text-violet-400 font-bold text-sm">{player.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{player.name}</div>
                    <div className="text-gray-500 text-xs">{player.role}</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <span className="text-violet-400 text-xs font-semibold">{player.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-violet-400" />
            UPCOMING MATCHES
          </h2>
          <div className="space-y-3">
            {game.upcomingMatches.length > 0 ? game.upcomingMatches.map((match, i) => (
              <div key={i} className="bg-gray-900/50 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm">vs {match.opponent}</div>
                  <div className="text-gray-500 text-xs">{match.date} • {match.time}</div>
                </div>
                <span className="px-3 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded">UPCOMING</span>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">No upcoming matches scheduled.</p>
            )}
          </div>
        </div>

        {/* Previous Results */}
        <div>
          <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-violet-400" />
            PREVIOUS RESULTS
          </h2>
          <div className="space-y-3">
            {game.results.length > 0 ? game.results.map((result, i) => (
              <div key={i} className="bg-gray-900/50 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm">vs {result.opponent}</div>
                  <div className="text-gray-500 text-xs">{result.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-sm">{result.score}</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded ${
                    result.result === 'WIN' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {result.result}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">No previous results.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationModal({ game, games, onClose }: { game: string; games: GameInfo[]; onClose: () => void }) {
  const { dispatch } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    discord: '',
    fullName: '',
    age: '',
    country: '',
    game: game,
    rank: '',
    experience: '',
    teamExperience: '',
    availability: '',
    socialMedia: '',
    gameProfile: '',
    clips: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_APPLICATION',
      payload: {
        id: Date.now().toString(),
        ...form,
        date: new Date().toISOString().split('T')[0],
        status: 'PENDING'
      }
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80">
        <div className="bg-gray-900 border border-violet-500/30 rounded-lg p-8 max-w-md w-full text-center animate-fadeIn">
          <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="text-violet-400" size={28} />
          </div>
          <h3 className="font-display font-bold text-white text-xl mb-2">APPLICATION RECEIVED</h3>
          <p className="text-gray-400 text-sm mb-6">Your application has been submitted successfully.</p>
          <button onClick={onClose} className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs tracking-wider rounded transition-all">
            CLOSE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80">
      <div className="bg-gray-900 border border-white/10 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
          <h3 className="font-display font-bold text-white">APPLY NOW</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Discord Username *</label>
              <input required value={form.discord} onChange={e => setForm({...form, discord: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Full Name / Nickname *</label>
              <input required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Age *</label>
              <input required type="number" min="13" max="50" value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Country *</label>
              <input required value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Game *</label>
              <select required value={form.game} onChange={e => setForm({...form, game: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors">
                {games.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Current Rank *</label>
              <input required value={form.rank} onChange={e => setForm({...form, rank: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Previous Experience</label>
            <textarea value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} rows={2}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Team Experience</label>
            <textarea value={form.teamExperience} onChange={e => setForm({...form, teamExperience: e.target.value})} rows={2}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Availability</label>
              <select value={form.availability} onChange={e => setForm({...form, availability: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors">
                <option value="">Select...</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Weekends">Weekends only</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5">Social Media</label>
              <input value={form.socialMedia} onChange={e => setForm({...form, socialMedia: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Game Profile Link</label>
            <input value={form.gameProfile} onChange={e => setForm({...form, gameProfile: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Clips / Highlights</label>
            <input value={form.clips} onChange={e => setForm({...form, clips: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Additional Information</label>
            <textarea value={form.additionalInfo} onChange={e => setForm({...form, additionalInfo: e.target.value})} rows={3}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 mt-4">
            SUBMIT APPLICATION
          </button>
        </form>
      </div>
    </div>
  );
}
