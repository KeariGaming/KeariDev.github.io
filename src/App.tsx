import { useState, useEffect, useRef } from 'react';
import {
  Download,
  Package,
  Box,
  Users,
  ChevronDown,
  ExternalLink,
  Code2,
  Star,
  Zap,
  Shield,
  Globe,
  Menu,
  X,
  FolderArchive,
} from 'lucide-react';

const ASSETS = [
  {
    id: 'beo2patch',
    name: 'Community Edition',
    subtitle: 'Bad Eggs Online 2',
    description: 'Client-side modification with new weapons and skins, optimized for mobile.',
    size: '26 MB',
    ext: '.SWF',
    tag: 'Mobile',
    link: 'https://www.mediafire.com/file/6z743z3j08ms6u5/BEO2Mobile.swf/file',
    color: 'from-orange-600 to-amber-500',
  },
  {
    id: 'beo2pc',
    name: 'PC Port',
    subtitle: 'Bad Eggs Online 2',
    description: 'Full PC port running natively on Windows.',
    size: '28 MB',
    ext: '.EXE',
    tag: 'Windows',
    link: 'https://www.mediafire.com/file/9uao34572yxukvb/BadEggsOnline2Setup.exe/file',
    color: 'from-orange-500 to-orange-400',
  },
  {
    id: 'hybridPC',
    name: 'Hybrid Edition',
    subtitle: 'BEO2 for PC',
    description: 'Version 1.1 — released 18/04/2026.',
    size: '28 MB',
    ext: '.EXE',
    tag: 'v1.1',
    link: 'https://www.mediafire.com/file/75q04w26pkag5tk/BEO2HybridSetup.exe/file',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'hybridANDROID',
    name: 'Hybrid Edition',
    subtitle: 'BEO2 for Android',
    description: 'Version 1.1 — released 18/04/2026.',
    size: '45 MB',
    ext: '.APK',
    tag: 'Android',
    link: 'https://www.mediafire.com/file/l8hxy4fluxa77ev/BEO2HybridEdition.apk/file',
    color: 'from-orange-600 to-red-500',
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'Optimized Builds',
    desc: 'Each release is tuned for its target platform — mobile, PC, or Android.',
  },
  {
    icon: Shield,
    title: 'Trusted Sources',
    desc: 'All files are hosted on verified platforms with transparent tracking.',
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    desc: 'Browser builds, Android APKs, and Windows executables — play anywhere.',
  },
  {
    icon: Star,
    title: '3D Models',
    desc: 'Custom game-ready 3D assets with animations and effects included.',
  },
];

