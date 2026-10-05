import React from 'react';
import { Shield, Target, Eye, Swords, Users, Zap } from 'lucide-react';
import { useStore } from '../store';

export default function About() {
  const { state } = useStore();

  const sections = [
    {
      icon: Shield,
      title: 'WHO WE ARE',
      content: 'VEXORA Esports is a professional competitive gaming organization built on the foundation of excellence, discipline, and passion. We represent the next generation of esports — where strategy meets skill, and where every match is an opportunity to prove dominance.'
    },
    {
      icon: Target,
      title: 'OUR MISSION',
      content: 'To build and develop world-class competitive teams across multiple titles. We strive to create an environment where talented players can reach their full potential, compete at the highest level, and represent VEXORA with pride on the global stage.'
    },
    {
      icon: Eye,
      title: 'OUR VISION',
      content: 'To become one of the most recognized and respected esports organizations in the world. We envision a future where VEXORA is synonymous with competitive excellence, innovation, and community-driven growth in esports.'
    },
    {
      icon: Swords,
      title: 'COMPETITIVE PHILOSOPHY',
      content: 'We believe that true champions are forged through relentless practice, strategic thinking, and unbreakable teamwork. Every VEXORA player embodies our core values: discipline, adaptability, and the hunger to win. We don\'t just play to participate — we play to dominate.'
    },
    {
      icon: Users,
      title: 'COMMUNITY',
      content: 'Beyond competition, VEXORA is a community. We host tournaments, create content, and provide opportunities for aspiring players to showcase their talent. Our Discord community connects players, fans, and partners in a shared passion for competitive gaming.'
    }
  ];

  return (
    <div className="page-enter pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            MORE THAN A TEAM.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">A COMPETITIVE IDENTITY.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {state.siteContent.aboutText}
          </p>
        </div>
      </section>

      {/* Values Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div
              key={i}
              className="bg-gray-900/30 border border-white/5 rounded-lg p-8 sm:p-10 card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 bg-violet-500/10 border border-violet-500/20 rounded-lg items-center justify-center">
                  <section.icon size={24} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white mb-3 tracking-wider">
                    {section.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Zap, label: 'Games', value: state.games.length.toString() },
            { icon: Users, label: 'Players', value: '20+' },
            { icon: Shield, label: 'Tournaments', value: state.tournaments.length.toString() },
            { icon: Target, label: 'Victories', value: '50+' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900/30 border border-white/5 rounded-lg p-6 text-center">
              <stat.icon size={24} className="text-violet-400 mx-auto mb-3" />
              <div className="font-display font-bold text-white text-2xl mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/20 rounded-xl p-10 sm:p-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            READY TO COMPETE?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Join VEXORA and become part of something bigger. Whether you're a player, a fan, or a partner — there's a place for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={state.siteContent.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wider rounded transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25"
            >
              JOIN DISCORD
            </a>
            <a
              href="#/esports"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm tracking-wider rounded transition-all duration-200"
            >
              VIEW GAMES
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
