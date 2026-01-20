
import React, { useState, useEffect, useRef } from 'react';
import { Achievement, Affirmation, TreeComment, User } from '../types';
import { getRandomDailyAffirmation } from '../services/gemini';
import { ICONS } from '../constants';

interface TreeHoleProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

const TreeHole: React.FC<TreeHoleProps> = ({ user, onUpdateUser }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAch, setNewAch] = useState('');
  const [dailyQuote, setDailyQuote] = useState<Affirmation | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  
  // Media Posting States
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAchievements([
      { 
        id: '1', 
        content: '今天终于拒绝了那个不合理的周末加班请求。🥂', 
        timestamp: Date.now() - 3600000, 
        flowers: 12, 
        hugs: 5, 
        tips: 50,
        authorName: '匿名队友',
        comments: [{ id: 'c1', content: '做得好！姐妹牛逼 ✨', timestamp: Date.now() - 1800000, authorName: '系统小助手' }]
      },
      { 
        id: '2', 
        content: '下班路上的夕阳好美，感觉被治愈了。🌅', 
        timestamp: Date.now() - 7200000, 
        flowers: 8, 
        hugs: 3, 
        tips: 20,
        authorName: user.username,
        images: ['https://images.unsplash.com/photo-1470252649358-96949c751ba8?auto=format&fit=crop&q=80&w=400'],
        comments: []
      },
    ]);
    getRandomDailyAffirmation().then(setDailyQuote);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages(prev => [...prev, reader.result as string].slice(0, 9));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSelectedVideo(url);
  };

  const handlePost = () => {
    if (!newAch.trim() && selectedImages.length === 0 && !selectedVideo) return;
    
    const item: Achievement = {
      id: Math.random().toString(36).substr(2, 9),
      content: newAch,
      timestamp: Date.now(),
      flowers: 0,
      hugs: 0,
      tips: 0,
      authorName: isAnonymous ? '匿名队友' : user.username,
      images: selectedImages.length > 0 ? [...selectedImages] : undefined,
      video: selectedVideo || undefined,
      comments: []
    };
    
    setAchievements([item, ...achievements]);
    setNewAch('');
    setSelectedImages([]);
    setSelectedVideo(null);
    onUpdateUser({ points: user.points + 10 });
  };

  const react = (id: string, type: 'flowers' | 'hugs') => {
    setAchievements(prev => prev.map(a => 
      a.id === id ? { ...a, [type]: a[type] + 1 } : a
    ));
    onUpdateUser({ points: user.points + 1 });
  };

  const handleTip = (id: string) => {
    if (user.points < 10) {
      alert("积分能量不足，快去签到或碎纸吧 ☕️");
      return;
    }
    setAchievements(prev => prev.map(a => 
      a.id === id ? { ...a, tips: a.tips + 10 } : a
    ));
    onUpdateUser({ points: user.points - 10 });
  };

  const handleReply = (postId: string) => {
    if (!replyText.trim()) return;
    const newComment: TreeComment = {
      id: Math.random().toString(36).substr(2, 9),
      content: replyText,
      timestamp: Date.now(),
      authorName: isAnonymous ? '匿名队友' : user.username
    };
    setAchievements(prev => prev.map(a => 
      a.id === postId ? { ...a, comments: [...a.comments, newComment] } : a
    ));
    setReplyText('');
    setReplyingTo(null);
    onUpdateUser({ points: user.points + 2 });
  };

  return (
    <div className="flex flex-col gap-6 py-4 animate-in fade-in duration-700 pb-24">
      {/* Daily Affirmation Card */}
      <div className="p-8 bg-[#EBD8D0] rounded-[2rem] text-center relative overflow-hidden shadow-sm">
        {dailyQuote ? (
          <>
            <p className="text-lg serif font-bold text-[#6D5D57] leading-relaxed mb-4 italic">“{dailyQuote.text}”</p>
            <span className="text-xs text-[#8E837D] tracking-widest">— {dailyQuote.author}</span>
          </>
        ) : (
          <div className="animate-pulse h-12 bg-white/30 rounded" />
        )}
      </div>

      {/* Posting Section */}
      <div className="mt-4 bg-white/40 p-6 rounded-[2.5rem] border border-white shadow-sm">
        <h3 className="text-lg serif font-bold mb-4 flex items-center gap-2">
          发布我的微光 ✨
        </h3>
        
        <textarea
          value={newAch}
          onChange={(e) => setNewAch(e.target.value)}
          placeholder="分享此刻的心情、成就或瞬间..."
          className="w-full bg-transparent text-sm min-h-[100px] focus:outline-none resize-none mb-4"
        />

        {/* Media Previews */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedImages.map((src, idx) => (
            <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm">
              <img src={src} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-black/40 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >✕</button>
            </div>
          ))}
          {selectedVideo && (
            <div className="relative w-40 h-24 rounded-xl overflow-hidden bg-black shadow-sm">
              <video src={selectedVideo} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-1 right-1 bg-black/40 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >✕</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/40 pt-4">
          <div className="flex gap-4">
            <button onClick={() => imageInputRef.current?.click()} className="text-[#A68D85] flex flex-col items-center">
              <span className="text-xl">🖼️</span>
              <span className="text-[10px] font-bold">照片</span>
            </button>
            <button onClick={() => videoInputRef.current?.click()} className="text-[#A68D85] flex flex-col items-center">
              <span className="text-xl">📹</span>
              <span className="text-[10px] font-bold">视频</span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1" />
            <button 
              onClick={() => setIsAnonymous(!isAnonymous)} 
              className={`flex flex-col items-center transition-opacity ${isAnonymous ? 'opacity-100' : 'opacity-40'}`}
            >
              <span className="text-xl">👤</span>
              <span className="text-[10px] font-bold">{isAnonymous ? '匿名中' : user.username}</span>
            </button>
          </div>
          
          <button 
            onClick={handlePost} 
            className="px-8 py-3 bg-[#A68D85] text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-all"
          >
            发表
          </button>
        </div>

        {/* Hidden Inputs */}
        <input type="file" hidden multiple accept="image/*" ref={imageInputRef} onChange={handleImageUpload} />
        <input type="file" hidden accept="video/*" ref={videoInputRef} onChange={handleVideoUpload} />
      </div>

      {/* Timeline Section */}
      <div className="space-y-6 mt-4">
        {achievements.map((a) => (
          <div key={a.id} className="p-6 bg-white/60 rounded-[2.5rem] border border-white/40 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#EBD8D0] flex items-center justify-center text-lg shadow-inner">
                {a.authorName === '匿名队友' ? '🛡️' : '👤'}
              </div>
              <div>
                <p className="text-xs font-bold text-[#4A443F]">{a.authorName}</p>
                <p className="text-[10px] text-gray-400">
                  {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-4 text-[#4A443F] font-medium whitespace-pre-wrap">{a.content}</p>
            
            {/* Multi-Media Display */}
            {a.images && a.images.length > 0 && (
              <div className={`grid gap-2 mb-4 ${a.images.length === 1 ? 'grid-cols-1' : a.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {a.images.map((img, i) => (
                  <img key={i} src={img} className="rounded-2xl w-full h-32 object-cover border border-white shadow-sm" alt="Post content" />
                ))}
              </div>
            )}
            
            {a.video && (
              <video controls className="w-full rounded-2xl mb-4 border border-white shadow-sm max-h-64 object-contain bg-black">
                <source src={a.video} />
              </video>
            )}

            <div className="flex justify-between items-center border-t border-white/40 pt-4 mb-4">
              <div className="flex gap-2">
                <button onClick={() => react(a.id, 'flowers')} className="flex items-center gap-1 text-[10px] text-[#A68D85] bg-[#A68D85]/10 px-3 py-1.5 rounded-full border border-[#A68D85]/20 font-bold active:scale-90 transition-all">
                  <ICONS.Flower className="w-3.5 h-3.5" /> 献花 {a.flowers}
                </button>
                <button onClick={() => react(a.id, 'hugs')} className="flex items-center gap-1 text-[10px] text-[#8E837D] bg-[#8E837D]/10 px-3 py-1.5 rounded-full border border-[#8E837D]/20 font-bold active:scale-90 transition-all">
                  <ICONS.Heart className="w-3.5 h-3.5" /> 拥抱 {a.hugs}
                </button>
                <button onClick={() => handleTip(a.id)} className="flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 font-bold active:scale-90 transition-all">
                  💎 投喂 10 pts
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              {a.comments.map(c => (
                <div key={c.id} className="text-[11px] bg-white/40 p-3 rounded-2xl text-gray-600 border border-white/20">
                  <span className="font-black text-[#A68D85]">{c.authorName}：</span> {c.content}
                </div>
              ))}
              
              {replyingTo === a.id ? (
                <div className="flex gap-2 mt-2 animate-in slide-in-from-top-1">
                  <input 
                    autoFocus
                    className="flex-1 bg-white/80 px-4 py-2 rounded-full text-xs outline-none border border-[#A68D85]/20 shadow-inner" 
                    placeholder="说点温暖的话..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => handleReply(a.id)} className="text-[10px] text-[#A68D85] font-black px-2">发送</button>
                  <button onClick={() => setReplyingTo(null)} className="text-[10px] text-gray-400">取消</button>
                </div>
              ) : (
                <button onClick={() => setReplyingTo(a.id)} className="text-[11px] text-[#A68D85] font-bold flex items-center gap-1 hover:opacity-70 transition-opacity ml-2">
                  <span className="text-sm">💬</span> 匿名回复支持
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeHole;