const THREE_D_ASSETS = [
  {
    id: 'pumpkinpikachu',
    name: 'Pumpkin Pikachu',
    desc: 'BMGO Asset — .fbx + .mesh + .effect',
    size: '~ 1 MB',
    link: 'https://exe.io/1aZhNcZ',
  },
  {
    id: 'pumpkinwitch',
    name: 'Pumpkin Witch',
    desc: 'BMGO Asset — .fbx + .mesh',
    size: '~ 1 MB',
    link: 'https://exe.io/k8nOFB',
  },
];

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-orange-400">{count.toLocaleString()}+</div>
      <div className="text-sm text-zinc-400 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-xl font-black tracking-tight"
          >
            <Code2 className="text-orange-500" size={24} />
            <span>
              Keari<span className="text-orange-500">Dev</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {['features', 'assets', '3d', 'community'].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="hover:text-orange-400 transition-colors capitalize"
              >
                {s === '3d' ? '3D Assets' : s}
              </button>
            ))}
          </nav>

          <a
            href="https://discord.com/invite/XsQFCASZZg"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-black font-bold text-sm px-4 py-2 rounded-lg"
          >
            Join Discord
          </a>

          <button
            className="md:hidden text-zinc-300"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            {['features', 'assets', '3d', 'community'].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-left text-zinc-300 hover:text-orange-400 transition-colors capitalize"
              >
                {s === '3d' ? '3D Assets' : s}
              </button>
            ))}
            <a
              href="https://discord.com/invite/XsQFCASZZg"
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 font-bold"
            >
              Join Discord
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-600/10 blur-[120px]" />
          <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/8 blur-[100px]" />
        </div>

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,146,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <FolderArchive size={12} />
            Game Files &amp; 3D Assets
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Your Source for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              Game Assets
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Download game files, mods, ports, and 3D models. Community-maintained and free for everyone.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('assets')}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-black font-bold px-6 py-3 rounded-xl text-base shadow-lg shadow-orange-500/25"
            >
              <Download size={18} />
              Browse Downloads
            </button>
            <a
              href="https://discord.com/invite/XsQFCASZZg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-all text-white font-semibold px-6 py-3 rounded-xl text-base"
            >
              <Users size={18} />
              Join Community
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollTo('features')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-orange-400 transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* STATS */}
      <section className="bg-zinc-950 border-y border-zinc-800 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value={4} label="Releases" />
          <StatCard value={2} label="3D Models" />
          <StatCard value={1} label="Community" />
          <StatCard value={3} label="Platforms" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Why <span className="text-orange-400">KeariDev?</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Every asset is curated, tested, and maintained by the community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon className="text-orange-400" size={22} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSETS */}
      <section id="assets" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">
              <Package size={14} />
              Downloads
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Game Files</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Pick the build that suits your platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ASSETS.map((asset) => (
              <div
                key={asset.id}
                className="group relative bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${asset.color}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2">
                        {asset.tag}
                      </span>
                      <div className="text-xs text-zinc-500 font-medium">{asset.subtitle}</div>
                      <h3 className="text-xl font-black text-white mt-1">{asset.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono bg-zinc-800 text-orange-300 px-2 py-1 rounded">{asset.ext}</div>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{asset.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Download size={13} />
                        {asset.size}
                      </span>
                    </div>
                    <a
                      href={asset.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-black font-bold text-sm px-4 py-2 rounded-lg shadow-md shadow-orange-500/20"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D ASSETS */}
      <section id="3d" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">
              <Box size={14} />
              3D Models
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">3D Asset Library</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Game-ready 3D models with animations and effects included.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {THREE_D_ASSETS.map((a) => (
              <div
                key={a.id}
                className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-full h-44 bg-zinc-800 rounded-xl mb-5 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-amber-500/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Box className="text-orange-400" size={36} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-zinc-600 font-mono bg-zinc-900/70 px-2 py-0.5 rounded">.GLB</div>
                </div>

                <h3 className="text-lg font-black text-white mb-1">{a.name}</h3>
                <p className="text-zinc-400 text-sm mb-1">{a.desc}</p>
                <p className="text-zinc-600 text-xs mb-5">{a.size}</p>

                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-black font-bold text-sm px-4 py-2.5 rounded-lg transition-all duration-200"
                >
                  <ExternalLink size={14} />
                  Download (Ad Link)
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section id="community" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-orange-600/10 to-amber-500/5 border border-orange-500/20 rounded-3xl p-12 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/8 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-orange-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-orange-400" size={30} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Join the Community
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Connect with other players, get support, share your experience, and stay updated on new releases.
              </p>

              <a
                href="https://discord.com/invite/XsQFCASZZg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-black font-black text-base px-8 py-4 rounded-xl shadow-xl shadow-orange-500/30"
              >
                <Users size={20} />
                Join the Discord Server
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-black">
            <Code2 className="text-orange-500" size={20} />
            <span>
              Keari<span className="text-orange-500">Dev</span>
            </span>
          </div>

          <p className="text-zinc-600 text-sm text-center">
            Community-maintained archive for game assets and files.
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <a
              href="https://discord.com/invite/XsQFCASZZg"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Discord
            </a>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
