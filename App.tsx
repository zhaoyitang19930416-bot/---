
import React, { useState, useEffect, useRef } from 'react';
import { AppTab, User, PointItem } from './types';
import Layout from './components/Layout';
import MentalQuitting from './components/MentalQuitting';
import VentShredder from './components/VentShredder';
import TreeHole from './components/TreeHole';
import SituationalTools from './components/SituationalTools';
import PointsStore from './components/PointsStore';
import Auth from './components/Auth';
import OnboardingTutorial from './components/OnboardingTutorial';

const IDLE_BOSSES = ['👔', '👨‍💼', '💼', '👹', '🐷', '🤡'];
const HURT_BOSSES = ['🤕', '🥴', '😵', '🩹', '🩸', '💀'];

const StressReliever: React.FC<{ onPunch: () => void }> = ({ onPunch }) => {
  const [bossIndex, setBossIndex] = useState(0);
  const [isHurt, setIsHurt] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hp, setHp] = useState(100);

  const HIT_SOUNDS = [
    'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3'
  ];

  const playHitSound = () => {
    const audio = new Audio(HIT_SOUNDS[Math.floor(Math.random() * HIT_SOUNDS.length)]);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  const handlePunch = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();

    setIsHurt(true);
    setCombo(prev => prev + 1);
    setAnimKey(prev => prev + 1);
    setHp(prev => (prev <= 5 ? 100 : prev - 5));
    onPunch();
    playHitSound();

    setTimeout(() => {
      setIsHurt(false);
      if (Math.random() > 0.8) {
        setBossIndex(Math.floor(Math.random() * IDLE_BOSSES.length));
      }
    }, 150);
  };

  useEffect(() => {
    const timer = setTimeout(() => setCombo(0), 1500);
    return () => clearTimeout(timer);
  }, [combo]);

  return (
    <div className="relative w-full group select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-[3.5rem] transform translate-y-3 blur-sm"></div>
      
      <div className="relative bg-[#121212] p-8 rounded-[3.5rem] flex flex-col items-center gap-6 overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#A68D85]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#EBD8D0]/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="w-full flex justify-between items-center z-10 px-4">
          <div className="flex flex-col">
            <h3 className="text-white text-lg serif font-black tracking-tighter uppercase italic">捶死小人</h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
               <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">System Stabilized</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="text-[10px] text-zinc-400 font-black uppercase">Level 0{Math.floor(combo/10) + 1}</span>
          </div>
        </div>

        <div 
          className="relative z-10 cursor-pointer h-64 w-full flex items-center justify-center touch-manipulation perspective-1000" 
          onMouseDown={handlePunch}
          onTouchStart={handlePunch}
        >
          <div className={`absolute w-48 h-48 rounded-full border-2 border-white/5 transition-all duration-300 ${isHurt ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}></div>
          <div className={`absolute w-56 h-56 rounded-full border border-dashed border-white/10 ${isHurt ? 'animate-spin-slow' : ''}`}></div>

          <div 
            key={animKey}
            className={`text-[130px] transition-all duration-75 select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]
              ${isHurt ? 'anim-shake scale-125' : 'hover:scale-105 active:scale-90'}`}
          >
            {isHurt ? HURT_BOSSES[bossIndex % HURT_BOSSES.length] : IDLE_BOSSES[bossIndex]}
          </div>

          {isHurt && (
            <div className="absolute top-10 right-4 animate-in slide-in-from-bottom-4 fade-out duration-500 pointer-events-none">
              <span className="text-4xl font-black italic text-[#EBD8D0] drop-shadow-lg">CRITICAL!</span>
            </div>
          )}
        </div>

        <div className="w-full z-10 px-4 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <span>Hostility Integrity</span>
              <span className={hp < 20 ? 'text-red-500 animate-pulse' : 'text-zinc-300'}>{hp}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full transition-all duration-300 ${hp < 20 ? 'bg-red-600' : 'bg-gradient-to-r from-[#A68D85] to-[#EBD8D0]'}`}
                style={{ width: `${hp}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center h-10">
            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">Click to Release Stress</div>
            {combo > 1 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-in zoom-in-95">
                <span className="text-white font-black text-xs italic tracking-widest">COMBO X{combo}</span>
                <span className="text-white/70 text-[10px]">🔥</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('herspace_user');
    return saved ? JSON.parse(saved) : { username: '', points: 100, isLoggedIn: false };
  });

  // 管理已经看过的功能教程标签页
  const [seenTutorials, setSeenTutorials] = useState<Set<AppTab>>(() => {
    const saved = localStorage.getItem('hs_seen_tab_tutorials');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // 控制当前是否显示教程遮罩
  const [showTutorial, setShowTutorial] = useState(false);

  const userNickname = localStorage.getItem('hs_nickname') || user.username || '访客';

  useEffect(() => {
    localStorage.setItem('herspace_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hs_seen_tab_tutorials', JSON.stringify(Array.from(seenTutorials)));
  }, [seenTutorials]);

  // 当标签页切换时，检查是否需要显示教程
  useEffect(() => {
    if (user.isLoggedIn && !seenTutorials.has(activeTab)) {
      setShowTutorial(true);
    } else {
      setShowTutorial(false);
    }
  }, [activeTab, user.isLoggedIn, seenTutorials]);

  const onUpdateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleLogin = (username: string) => {
    setUser({ username, points: 100, isLoggedIn: true });
    setActiveTab(AppTab.HOME);
  };

  const handleTutorialComplete = () => {
    setSeenTutorials(prev => new Set(prev).add(activeTab));
    setShowTutorial(false);
  };

  const handleCheckIn = () => {
    const today = new Date().toDateString();
    if (user.lastCheckIn === today) {
      alert("今天已经签过到了，休息片刻吧。☕️");
      return;
    }
    onUpdateUser({ points: user.points + 50, lastCheckIn: today });
    alert("能量注入！获得 50 pts ✨");
  };

  const handleExchange = (item: PointItem) => {
    if (user.points < item.cost) return;
    onUpdateUser({ points: user.points - item.cost });
    alert(`成功兑换 ${item.name}！🥂`);
  };

  const renderContent = () => {
    if (!user.isLoggedIn) {
      return <Auth onLogin={handleLogin} />;
    }

    switch (activeTab) {
      case AppTab.HOME:
        return (
          <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
            <div className="mt-8 flex justify-between items-start px-2">
              <div className="flex-1">
                <h2 className="text-3xl serif font-bold text-[#4A443F] leading-tight mb-2">
                  嗨，{userNickname}，<br/>
                  尽情发泄吧。🥊
                </h2>
                <p className="text-[11px] text-[#8E837D] font-bold tracking-tight uppercase opacity-70">Privately secured mental sanctuary</p>
              </div>
              <button onClick={handleCheckIn} className="flex-shrink-0 px-4 py-2 bg-white border border-[#A68D85]/10 rounded-full text-[10px] font-black text-[#A68D85] active:scale-95 shadow-sm transition-all uppercase tracking-widest">
                {user.lastCheckIn === new Date().toDateString() ? 'Active ✅' : 'Charge +50'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 px-2">
              <QuickAction title="3分钟离职" subtitle="静谧冥想" icon="🧘‍♀️" onClick={() => setActiveTab(AppTab.MEDITATE)} color="bg-[#EBD8D0]" />
              <QuickAction title="吐槽碎纸机" subtitle="优雅黑话" icon="✂️" onClick={() => setActiveTab(AppTab.SHREDDER)} color="bg-[#C8D3C5]" />
            </div>

            <div className="px-2">
              <StressReliever onPunch={() => onUpdateUser({ points: user.points + 0.5 })} />
            </div>

            <div className="mx-2 p-8 rounded-[3rem] bg-[#8E837D] text-white relative overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setActiveTab(AppTab.TREEHOLE)}>
               <h3 className="text-lg serif mb-4 italic leading-relaxed relative z-10 font-bold">“哪怕是一束微光，也能照亮通往自由的小径。✨”</h3>
               <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-[10px] transition-all tracking-[0.2em] uppercase font-black relative z-10 border border-white/10">进入共助树洞</button>
               <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12 text-[12rem] group-hover:scale-110 transition-transform duration-1000">🌿</div>
            </div>
          </div>
        );
      case AppTab.MEDITATE: return <MentalQuitting />;
      case AppTab.SHREDDER: return <VentShredder />;
      case AppTab.TREEHOLE: return <TreeHole user={user} onUpdateUser={onUpdateUser} />;
      case AppTab.TOOLS: return <SituationalTools />;
      case AppTab.STORE: return <PointsStore user={user} onExchange={handleExchange} />;
      default: return null;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
      {showTutorial && <OnboardingTutorial tab={activeTab} onComplete={handleTutorialComplete} />}
    </Layout>
  );
};

const QuickAction: React.FC<{ title: string; subtitle: string; icon: string; onClick: () => void; color: string }> = ({ title, subtitle, icon, onClick, color }) => (
  <button onClick={onClick} className={`${color} p-6 rounded-[2.5rem] text-left flex flex-col justify-between h-44 active:scale-95 transition-all shadow-sm border border-white/30 hover:shadow-lg group relative overflow-hidden`}>
    <span className="text-5xl group-hover:scale-110 transition-transform z-10">{icon}</span>
    <div className="z-10">
      <h4 className="font-black text-[#4A443F] text-sm mb-0.5">{title}</h4>
      <p className="text-[10px] opacity-60 uppercase tracking-tighter font-black">{subtitle}</p>
    </div>
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
  </button>
);

export default App;
