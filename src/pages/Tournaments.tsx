import React, { useState } from 'react';
import { Trophy, Users, Calendar, Clock, Radio } from 'lucide-react';
import { useStore } from '../store';

export default function Tournaments() {
  const { state } = useStore();
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'finished'>('live');

  const liveTournaments = state.tournaments.filter(t => t.status === 'LIVE');
  const upcomingTournaments = state.tournaments.filter(t => t.status === 'UPCOMING');
  const finishedTournaments = state.tournaments.filter(t => t.status === 'FINISHED');

  return (
    <div className="page-enter pt-24 pb-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">TOURNAMENTS</h1>
          <p className="text-gray-400 text-lg">Compete in VEXORA organized tournaments and prove your skill.</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-1 bg-gray-900/50 border border-white/5 rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-5 py-2.5 text-xs font-bold tracking-wider rounded transition-all ${
              activeTab === 'live' ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:text-white'
            }`}
          >
            LIVE NOW ({liveTournaments.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 text-xs font-bold tracking-wider rounded transition-all ${
              activeTab === 'upcoming' ? 'bg-violet-500/20 text-violet-400' : 'text-gray-500 hover:text-white'
            }`}
          >
            UPCOMING ({upcomingTournaments.length})
          </button>
          <button
            onClick={() => setActiveTab('finished')}
            className={`px-5 py-2.5 text-xs font-bold tracking-wider rounded transition-all ${
              activeTab === 'finished' ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:text-white'
            }`}
          >
            FINISHED ({finishedTournaments.length})
          </button>
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live */}
        {activeTab === 'live' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {liveTournaments.length > 0 ? liveTournaments.map(tournament => (
              <div key={tournament.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-live"></div>
                      LIVE
                    </span>
                    <span className="text-gray-500 text-xs">{tournament.game}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-4">{tournament.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-black/30 rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Teams</div>
                      <div className="text-white font-semibold">{tournament.registeredTeams}/{tournament.maxTeams}</div>
                    </div>
                    <div className="bg-black/30 rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Prize Pool</div>
                      <div className="text-violet-400 font-semibold">{tournament.prizePool}</div>
                    </div>
                    <div className="bg-black/30 rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Stage</div>
                      <div className="text-white font-semibold">{tournament.currentStage}</div>
                    </div>
                    <div className="bg-black/30 rounded p-3">
                      <div className="text-gray-500 text-xs mb-1">Started</div>
                      <div className="text-white font-semibold text-xs">{tournament.date}</div>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs tracking-wider rounded transition-all duration-200">
                    WATCH TOURNAMENT
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center py-20">
                <Radio className="text-gray-700 mx-auto mb-4" size={48} />
                <p className="text-gray-500">No live tournaments at the moment.</p>
              </div>
            )}
          </div>
        )}

        {/* Upcoming */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {upcomingTournaments.length > 0 ? upcomingTournaments.map(tournament => (
              <div key={tournament.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded">UPCOMING</span>
                    <span className="text-gray-500 text-xs">{tournament.game}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-4">{tournament.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Calendar size={12} /> Date</span>
                      <span className="text-white">{tournament.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Clock size={12} /> Time</span>
                      <span className="text-white">{tournament.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Trophy size={12} /> Prize</span>
                      <span className="text-violet-400 font-semibold">{tournament.prizePool}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Users size={12} /> Max Teams</span>
                      <span className="text-white">{tournament.maxTeams}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Available Slots</span>
                      <span className="text-green-400 font-semibold">{tournament.maxTeams - tournament.registeredTeams}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedTournament(tournament.id); setShowRegistration(true); }}
                    className="mt-5 w-full py-3 bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-600 text-white font-bold text-xs tracking-wider rounded transition-all duration-200"
                  >
                    REGISTER
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-20">
                <Calendar className="text-gray-700 mx-auto mb-4" size={48} />
                <p className="text-gray-500">No upcoming tournaments scheduled.</p>
              </div>
            )}
          </div>
        )}

        {/* Finished */}
        {activeTab === 'finished' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {finishedTournaments.length > 0 ? finishedTournaments.map(tournament => (
              <div key={tournament.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">FINISHED</span>
                    <span className="text-gray-500 text-xs">{tournament.game}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-4">{tournament.name}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Winner</span>
                      <span className="text-yellow-400 font-bold">{tournament.winner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Final Result</span>
                      <span className="text-white font-semibold">{tournament.finalResult}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="text-white">{tournament.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prize Pool</span>
                      <span className="text-violet-400 font-semibold">{tournament.prizePool}</span>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-wider rounded transition-all duration-200">
                    VIEW TOURNAMENT
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center py-20">
                <Trophy className="text-gray-700 mx-auto mb-4" size={48} />
                <p className="text-gray-500">No finished tournaments yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <RegistrationModal
          tournamentId={selectedTournament}
          tournaments={state.tournaments}
          onClose={() => setShowRegistration(false)}
        />
      )}
    </div>
  );
}

function RegistrationModal({ tournamentId, tournaments, onClose }: { tournamentId: string | null; tournaments: any[]; onClose: () => void }) {
  const { dispatch } = useStore();
  const tournament = tournaments.find(t => t.id === tournamentId);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    teamName: '',
    captainDiscord: '',
    members: '',
    game: tournament?.game || '',
    teamLogo: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_REGISTRATION',
      payload: {
        id: Date.now().toString(),
        ...form,
        tournamentId: tournamentId || '',
        tournamentName: tournament?.name || '',
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
            <Trophy className="text-violet-400" size={28} />
          </div>
          <h3 className="font-display font-bold text-white text-xl mb-2">REGISTRATION CONFIRMED</h3>
          <p className="text-gray-400 text-sm mb-6">Your team registration has been submitted successfully.</p>
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
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-display font-bold text-white">REGISTER TEAM</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Team Name *</label>
            <input required value={form.teamName} onChange={e => setForm({...form, teamName: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Captain Discord *</label>
            <input required value={form.captainDiscord} onChange={e => setForm({...form, captainDiscord: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Team Members *</label>
            <input required placeholder="Player1, Player2, Player3..." value={form.members} onChange={e => setForm({...form, members: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Game</label>
            <input value={form.game} onChange={e => setForm({...form, game: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Team Logo URL</label>
            <input value={form.teamLogo} onChange={e => setForm({...form, teamLogo: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Contact Information *</label>
            <input required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors" />
          </div>
          <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 mt-4">
            REGISTER TEAM
          </button>
        </form>
      </div>
    </div>
  );
}
