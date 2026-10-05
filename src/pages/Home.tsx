import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Users, Trophy, Calendar, Radio, ChevronRight, ExternalLink } from 'lucide-react';
import { useStore } from '../store';

export default function Home() {
  const { state } = useStore();
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const liveTournaments = state.tournaments.filter(t => t.status === 'LIVE');
  const upcomingTournaments = state.tournaments.filter(t => t.status === 'UPCOMING');
  const publishedNews = state.news.filter(n => n.published);

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-3xl"></div>
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}></div>
            {/* Geometric accents */}
            <div className="absolute top-20 left-10 w-32 h-32 border border-violet-500/10 rotate-45"></div>
            <div className="absolute bottom-32 right-20 w-24 h-24 border border-violet-500/10 rotate-12"></div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-violet-500/40 rounded-full"></div>
            <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-violet-400/30 rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-live"></div>
              <span className="text-violet-400 text-xs font-semibold tracking-wider">COMPETITIVE ESPORTS ORGANIZATION</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              {state.siteContent.homeTitle}
            </h1>

            {/* Headline */}
            <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300 mb-8 leading-tight whitespace-pre-line">
              {state.siteContent.heroHeadline}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {state.siteContent.heroDescription}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/esports"
                className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 flex items-center gap-2"
              >
                EXPLORE ESPORTS
                <ChevronRight size={16} />
              </Link>
              <a
                href={state.siteContent.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 flex items-center gap-2"
              >
                JOIN DISCORD
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Trophy, label: 'Tournaments', value: state.tournaments.length.toString() },
              { icon: Users, label: 'Teams', value: '50+' },
              { icon: Zap, label: 'Games', value: state.games.length.toString() },
              { icon: Radio, label: 'Live Now', value: liveTournaments.length.toString() },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-white/5 border border-white/5 rounded-lg">
                <stat.icon size={20} className="text-violet-400 mx-auto mb-2" />
                <div className="font-display font-bold text-white text-lg">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-violet-500 rounded-full mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Live Tournaments */}
      {liveTournaments.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-live"></div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">LIVE TOURNAMENTS</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveTournaments.map(tournament => (
                <div key={tournament.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-live"></div>
                        LIVE
                      </span>
                      <span className="text-gray-500 text-xs">{tournament.game}</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-3">{tournament.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Teams</span>
                        <span className="text-white">{tournament.registeredTeams}/{tournament.maxTeams}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Prize Pool</span>
                        <span className="text-violet-400 font-semibold">{tournament.prizePool}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Stage</span>
                        <span className="text-white">{tournament.currentStage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Started</span>
                        <span className="text-white">{tournament.date} • {tournament.time}</span>
                      </div>
                    </div>
                    <button className="mt-5 w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs tracking-wider rounded transition-all duration-200">
                      WATCH TOURNAMENT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Tournaments */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">UPCOMING TOURNAMENTS</h2>
            <Link to="/tournaments" className="text-violet-400 hover:text-violet-300 text-sm font-semibold flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTournaments.map(tournament => (
              <div key={tournament.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded">UPCOMING</span>
                    <span className="text-gray-500 text-xs">{tournament.game}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{tournament.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="text-white">{tournament.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time</span>
                      <span className="text-white">{tournament.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prize Pool</span>
                      <span className="text-violet-400 font-semibold">{tournament.prizePool}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Slots</span>
                      <span className="text-white">{tournament.maxTeams - tournament.registeredTeams} available</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      {publishedNews.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">VEXORA NEWS</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedNews.slice(0, 3).map(article => (
                <div key={article.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden card-hover">
                  <div className="h-40 bg-gradient-to-br from-violet-900/30 to-gray-900 flex items-center justify-center">
                    <Trophy className="text-violet-500/30" size={48} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs font-semibold rounded">{article.category}</span>
                      <span className="text-gray-600 text-xs">{article.date}</span>
                    </div>
                    <h3 className="font-bold text-white text-sm mb-2">{article.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{article.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Discord CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/20 rounded-xl p-10 sm:p-16">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-4">
              JOIN THE VEXORA COMMUNITY
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Join our community, follow tournaments, meet players and stay updated with everything happening inside VEXORA.
            </p>
            <a
              href={state.siteContent.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              JOIN OUR DISCORD
            </a>
          </div>
        </div>
      </section>

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
            <input
              required
              value={form.teamName}
              onChange={e => setForm({ ...form, teamName: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Captain Discord *</label>
            <input
              required
              value={form.captainDiscord}
              onChange={e => setForm({ ...form, captainDiscord: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Team Members *</label>
            <input
              required
              placeholder="Player1, Player2, Player3..."
              value={form.members}
              onChange={e => setForm({ ...form, members: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Game</label>
            <input
              value={form.game}
              onChange={e => setForm({ ...form, game: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Team Logo URL</label>
            <input
              value={form.teamLogo}
              onChange={e => setForm({ ...form, teamLogo: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Contact Information *</label>
            <input
              required
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 mt-4"
          >
            REGISTER TEAM
          </button>
        </form>
      </div>
    </div>
  );
}
