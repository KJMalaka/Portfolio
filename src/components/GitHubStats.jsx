import { useState, useEffect } from 'react';
import { Github, Star, GitFork, BookOpen } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { personal } from '../data/portfolio';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
};

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 text-center shadow-sm">
      <Icon className={`${color} mx-auto mb-2`} size={20} aria-hidden="true" />
      <div className="text-xl font-black text-slate-900 dark:text-white">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 animate-pulse">
      <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-2" />
      <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-1" />
      <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
    </div>
  );
}

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  const { ref: sectionRef } = useRevealOnScroll();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${personal.githubUsername}`),
          fetch(
            `https://api.github.com/users/${personal.githubUsername}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const user = await userRes.json();
        const repos = await reposRes.json();

        // Language frequency
        const langs = {};
        repos.forEach((r) => {
          if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
        });
        const topLangs = Object.entries(langs)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);

        const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
        const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

        setStats({
          followers: user.followers,
          publicRepos: user.public_repos,
          totalStars,
          totalForks,
          topLangs,
        });
      } catch {
        setError(true);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      id="github"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40"
      aria-label="GitHub Statistics"
    >
      <div ref={sectionRef} className="reveal max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Open Source
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <Github size={28} aria-hidden="true" />
            GitHub Activity
          </h2>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline mt-1 inline-block"
          >
            github.com/{personal.githubUsername}
          </a>
        </div>

        {error ? (
          <p className="text-center text-slate-400 text-sm">
            Could not load GitHub stats right now.{' '}
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              View profile directly →
            </a>
          </p>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {!stats ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              ) : (
                <>
                  <StatCard icon={BookOpen} value={stats.publicRepos} label="Repositories" color="text-blue-400" />
                  <StatCard icon={Star} value={stats.totalStars} label="Stars earned" color="text-yellow-400" />
                  <StatCard icon={GitFork} value={stats.totalForks} label="Forks" color="text-green-400" />
                  <StatCard icon={Github} value={stats.followers} label="Followers" color="text-purple-400" />
                </>
              )}
            </div>

            {/* Top languages */}
            {stats?.topLangs?.length > 0 && (
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                  Top Languages (by repo count)
                </h3>
                <div className="space-y-3">
                  {stats.topLangs.map(([lang, count]) => {
                    const pct = Math.round((count / stats.publicRepos) * 100);
                    return (
                      <div key={lang}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block"
                              style={{ background: LANG_COLORS[lang] ?? '#6b7280' }}
                              aria-hidden="true"
                            />
                            {lang}
                          </span>
                          <span className="text-slate-400">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: LANG_COLORS[lang] ?? '#6b7280',
                            }}
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${lang} ${pct}%`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
