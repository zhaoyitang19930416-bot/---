
import React, { useState, useEffect, useRef } from 'react';
import { AppTab } from '../types';
import { ICONS, COLORS } from '../constants';
import { generateAiAvatar } from '../services/gemini';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const DEFAULT_AVATARS = ['👑', '👩‍💻', '🧘‍♀️', '🎨', '💼', '🍵', '🦋', '🌙'];
const MENTAL_STATES = [
  { label: '积极营业', icon: '🔥' },
  { label: '疯狂摆烂', icon: '🛌' },
  { label: '心如止水', icon: '🌊' },
  { label: '随时爆发', icon: '🌋' },
  { label: '优雅搬砖', icon: '💅' }
];

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 状态初始化
  const [nickname, setNickname] = useState(() => localStorage.getItem('hs_nickname') || 'HerSpace 密友');
  const [avatar, setAvatar] = useState(() => localStorage.getItem('hs_avatar') || '👑');
  const [address, setAddress] = useState(() => localStorage.getItem('hs_address') || '地球某个角落');
  const [job, setJob] = useState(() => localStorage.getItem('hs_job') || '全能打工人');
  const [mental, setMental] = useState(() => localStorage.getItem('hs_mental') || '优雅搬砖');
  const [birthday, setBirthday] = useState(() => localStorage.getItem('hs_birthday') || '');
  const [xhs, setXhs] = useState(() => localStorage.getItem('hs_xhs') || '');
  const [wechat, setWechat] = useState(() => localStorage.getItem('hs_wechat') || '');
  const [phone, setPhone] = useState(() => localStorage.getItem('hs_phone') || '');
  const [isWechatBound, setIsWechatBound] = useState(() => localStorage.getItem('hs_is_wechat_bound') === 'true');
  const [isAppleBound, setIsAppleBound] = useState(() => localStorage.getItem('hs_is_apple_bound') === 'true');
  const [mood, setMood] = useState(() => localStorage.getItem('herspace_mood') || '平静 🕊️');
  const [motto, setMotto] = useState(() => localStorage.getItem('herspace_motto') || '我足够好，无需证明。');

  useEffect(() => {
    localStorage.setItem('hs_nickname', nickname);
    localStorage.setItem('hs_avatar', avatar);
    localStorage.setItem('hs_address', address);
    localStorage.setItem('hs_job', job);
    localStorage.setItem('hs_mental', mental);
    localStorage.setItem('hs_birthday', birthday);
    localStorage.setItem('hs_xhs', xhs);
    localStorage.setItem('hs_wechat', wechat);
    localStorage.setItem('hs_phone', phone);
    localStorage.setItem('hs_is_wechat_bound', String(isWechatBound));
    localStorage.setItem('hs_is_apple_bound', String(isAppleBound));
    localStorage.setItem('herspace_mood', mood);
    localStorage.setItem('herspace_motto', motto);
  }, [nickname, avatar, address, job, mental, birthday, xhs, wechat, phone, isWechatBound, isAppleBound, mood, motto]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAiAvatar = async () => {
    setIsAiGenerating(true);
    const result = await generateAiAvatar(job, mental);
    if (result) setAvatar(result);
    setIsAiGenerating(false);
  };

  const simulateWechatBinding = () => {
    if (isWechatBound) return;
    alert('正在拉起微信进行安全授权...');
    setTimeout(() => {
      setIsWechatBound(true);
      alert('微信绑定成功 ✨');
    }, 1500);
  };

  const simulateAppleBinding = () => {
    if (isAppleBound) return;
    alert('正在验证 Apple ID...');
    setTimeout(() => {
      setIsAppleBound(true);
      alert('Apple ID 绑定成功 ');
    }, 1200);
  };

  const isBirthdayToday = () => {
    if (!birthday) return false;
    const today = new Date();
    const bday = new Date(birthday);
    return today.getMonth() === bday.getMonth() && today.getDate() === bday.getDate();
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative shadow-2xl bg-[#F8F5F2] overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center z-10">
        <div>
          <h1 className="text-2xl font-bold serif text-[#4A443F]">HerSpace</h1>
          <p className="text-xs text-[#8E837D] tracking-widest uppercase font-semibold">My Invisible Sanctuary</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 rounded-full hover:bg-white/40 transition-colors active:scale-90 relative"
        >
          <ICONS.Menu className="w-6 h-6" />
          {isBirthdayToday() && <span className="absolute -top-1 -right-1 text-lg animate-bounce">🎂</span>}
        </button>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <aside 
        className={`fixed top-0 right-0 h-full w-[90%] max-w-sm bg-[#F8F5F2] z-[60] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-8 pb-4 flex justify-between items-center bg-white/30">
          <h2 className="text-xl serif font-black tracking-tighter uppercase italic text-[#A68D85]">My Sanctuary</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 p-2">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 py-6 mt-2 relative">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden relative">
                {avatar.startsWith('data:') ? (
                  <img src={avatar} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">{avatar}</span>
                )}
                {isAiGenerating && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-white text-gray-700 p-2 rounded-full shadow-lg border border-gray-100 text-xs active:scale-90 transition-all"
              >
                📸
              </button>
            </div>

            <div className="w-full space-y-3">
              <div className="flex flex-wrap justify-center gap-2">
                {DEFAULT_AVATARS.map(a => (
                  <button key={a} onClick={() => setAvatar(a)} className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all ${avatar === a ? 'scale-125 border-2 border-[#A68D85]' : 'opacity-40'}`}>
                    {a}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleAiAvatar}
                disabled={isAiGenerating}
                className="w-full py-2 bg-gradient-to-r from-[#A68D85] to-[#EBD8D0] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 disabled:opacity-50"
              >
                {isAiGenerating ? 'AI 正在绘制梦境...' : '✨ AI 生成专属治愈头像'}
              </button>
            </div>

            <input 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="text-center w-full bg-transparent border-none text-2xl font-black text-[#4A443F] focus:outline-none placeholder:opacity-20"
              placeholder="自定义昵称"
            />
          </div>

          {/* Details Sections */}
          <div className="space-y-6">
            <SectionTitle title="基础信息" icon="🌱" />
            <div className="grid gap-4">
              <DetailInput label="生日" type="date" value={birthday} onChange={setBirthday} icon="🎂" />
              <DetailInput label="常驻坐标" placeholder="例如：云端或上海" value={address} onChange={setAddress} icon="📍" />
              <DetailInput label="当前岗位" placeholder="输入你的职场角色" value={job} onChange={setJob} icon="💼" />
            </div>

            <SectionTitle title="精神状态" icon="🎭" />
            <div className="flex flex-wrap gap-2">
              {MENTAL_STATES.map(s => (
                <button 
                  key={s.label}
                  onClick={() => setMental(s.label)}
                  className={`px-4 py-2 rounded-2xl text-[11px] font-bold transition-all shadow-sm ${mental === s.label ? 'bg-[#4A443F] text-white' : 'bg-white text-gray-400 border border-white'}`}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            <SectionTitle title="账号绑定" icon="🔐" />
            <div className="grid gap-4">
              <DetailInput label="绑定手机" placeholder="输入手机号" value={phone} onChange={setPhone} icon="📱" type="tel" />
              
              <button 
                onClick={simulateWechatBinding}
                className={`flex items-center justify-between p-4 bg-white/50 rounded-3xl border shadow-sm transition-all active:scale-95 ${isWechatBound ? 'border-green-100' : 'border-white'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">💬</span>
                  <div className="text-left">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">微信绑定</p>
                    <p className="text-sm font-bold">{isWechatBound ? '已绑定' : '点击前往微信绑定'}</p>
                  </div>
                </div>
                {isWechatBound && <span className="text-green-500">✓</span>}
              </button>

              <button 
                onClick={simulateAppleBinding}
                className={`flex items-center justify-between p-4 bg-white/50 rounded-3xl border shadow-sm transition-all active:scale-95 ${isAppleBound ? 'border-zinc-200' : 'border-white'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl"></span>
                  <div className="text-left">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Apple ID</p>
                    <p className="text-sm font-bold">{isAppleBound ? '已绑定' : '点击绑定 Apple ID'}</p>
                  </div>
                </div>
                {isAppleBound && <span className="text-zinc-500">✓</span>}
              </button>
            </div>

            <SectionTitle title="社交媒体" icon="📸" />
            <div className="grid gap-4">
              <DetailInput label="小红书" placeholder="@你的账号" value={xhs} onChange={setXhs} icon="📕" />
              <DetailInput label="WeChat ID" placeholder="WeChat ID" value={wechat} onChange={setWechat} icon="✉️" />
            </div>

            <SectionTitle title="心灵避风港" icon="🕯️" />
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-[#A68D85]">今日心情状态</label>
                <input value={mood} onChange={(e) => setMood(e.target.value)} className="w-full bg-white/50 border-none rounded-2xl px-4 py-3 text-sm shadow-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-[#A68D85]">全情况自愈金句</label>
                <textarea value={motto} onChange={(e) => setMotto(e.target.value)} className="w-full bg-white/50 border-none rounded-2xl px-4 py-3 text-sm italic min-h-[80px] shadow-sm leading-relaxed" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/50 border-t border-white/50">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-4 bg-[#4A443F] text-white rounded-3xl font-bold shadow-xl text-sm active:scale-95 transition-all uppercase tracking-widest"
          >
            保存记忆
          </button>
        </div>

        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
      </aside>

      {/* Content */}
      <main className="flex-1 px-6 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass-card py-4 pb-6 px-8 flex justify-between items-center z-20 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <NavItem active={activeTab === AppTab.HOME} icon={ICONS.Home} onClick={() => onTabChange(AppTab.HOME)} label="首页" />
        <NavItem active={activeTab === AppTab.MEDITATE} icon={ICONS.Wind} onClick={() => onTabChange(AppTab.MEDITATE)} label="冥想" />
        <NavItem active={activeTab === AppTab.SHREDDER} icon={ICONS.Trash} onClick={() => onTabChange(AppTab.SHREDDER)} label="碎纸机" />
        <NavItem active={activeTab === AppTab.TREEHOLE} icon={ICONS.Heart} onClick={() => onTabChange(AppTab.TREEHOLE)} label="树洞" />
        <NavItem active={activeTab === AppTab.TOOLS} icon={ICONS.Zap} onClick={() => onTabChange(AppTab.TOOLS)} label="工具" />
      </nav>
    </div>
  );
};

const SectionTitle: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
  <div className="flex items-center gap-2 mt-4">
    <span className="text-lg">{icon}</span>
    <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-[#8E837D]">{title}</h3>
  </div>
);

const DetailInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; icon: string; type?: string; placeholder?: string }> = ({ label, value, onChange, icon, type = "text", placeholder }) => (
  <div className="bg-white/50 p-4 rounded-3xl border border-white shadow-sm flex items-center gap-4 hover:bg-white transition-colors">
    <span className="text-xl">{icon}</span>
    <div className="flex-1">
      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{label}</p>
      <input 
        type={type}
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full bg-transparent text-sm font-bold focus:outline-none placeholder:font-normal placeholder:opacity-40" 
        placeholder={placeholder}
      />
    </div>
  </div>
);

const NavItem: React.FC<{ active: boolean; icon: React.FC<any>; onClick: () => void; label: string }> = ({ active, icon: Icon, onClick, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-[#8B736B] scale-110' : 'text-[#4A443F] opacity-50'}`}>
    <div className={`p-1.5 rounded-xl ${active ? 'bg-[#8B736B]/10' : ''}`}><Icon className="w-6 h-6" /></div>
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    {active && <div className="w-1 h-1 bg-[#8B736B] rounded-full" />}
  </button>
);

export default Layout;
