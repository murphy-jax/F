import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';
import {
  LayoutDashboard, FileText, Trophy, Users, Gamepad2, Newspaper,
  Globe, Image, Settings, LogOut, Menu, X, Eye, Check, XCircle, Trash2, Plus, Edit
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { state, dispatch } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!state.isAdminAuthenticated) {
    return <LoginPage />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'tournaments', label: 'Tournament Management', icon: Trophy },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'editor', label: 'Website Editor', icon: Globe },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-white/5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-700 rounded-sm flex items-center justify-center">
              <span className="font-display font-bold text-white text-xs">V</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm">VEXORA</div>
              <div className="text-gray-500 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button
            onClick={() => dispatch({ type: 'LOGOUT_ADMIN' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-8"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-display font-bold text-white text-sm tracking-wider">
            {menuItems.find(m => m.id === activeSection)?.label.toUpperCase()}
          </h1>
          <div className="w-8 h-8 bg-violet-500/20 rounded-full flex items-center justify-center">
            <span className="text-violet-400 text-xs font-bold">A</span>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeSection === 'dashboard' && <DashboardPage />}
          {activeSection === 'applications' && <ApplicationsPage />}
          {activeSection === 'tournaments' && <TournamentManagementPage />}
          {activeSection === 'registrations' && <RegistrationsPage />}
          {activeSection === 'games' && <GamesPage />}
          {activeSection === 'news' && <NewsPage />}
          {activeSection === 'editor' && <WebsiteEditorPage />}
          {activeSection === 'media' && <MediaPage />}
          {activeSection === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}

function LoginPage() {
  const { dispatch } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'vexora2025') {
      dispatch({ type: 'LOGIN_ADMIN' });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-700 rounded-sm flex items-center justify-center mx-auto mb-4">
            <span className="font-display font-bold text-white text-lg">V</span>
          </div>
          <h1 className="font-display font-bold text-white text-xl">ADMIN ACCESS</h1>
          <p className="text-gray-500 text-sm mt-2">VEXORA Management Panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all">
            LOGIN
          </button>
          <p className="text-gray-600 text-xs text-center mt-4">Demo: admin / vexora2025</p>
        </form>
      </div>
    </div>
  );
}

// Dashboard
function DashboardPage() {
  const { state } = useStore();

  const stats = [
    { label: 'Total Applications', value: state.applications.length, color: 'violet' },
    { label: 'Pending', value: state.applications.filter(a => a.status === 'PENDING').length, color: 'yellow' },
    { label: 'Accepted', value: state.applications.filter(a => a.status === 'ACCEPTED').length, color: 'green' },
    { label: 'Total Tournaments', value: state.tournaments.length, color: 'violet' },
    { label: 'Live Tournaments', value: state.tournaments.filter(t => t.status === 'LIVE').length, color: 'red' },
    { label: 'Upcoming', value: state.tournaments.filter(t => t.status === 'UPCOMING').length, color: 'blue' },
    { label: 'Registered Teams', value: state.registrations.length, color: 'violet' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-900/50 border border-white/5 rounded-lg p-5">
            <div className="text-gray-500 text-xs font-semibold mb-2">{stat.label}</div>
            <div className="font-display font-bold text-white text-2xl">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/50 border border-white/5 rounded-lg p-6">
        <h3 className="font-display font-bold text-white text-sm mb-4">RECENT APPLICATIONS</h3>
        <div className="space-y-3">
          {state.applications.slice(-5).reverse().map(app => (
            <div key={app.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <div className="text-white text-sm font-medium">{app.fullName}</div>
                <div className="text-gray-500 text-xs">{app.game} • {app.rank}</div>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded ${
                app.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                app.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-400' :
                'bg-red-500/20 text-red-400'
              }`}>{app.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Applications
function ApplicationsPage() {
  const { state, dispatch } = useStore();
  const [viewApp, setViewApp] = useState<string | null>(null);

  const selectedApp = state.applications.find(a => a.id === viewApp);

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Applicant</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Game</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Rank</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Country</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.applications.map(app => (
                <tr key={app.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white text-sm">{app.fullName}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{app.game}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{app.rank}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{app.country}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{app.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      app.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      app.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{app.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewApp(app.id)} className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                        <Eye size={14} />
                      </button>
                      {app.status === 'PENDING' && (
                        <>
                          <button onClick={() => dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { id: app.id, status: 'ACCEPTED' } })} className="p-1.5 hover:bg-green-500/20 rounded text-gray-400 hover:text-green-400 transition-colors">
                            <Check size={14} />
                          </button>
                          <button onClick={() => dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { id: app.id, status: 'REFUSED' } })} className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors">
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80">
          <div className="bg-gray-900 border border-white/10 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto animate-fadeIn">
            <div className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-gray-900">
              <h3 className="font-display font-bold text-white">APPLICATION DETAILS</h3>
              <button onClick={() => setViewApp(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {Object.entries(selectedApp).filter(([k]) => !['id', 'status'].includes(k)).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-white text-right max-w-[60%]">{value as string}</span>
                </div>
              ))}
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Status</span>
                <span className={`px-2 py-1 text-xs font-bold rounded ${
                  selectedApp.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                  selectedApp.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>{selectedApp.status}</span>
              </div>
            </div>
            {selectedApp.status === 'PENDING' && (
              <div className="p-6 border-t border-white/5 flex gap-3">
                <button onClick={() => { dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { id: selectedApp.id, status: 'ACCEPTED' } }); setViewApp(null); }} className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded transition-all">ACCEPT</button>
                <button onClick={() => { dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { id: selectedApp.id, status: 'REFUSED' } }); setViewApp(null); }} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded transition-all">REFUSE</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Tournament Management
function TournamentManagementPage() {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTournament, setEditingTournament] = useState<any>(null);
  const [form, setForm] = useState({
    name: '', game: '', description: '', date: '', time: '', prizePool: '',
    maxTeams: 16, registrationDeadline: '', status: 'UPCOMING' as 'UPCOMING' | 'LIVE' | 'FINISHED'
  });

  const openCreate = () => {
    setEditingTournament(null);
    setForm({ name: '', game: '', description: '', date: '', time: '', prizePool: '', maxTeams: 16, registrationDeadline: '', status: 'UPCOMING' });
    setShowForm(true);
  };

  const openEdit = (t: any) => {
    setEditingTournament(t);
    setForm({ name: t.name, game: t.game, description: t.description, date: t.date, time: t.time, prizePool: t.prizePool, maxTeams: t.maxTeams, registrationDeadline: t.registrationDeadline, status: t.status });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTournament) {
      dispatch({ type: 'UPDATE_TOURNAMENT', payload: { ...editingTournament, ...form, registeredTeams: editingTournament.registeredTeams } });
    } else {
      dispatch({ type: 'ADD_TOURNAMENT', payload: { id: Date.now().toString(), ...form, registeredTeams: 0 } });
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display font-bold text-white">All Tournaments</h2>
        <button onClick={openCreate} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded flex items-center gap-2 transition-all">
          <Plus size={14} /> CREATE
        </button>
      </div>

      <div className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Name</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Game</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Prize</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.tournaments.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white text-sm">{t.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{t.game}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{t.date}</td>
                  <td className="px-4 py-3 text-violet-400 text-sm font-semibold">{t.prizePool}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      t.status === 'LIVE' ? 'bg-red-500/20 text-red-400' :
                      t.status === 'UPCOMING' ? 'bg-violet-500/20 text-violet-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(t)} className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Edit size={14} /></button>
                      <button onClick={() => dispatch({ type: 'DELETE_TOURNAMENT', payload: t.id })} className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80">
          <div className="bg-gray-900 border border-white/10 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-display font-bold text-white">{editingTournament ? 'EDIT' : 'CREATE'} TOURNAMENT</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Tournament Name *</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Game *</label>
                  <input required value={form.game} onChange={e => setForm({...form, game: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Prize Pool *</label>
                  <input required value={form.prizePool} onChange={e => setForm({...form, prizePool: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Date *</label>
                  <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Time *</label>
                  <input required value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Max Teams</label>
                  <input type="number" value={form.maxTeams} onChange={e => setForm({...form, maxTeams: parseInt(e.target.value)})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none">
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="LIVE">LIVE</option>
                    <option value="FINISHED">FINISHED</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Registration Deadline</label>
                <input type="date" value={form.registrationDeadline} onChange={e => setForm({...form, registrationDeadline: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all">
                {editingTournament ? 'UPDATE' : 'CREATE'} TOURNAMENT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Registrations
function RegistrationsPage() {
  const { state, dispatch } = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Team</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Captain</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Game</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Tournament</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.registrations.map(reg => (
                <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white text-sm">{reg.teamName}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{reg.captainDiscord}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{reg.game}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{reg.tournamentName}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{reg.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      reg.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      reg.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{reg.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {reg.status === 'PENDING' && (
                        <>
                          <button onClick={() => dispatch({ type: 'UPDATE_REGISTRATION_STATUS', payload: { id: reg.id, status: 'ACCEPTED' } })} className="p-1.5 hover:bg-green-500/20 rounded text-gray-400 hover:text-green-400 transition-colors"><Check size={14} /></button>
                          <button onClick={() => dispatch({ type: 'UPDATE_REGISTRATION_STATUS', payload: { id: reg.id, status: 'REJECTED' } })} className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"><XCircle size={14} /></button>
                        </>
                      )}
                      <button onClick={() => dispatch({ type: 'DELETE_REGISTRATION', payload: reg.id })} className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {state.registrations.length === 0 && (
          <div className="text-center py-12 text-gray-500">No registrations yet.</div>
        )}
      </div>
    </div>
  );
}

// Games
function GamesPage() {
  const { state } = useStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.games.map(game => (
          <div key={game.id} className="bg-gray-900/50 border border-white/5 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-white">{game.name}</h3>
              <span className={`px-2 py-1 text-xs font-bold rounded ${
                game.status === 'Active Roster' ? 'bg-green-500/20 text-green-400' :
                game.status === 'Recruiting' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-violet-500/20 text-violet-400'
              }`}>{game.status}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{game.description}</p>
            <div className="text-gray-500 text-xs">
              <span>{game.players.length} players</span> • <span>{game.upcomingMatches.length} upcoming matches</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// News
function NewsPage() {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [form, setForm] = useState({ title: '', description: '', coverImage: '', category: '', author: 'VEXORA Media' });

  const openCreate = () => {
    setEditingNews(null);
    setForm({ title: '', description: '', coverImage: '', category: '', author: 'VEXORA Media' });
    setShowForm(true);
  };

  const openEdit = (n: any) => {
    setEditingNews(n);
    setForm({ title: n.title, description: n.description, coverImage: n.coverImage, category: n.category, author: n.author });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      dispatch({ type: 'UPDATE_NEWS', payload: { ...editingNews, ...form } });
    } else {
      dispatch({ type: 'ADD_NEWS', payload: { id: Date.now().toString(), ...form, date: new Date().toISOString().split('T')[0], published: true } });
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display font-bold text-white">News Articles</h2>
        <button onClick={openCreate} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded flex items-center gap-2 transition-all">
          <Plus size={14} /> CREATE
        </button>
      </div>

      <div className="space-y-3">
        {state.news.map(article => (
          <div key={article.id} className="bg-gray-900/50 border border-white/5 rounded-lg p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm">{article.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-bold rounded ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {article.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="text-gray-500 text-xs">{article.category} • {article.date} • {article.author}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => openEdit(article)} className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"><Edit size={14} /></button>
              <button onClick={() => dispatch({ type: 'UPDATE_NEWS', payload: { ...article, published: !article.published } })} className="p-1.5 hover:bg-yellow-500/20 rounded text-gray-400 hover:text-yellow-400 transition-colors">
                {article.published ? '📤' : '📥'}
              </button>
              <button onClick={() => dispatch({ type: 'DELETE_NEWS', payload: article.id })} className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80">
          <div className="bg-gray-900 border border-white/10 rounded-lg max-w-lg w-full animate-fadeIn">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-display font-bold text-white">{editingNews ? 'EDIT' : 'CREATE'} ARTICLE</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Title *</label>
                <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Description *</label>
                <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Category</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">Author</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Cover Image URL</label>
                <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all">
                {editingNews ? 'UPDATE' : 'PUBLISH'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Website Editor
function WebsiteEditorPage() {
  const { state, dispatch } = useStore();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(state.siteContent);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_SITE_CONTENT', payload: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-sm font-semibold animate-fadeIn">
          ✓ Changes saved successfully!
        </div>
      )}

      <div className="bg-gray-900/50 border border-white/5 rounded-lg p-6 space-y-5">
        <h3 className="font-display font-bold text-white text-sm">TEXT CONTENT</h3>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">Home Title</label>
          <input value={form.homeTitle} onChange={e => setForm({...form, homeTitle: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">Hero Headline</label>
          <textarea value={form.heroHeadline} onChange={e => setForm({...form, heroHeadline: e.target.value})} rows={2}
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">Hero Description</label>
          <textarea value={form.heroDescription} onChange={e => setForm({...form, heroDescription: e.target.value})} rows={3}
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">About Text</label>
          <textarea value={form.aboutText} onChange={e => setForm({...form, aboutText: e.target.value})} rows={3}
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">Discord URL</label>
          <input value={form.discordUrl} onChange={e => setForm({...form, discordUrl: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">Footer Text</label>
          <input value={form.footerText} onChange={e => setForm({...form, footerText: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
        </div>
      </div>

      <button onClick={handleSave} className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all">
        SAVE CHANGES
      </button>
    </div>
  );
}

// Media
function MediaPage() {
  const mediaItems = [
    { id: '1', name: 'Hero Background', type: 'Image', size: '2.4 MB' },
    { id: '2', name: 'Valorant Banner', type: 'Image', size: '1.8 MB' },
    { id: '3', name: 'Fortnite Banner', type: 'Image', size: '1.5 MB' },
    { id: '4', name: 'Tournament Logo', type: 'Image', size: '0.8 MB' },
    { id: '5', name: 'Team Logo', type: 'Image', size: '0.3 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display font-bold text-white">Media Library</h2>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded flex items-center gap-2 transition-all">
          <Plus size={14} /> UPLOAD
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map(item => (
          <div key={item.id} className="bg-gray-900/50 border border-white/5 rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-violet-900/20 to-gray-900 flex items-center justify-center">
              <Image className="text-violet-500/30" size={32} />
            </div>
            <div className="p-4">
              <div className="text-white text-sm font-medium">{item.name}</div>
              <div className="text-gray-500 text-xs mt-1">{item.type} • {item.size}</div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs rounded transition-all">Replace</button>
                <button className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded transition-all">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings
function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-gray-900/50 border border-white/5 rounded-lg p-6">
        <h3 className="font-display font-bold text-white text-sm mb-4">GENERAL SETTINGS</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Organization Name</label>
            <input defaultValue="VEXORA ESPORTS" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Admin Email</label>
            <input defaultValue="admin@vexora.gg" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Default Timezone</label>
            <select className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              <option>CET</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-white/5 rounded-lg p-6">
        <h3 className="font-display font-bold text-white text-sm mb-4">SECURITY</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1.5">Change Password</label>
            <input type="password" placeholder="New password" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-violet-500 focus:outline-none" />
          </div>
        </div>
      </div>

      <button className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all">
        SAVE SETTINGS
      </button>
    </div>
  );
}
