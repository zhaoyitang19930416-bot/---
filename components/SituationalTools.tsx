import React, { useState, useEffect, useRef } from 'react';
import { getPsychologicalFirstAid } from '../services/gemini';

const SituationalTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  // Confidence Warmup State
  const [confidenceTimer, setConfidenceTimer] = useState(30);
  const [confidenceStep, setConfidenceStep] = useState(0);
  
  // First Aid State
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Ritual State
  const [ritualStep, setRitualStep] = useState(0);

  // Timer Effect for Confidence Warmup
  useEffect(() => {
    let interval: any = null;
    if (activeTool === 'confidence' && confidenceTimer > 0) {
      interval = setInterval(() => {
        setConfidenceTimer(t => t - 1);
      }, 1000);
    } else if (confidenceTimer === 0) {
      setConfidenceStep(3); // Finished
    }
    return () => clearInterval(interval);
  }, [activeTool, confidenceTimer]);

  useEffect(() => {
    if (confidenceTimer > 20) setConfidenceStep(0);
    else if (confidenceTimer > 10) setConfidenceStep(1);
    else if (confidenceTimer > 0) setConfidenceStep(2);
  }, [confidenceTimer]);

  const resetTools = () => {
    setActiveTool(null);
    setConfidenceTimer(30);
    setConfidenceStep(0);
    setRitualStep(0);
    setResponse('');
    setInput('');
  };

  const handleFirstAid = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await getPsychologicalFirstAid(input);
    setResponse(result);
    setLoading(false);
  };

  const CONFIDENCE_STEPS = [
    { title: "权力姿势", desc: "站直，双手叉腰，抬头挺胸", instruction: "感受此刻身体的张力与力量", icon: "🦸‍♀️" },
    { title: "腹式深呼吸", desc: "吸气4秒，呼气4秒", instruction: "吸入平静，吐出焦虑", icon: "🌬️" },
    { title: "自我肯定", desc: "在心中默念：我准备好了", instruction: "这场会议是我的主场", icon: "✨" },
    { title: "大功告成", desc: "气场全开，现在出发", instruction: "去征服那间会议室吧！", icon: "🚀" }
  ];

  const RITUAL_STEPS = [
    { text: "点击切断公司通讯 (Silence Slack/Mail)", icon: "🔇" },
    { text: "象征性合上电脑盖 (Close the Lid)", icon: "💻" },
    { text: "深深地呼出一口气，找回真实的自己", icon: "🕊️" },
    { text: "离岗成功。现在，生活开始了。", icon: "🏡" }
  ];

  return (
    <div className="flex flex-col gap-8 py-4 animate-in slide-in-from-right-4 duration-500 pb-24">
      <div className="text-center">
        <h2 className="text-2xl serif font-bold mb-2">职场急救箱</h2>
        <p className="text-sm text-gray-500">在关键时刻，给你最精准的支撑。</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Confidence Warmup Button */}
        <button 
          onClick={() => setActiveTool('confidence')}
          className="p-6 rounded-[2rem] bg-[#C8D3C5] text-left relative overflow-hidden group active:scale-[0.98] transition-all"
        >
          <div className="z-10 relative">
            <h4 className="font-bold text-[#4A5D4E]">重大会议前：信心加温</h4>
            <p className="text-xs text-[#4A5D4E]/70 mt-1">30秒权力姿势与心态建设</p>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl opacity-20 group-hover:scale-125 transition-transform">🔥</div>
        </button>

        {/* Psychological First Aid Button */}
        <button 
          onClick={() => setActiveTool('firstaid')}
          className="p-6 rounded-[2rem] bg-[#EBD8D0] text-left relative overflow-hidden group active:scale-[0.98] transition-all"
        >
          <div className="z-10 relative">
            <h4 className="font-bold text-[#8E7870]">受委屈了：心理急救包</h4>
            <p className="text-xs text-[#8E7870]/70 mt-1">深度认知重构，驱散负面情绪</p>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl opacity-20 group-hover:scale-125 transition-transform">🩹</div>
        </button>

        {/* Clock-out Ritual Button */}
        <button 
          onClick={() => setActiveTool('ritual')}
          className="p-6 rounded-[2rem] bg-[#D6D0CC] text-left relative overflow-hidden group active:scale-[0.98] transition-all"
        >
          <div className="z-10 relative">
            <h4 className="font-bold text-[#4A443F]">下班离岗：仪式感按钮</h4>
            <p className="text-xs text-[#4A443F]/70 mt-1">切断工作链接，切换个人模式</p>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl opacity-20 group-hover:scale-125 transition-transform">🔌</div>
        </button>
      </div>

      {/* Confidence Warmup Overlay - 修复为呼吸灯+大字体引导模式 */}
      {activeTool === 'confidence' && (
        <div className="fixed inset-0 z-50 bg-[#F8F5F2] flex flex-col items-center justify-between p-10 animate-in fade-in duration-500">
           {/* 背景呼吸灯 */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="w-80 h-80 rounded-full bg-[#C8D3C5] breathing-glow" />
           </div>

           <div className="w-full flex justify-between items-center z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#4A5D4E]/50">Confidence Guided</span>
              <button onClick={resetTools} className="w-8 h-8 flex items-center justify-center bg-white/50 rounded-full text-[#4A5D4E] shadow-sm">✕</button>
           </div>

           <div className="z-10 text-center space-y-12">
              <div className="space-y-4">
                <span className="text-6xl animate-bounce inline-block">{CONFIDENCE_STEPS[confidenceStep].icon}</span>
                <h3 className="text-4xl serif font-black text-[#4A5D4E] tracking-tight">{CONFIDENCE_STEPS[confidenceStep].title}</h3>
              </div>
              
              <div className="min-h-[120px] flex flex-col justify-center gap-4">
                <p className="text-xl font-medium text-[#4A5D4E]/90 leading-relaxed italic">
                   “{CONFIDENCE_STEPS[confidenceStep].instruction}”
                </p>
                <p className="text-sm text-[#4A5D4E]/60">{CONFIDENCE_STEPS[confidenceStep].desc}</p>
              </div>

              <div className="text-6xl font-mono font-bold text-[#4A5D4E]/20">
                {confidenceTimer}s
              </div>
           </div>

           <div className="z-10 w-full max-w-xs pb-10">
              {confidenceTimer === 0 ? (
                <button 
                  onClick={resetTools} 
                  className="w-full py-5 bg-[#4A5D4E] text-white rounded-full font-black tracking-widest text-lg shadow-2xl active:scale-95 transition-all animate-in zoom-in-95"
                >
                  气场全开 · 出发
                </button>
              ) : (
                <div className="w-full h-1 bg-[#4A5D4E]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4A5D4E] transition-all duration-1000 ease-linear"
                    style={{ width: `${(confidenceTimer / 30) * 100}%` }}
                  />
                </div>
              )}
           </div>
        </div>
      )}

      {/* Psychological First Aid Sub-View */}
      {activeTool === 'firstaid' && (
        <div className="mt-4 p-8 glass-card rounded-[2.5rem] animate-in zoom-in-95 duration-300 border border-white">
          <div className="flex justify-between mb-4">
             <h4 className="font-bold text-[#8E7870] flex items-center gap-2">🩹 深度心理急救</h4>
             <button onClick={resetTools} className="text-gray-300">✕</button>
          </div>
          
          {!response ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed">这一刻，把所有的委屈、愤怒或自我怀疑都写下来。这里的文字会在生成建议后自动销毁。</p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-white/50 p-5 rounded-2xl text-sm focus:outline-none border border-transparent focus:border-[#EBD8D0]"
                placeholder="例如：刚才老板当众否定了我的方案，我觉得自己好失败，想离职..."
              />
              <button 
                onClick={handleFirstAid}
                disabled={loading || !input.trim()}
                className="w-full py-4 bg-[#8E7870] text-white rounded-2xl text-sm font-bold shadow-lg disabled:opacity-50 transition-all active:scale-95"
              >
                {loading ? '正在调配情绪解药...' : '请求 AI 认知重构支援'}
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 bg-white/80 rounded-2xl text-[13px] leading-relaxed border-l-4 border-[#8E7870] shadow-sm text-gray-700">
                <div className="mb-4 text-[10px] uppercase tracking-tighter text-[#8E7870] opacity-50">AI 认知重构建议</div>
                <div className="whitespace-pre-wrap">{response}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setResponse('')} className="flex-1 py-3 border border-[#8E7870] text-[#8E7870] rounded-xl text-[11px]">重新倾诉</button>
                <button onClick={resetTools} className="flex-1 py-3 bg-[#8E7870] text-white rounded-xl text-[11px]">收起急救包</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clock-out Ritual Overlay */}
      {activeTool === 'ritual' && (
        <div className="fixed inset-0 z-50 bg-[#F8F5F2] flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
           <div className="text-center w-full max-w-sm space-y-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#8E837D]">Off-Duty Ritual</span>
                <button onClick={resetTools} className="text-gray-400">✕</button>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl serif font-bold text-[#4A443F]">开始离岗仪式</h2>
                <p className="text-sm text-gray-500">让我们一步步切断工作的重力，回归生活。</p>
              </div>

              <div className="flex flex-col gap-4">
                {RITUAL_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    disabled={ritualStep !== idx}
                    onClick={() => {
                      if (idx === RITUAL_STEPS.length - 1) {
                         setTimeout(resetTools, 2000);
                      } else {
                         setRitualStep(idx + 1);
                      }
                    }}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
                      ritualStep === idx 
                        ? 'bg-white border-[#A68D85] shadow-xl scale-105 z-10' 
                        : ritualStep > idx 
                          ? 'bg-green-50 border-green-100 opacity-50' 
                          : 'bg-gray-100 border-transparent opacity-30 grayscale'
                    }`}
                  >
                    <span className="text-2xl">{step.icon || (ritualStep > idx ? "✅" : "⏳")}</span>
                    <span className={`text-sm font-medium ${ritualStep === idx ? 'text-[#4A443F]' : 'text-gray-400'}`}>
                      {step.text}
                    </span>
                  </button>
                ))}
              </div>

              {ritualStep === RITUAL_STEPS.length - 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <div className="text-5xl mb-4">🥂</div>
                  <p className="text-lg serif italic">“现在，世界属于你。”</p>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default SituationalTools;