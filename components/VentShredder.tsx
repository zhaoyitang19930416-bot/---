
import React, { useState, useRef } from 'react';
import { convertToCorporateSpeak } from '../services/gemini';

const VentShredder: React.FC = () => {
  const [text, setText] = useState('');
  const [isShredding, setIsShredding] = useState(false);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleShred = async () => {
    if (!text.trim()) return;
    
    setIsShredding(true);
    setLoading(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});

    const result = await convertToCorporateSpeak(text);
    
    setTimeout(() => {
      setIsShredding(false);
      setText('');
      setResponse(result);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-24">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3" />
      <div className="text-center">
        <h2 className="text-2xl serif font-bold mb-2">吐槽碎纸机 ✂️</h2>
        <p className="text-sm text-gray-500 italic">把所有的职场垃圾扔进去，吐出优雅的回响。🕊️</p>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="尽情吐槽吧，没人会知道... 比如：老板刚才在大群里艾特我..."
          className={`w-full h-56 p-6 rounded-[2.5rem] glass-card focus:outline-none focus:ring-2 focus:ring-[#A68D85]/20 resize-none transition-all duration-1000 shadow-inner ${isShredding ? 'shred-animation' : ''}`}
          disabled={isShredding}
        />
        {isShredding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-8xl animate-bounce">✂️</div>
          </div>
        )}
      </div>

      <button 
        onClick={handleShred} 
        disabled={isShredding || !text.trim()} 
        className="w-full py-4 bg-[#4A443F] text-white rounded-[2rem] font-bold shadow-lg shadow-[#4A443F]/20 active:scale-95 disabled:opacity-50 transition-all"
      >
        {isShredding ? '正在彻底粉碎并净化... ✨' : '咔嚓！彻底粉碎'}
      </button>

      {response && !loading && (
        <div className="mt-4 space-y-4 animate-in zoom-in-95 fade-in duration-500">
          <div className="p-6 bg-[#EBD8D0]/50 rounded-[2.5rem] border border-[#EBD8D0] shadow-sm">
            <div className="text-[10px] uppercase tracking-widest text-[#8E7870] mb-3 font-bold opacity-70">—— 懂你的树洞 🕯️ ——</div>
            <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#4A443F] font-medium">
              {response}
            </div>
          </div>
          <button 
            onClick={() => setResponse('')} 
            className="w-full text-xs text-gray-400 hover:text-[#A68D85] transition-colors"
          >
            感谢理解，清空心事 ⌛
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A68D85] mb-2"></div>
          <p className="text-xs text-[#8E837D] animate-pulse">正在为你鸣不平，并构思优雅的职场反击... ☕️</p>
        </div>
      )}
    </div>
  );
};

export default VentShredder;
