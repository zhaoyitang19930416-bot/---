
import React from 'react';
import { AppTab } from '../types';

interface TutorialContent {
  title: string;
  description: string;
  icon: string;
  tip: string;
}

const TUTORIAL_DATA: Record<string, TutorialContent> = {
  [AppTab.HOME]: {
    title: "欢迎来到泄愤场",
    description: "这是你的私人主控室。你可以点击“捶死小人”释放压力，或者通过快捷入口进入其他功能。",
    icon: "🥊",
    tip: "提示：点击小人可以积攒点数，每日签到也能获得能量。"
  },
  [AppTab.MEDITATE]: {
    title: "3分钟精神离职",
    description: "在这里选择一个治愈场景，跟随呼吸圆环的节奏，进行短暂的沉浸式逃离。",
    icon: "🧘‍♀️",
    tip: "提示：戴上耳机体验白噪音，效果更佳。"
  },
  [AppTab.SHREDDER]: {
    title: "吐槽碎纸机",
    description: "输入那些让你不爽的职场瞬间，点击粉碎。AI会将你的愤怒转化为优雅的职场体。",
    icon: "✂️",
    tip: "提示：碎纸时会有解压的音效，请尽情释放。"
  },
  [AppTab.TREEHOLE]: {
    title: "温暖互助树洞",
    description: "在这里分享你的“微光成就”。没有杠精和评判，只有来自姐妹们的鲜花与拥抱。",
    icon: "🌿",
    tip: "提示：发布动态或回复他人可以获得点数奖励。"
  },
  [AppTab.TOOLS]: {
    title: "职场急救箱",
    description: "针对重大会议前、受委屈时或下班离岗，我们为你准备了专门的心理重建引导。",
    icon: "🩹",
    tip: "提示：点击相应的卡片即可开启针对性的引导流程。"
  }
};

interface OnboardingProps {
  tab: AppTab;
  onComplete: () => void;
}

const OnboardingTutorial: React.FC<OnboardingProps> = ({ tab, onComplete }) => {
  const content = TUTORIAL_DATA[tab];

  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-sm bg-[#F8F5F2] rounded-[3rem] p-10 relative overflow-hidden shadow-2xl flex flex-col items-center text-center gap-6 border border-white/20">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#A68D85]/10 rounded-full -translate-x-16 -translate-y-16 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#EBD8D0]/20 rounded-full translate-x-16 translate-y-16 blur-3xl"></div>

        {/* 内容区 */}
        <div className="animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 relative">
             <span className="text-5xl floating">{content.icon}</span>
             <div className="absolute -inset-2 border border-[#A68D85]/20 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-2xl serif font-black text-[#4A443F] mb-4 leading-tight">{content.title}</h3>
          <p className="text-sm text-[#8E837D] leading-relaxed mb-6 px-2">
            {content.description}
          </p>
          
          <div className="bg-white/50 p-4 rounded-2xl border border-white text-[11px] text-[#A68D85] font-bold italic mb-2">
            {content.tip}
          </div>
        </div>

        {/* 操作区 */}
        <div className="w-full mt-4">
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-[#4A443F] text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            我知道了
          </button>
        </div>

        <div className="absolute bottom-4 text-[9px] text-gray-300 font-black tracking-widest uppercase">HerSpace Step-by-Step Guide</div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
